import React, { useState } from 'react';
import { fetchFoodRecommendation } from '../../api/api'; // Pastikan path api sudah benar
import '../../styles/FoodRecommendation.css'; // Pastikan path css sudah benar

function FoodRecommendation() {
    const [gender, setGender] = useState('');
    const [mood, setMood] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [foodType, setFoodType] = useState('');
    const [drinkType, setDrinkType] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            gender: gender.toLowerCase(),
            mood: mood.toLowerCase(),
            activity_level: activityLevel.toLowerCase(),
            food_type: foodType.toLowerCase(),
            drink_type: drinkType.toLowerCase(),
        };
    
        try {
            const response = await fetchFoodRecommendation(userData);
            setRecommendation(response.recommendations); // Update this line
        } catch (err) {
            setError('Failed to fetch recommendation');
            console.log(err); // Adding logging for better error tracking
        }
    };

    return (
        <div className="food-recommendation-container">
            <h1>Rekomendasi Makanan dan Minuman untuk Anda</h1>
            <form onSubmit={handleSubmit} className="recommendation-form">
                <div className="form-group">
                    <label>Gender:</label>
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Mood:</label>
                    <select onChange={(e) => setMood(e.target.value)} value={mood}>
                        <option value="">Select Mood</option>
                        <option value="happy">Happy</option>
                        <option value="loved">Loved</option>
                        <option value="focus">Focus</option>
                        <option value="chill">Chill</option>
                        <option value="sad">Sad</option>
                        <option value="scared">Scared</option>
                        <option value="angry">Angry</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Activity Level:</label>
                    <select onChange={(e) => setActivityLevel(e.target.value)} value={activityLevel}>
                        <option value="">Select Activity Level</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="moderately_active">Moderately Active</option>
                        <option value="very_active">Very Active</option>
                        <option value="extra_active">Extra Active</option>
                        <option value="sedentary">Sedentary</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Food Type:</label>
                    <select onChange={(e) => setFoodType(e.target.value)} value={foodType}>
                        <option value="">Select Food Type</option>
                        <option value="main_course">Main Course</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Drink Type:</label>
                    <select onChange={(e) => setDrinkType(e.target.value)} value={drinkType}>
                        <option value="">Select Drink Type</option>
                        <option value="coffee">Coffee</option>
                        <option value="non-coffee">Non Coffee</option>
                    </select>
                </div>

                <button type="submit">Lihat Rekomendasi</button>
            </form>

            {error && <p className="error">{error}</p>}

            {recommendation && (
                <div className="recommendation-result">
                    <p>Rekomendasi Makanan untuk Anda: {recommendation[0]}</p> 
                    <p>Rekomendasi Minuman untuk Anda: {recommendation[1]}</p> 
            </div>
            )}
        </div>
    );
}

export default FoodRecommendation;
