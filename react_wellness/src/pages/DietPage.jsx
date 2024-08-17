import React, { useEffect, useState } from 'react';
import axios from 'axios';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Adjusted to start with Sunday

const DietPage = () => {
    const [dietPlan, setDietPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDietPlan = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/diet/daily-diet-plans/', {
                    headers: { Authorization: `Token ${token}` },
                });
                const dietPlanData = organizeDietData(response.data);
                setDietPlan(dietPlanData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch diet plan');
                setLoading(false);
            }
        };

        fetchDietPlan();
    }, []);

    const organizeDietData = (data) => {
        const organizedData = {};

        daysOfWeek.forEach(day => {
            organizedData[day] = {
                date: '',
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            };
        });

        data.forEach(item => {
            const date = new Date(item.date);
            const dayName = daysOfWeek[date.getDay()];

            organizedData[dayName].date = date.toLocaleDateString(); // Add the date to the day
            item.meals.forEach(meal => {
                organizedData[dayName][meal.meal_time].push(meal.recipe);
            });
        });

        return organizedData;
    };

    const renderMealTime = (mealTime, recipes) => (
        <div className="meal-time-section">
            <h4>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</h4>
            {recipes.length > 0 ? (
                recipes.map(recipe => (
                    <div key={recipe.uri} className="recipe-item">
                        <p>{recipe.name}</p>
                    </div>
                ))
            ) : (
                <p>No recipes added.</p>
            )}
        </div>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="diet-page">
            <h1>My Diet Plan</h1>
            <div className="diet-plan-container">
                {Object.keys(dietPlan).map(day => (
                    <div key={day} className="day-section">
                        <h3>{day} {dietPlan[day].date && `(${dietPlan[day].date})`}</h3>
                        {renderMealTime('breakfast', dietPlan[day].breakfast)}
                        {renderMealTime('lunch', dietPlan[day].lunch)}
                        {renderMealTime('dinner', dietPlan[day].dinner)}
                        {renderMealTime('snack', dietPlan[day].snack)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DietPage;
