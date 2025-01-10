import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/api';
import { useAuth } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';
import '../../styles/FoodOrder.css';

const foodOptions = {
    MainCourse: ["Nasi Goreng", "Pizza", "Burger", "Mie Goreng", "Ayam Goreng"],
    Snack: ["Crispy Mushroom", "Chicken Karage", "French Fries", "Tahu Crispy", "Cheese Roll"],
    Dessert: ["Choco Brownies", "Choco Cookies", "Ice Cream", "Chocolate Pudding", "Cheesecake"]
};

const drinkOptions = {
    Coffee: ["Americano", "Cappuccino", "Macchiato", "Espresso", "Kopi Susu"],
    NonCoffee: ["Lemon Tea", "Ice Tea", "Milk Tea", "Red Velvet", "Taro"]
};

function FoodOrder() {
    const [foodCategory, setFoodCategory] = useState('MainCourse');
    const [foodItem, setFoodItem] = useState(foodOptions.MainCourse[0]);
    const [drinkCategory, setDrinkCategory] = useState('Coffee');
    const [drinkItem, setDrinkItem] = useState(drinkOptions.Coffee[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const orderData = {
                food_ordered: foodItem.toLowerCase(),
                drink_ordered: drinkItem.toLowerCase(),
                timestamp: new Date().toISOString()
            };

            const response = await createOrder(orderData);
            if (response) {
                toast.success('Order successful!');
                navigate('/home');
            }
        } catch (error) {
            console.error('Failed to create order:', error);
            const errorMessage = error.message || 'Failed to create order';
            
            if (errorMessage.includes('Unauthorized') || error.message?.includes('401')) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRecommendation = () => {
        navigate('/FoodRecommendation');
    };

    return (
        <div className="food-order-container">
            <h1>Order Your Food and Drinks</h1>
            <form onSubmit={handleSubmit}>
                <div className="select-container">
                    <label htmlFor="food-category">Food Category:</label>
                    <select 
                        id="food-category" 
                        value={foodCategory} 
                        onChange={(e) => {
                            setFoodCategory(e.target.value);
                            setFoodItem(foodOptions[e.target.value][0]);
                        }}
                    >
                        {Object.keys(foodOptions).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label htmlFor="food-item">Food Item:</label>
                    <select 
                        id="food-item" 
                        value={foodItem} 
                        onChange={(e) => setFoodItem(e.target.value)}
                    >
                        {foodOptions[foodCategory].map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label htmlFor="drink-category">Drink Category:</label>
                    <select 
                        id="drink-category" 
                        value={drinkCategory} 
                        onChange={(e) => {
                            setDrinkCategory(e.target.value);
                            setDrinkItem(drinkOptions[e.target.value][0]);
                        }}
                    >
                        {Object.keys(drinkOptions).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="select-container">
                    <label htmlFor="drink-item">Drink Item:</label>
                    <select 
                        id="drink-item" 
                        value={drinkItem} 
                        onChange={(e) => setDrinkItem(e.target.value)}
                    >
                        {drinkOptions[drinkCategory].map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="button-container">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="order-button"
                    >
                        {isSubmitting ? 'Processing...' : 'Order Now'}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleRecommendation}
                        className="recommendation-button"
                    >
                        Lihat Rekomendasi untuk Anda
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FoodOrder;