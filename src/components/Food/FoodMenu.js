import React from 'react';
import { useNavigate } from 'react-router-dom';  
import '../../styles/FoodMenu.css'; // Adjust the path to CSS file

const categories = {
    MainCourse: ["Nasi Goreng", "Pizza", "Burger", "Mie Goreng", "Ayam Goreng"],
    Snack: ["Crispy Mushroom", "Chicken Karage", "French Fries", "Tahu Crispy", "Cheese Roll"],
    Dessert: ["Choco Brownies", "Choco Cookies", "Ice Cream", "Chocolate Pudding", "Cheesecake"],
    Coffee: ["Americano", "Cappuccino", "Macchiato", "Espresso", "Kopi Susu"],
    NonCoffee: ["Lemon Tea", "Ice Tea", "Milk Tea", "Red Velvet", "Taro"]
};

function FoodMenu() {
    const formatImageName = (name) => {
        // Correctly load the image using require
        try {
            return require(`../../assets/${name.replace(/\s/g, '').toLowerCase()}.png`);
        } catch (error) {
            console.error(`Image not found for: ${name}`);
        }
    };

    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="menu-container">
            <h1>Menu Makanan dan Minuman</h1>
            {Object.keys(categories).map(category => (
                <div key={category} className="category">
                    <h2>{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
                    <div className="card-container">
                        {categories[category].map(item => (
                            <div key={item} className="card">
                                <img src={formatImageName(item)} alt={item} />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="buttons">
                <button className="btn" onClick={() => handleNavigate('/FoodOrder')}>Pesan Sekarang</button>
                <button className="btn" onClick={() => handleNavigate('/FoodRecommendation')}>Lihat Rekomendasi untuk Anda</button>
            </div>
        </div>
    );
}

export default FoodMenu;
