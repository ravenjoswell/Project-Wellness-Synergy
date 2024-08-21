import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaEllipsisV, FaChevronDown } from 'react-icons/fa';

const RecipeCard = ({ recipe, onAddToCookbook, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInCookbook, isInDiet }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    }, [isOpen]);

    const handleCookbookClick = () => {
        if (isInCookbook) {
            onRemoveFromCookbook(recipe);
        } else {
            onAddToCookbook(recipe);
        }
    };

    const handleDietClick = () => {
        const date = convertDayToDate(selectedDay);

        if (!selectedMealTime || !selectedDay || !date) {
            console.error('Meal time, day of the week, and date must be provided.');
            return;
        }

        if (isInDiet) {
            onRemoveFromDiet(recipe, selectedMealTime, date);
        } else {
            onAddToDiet(recipe, selectedMealTime, selectedDay, date);
        }
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const convertDayToDate = (day) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const dayIndex = daysOfWeek.indexOf(day);
        const currentDayIndex = today.getUTCDay();

        let dayDifference = dayIndex - currentDayIndex;
        if (dayDifference < 0) {
            dayDifference += 7;
        }

        const resultDate = new Date(today);
        resultDate.setUTCDate(today.getUTCDate() + dayDifference);

        return resultDate.toISOString().split('T')[0];
    };

    return (
        <div className="recipe-card">
            <div className="card-header">
                <h2 className="recipe-title">{recipe.label}</h2>
                <button className="more-icon" onClick={() => window.open(recipe.url, '_blank')} title="View Cooking Instructions">
                    <FaEllipsisV />
                </button>
            </div>
            <img src={recipe.image} alt={recipe.label} className="recipe-image" />
            <div className="card-content">
                <p>Ingredients: {recipe.ingredients.length}</p>
                <div className="meal-time-select">
                    <select value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)} className="dropdown">
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                    <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="dropdown">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <button onClick={handleDietClick} className="diet-button">
                        {isInDiet ? 'Remove from Diet' : `Add to ${selectedMealTime}`}
                    </button>
                </div>
            </div>
            <div className="card-actions">
                <button onClick={handleCookbookClick} className="favorite-icon" title={isInCookbook ? "Remove from Cookbook" : "Add to Cookbook"}>
                    {isInCookbook ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button onClick={toggleModal} className="expand-icon" title="See More Details">
                    <FaChevronDown />
                </button>
            </div>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{recipe.label}</h3>
                        <p><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                        <p><strong>Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>
                        <p><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>
                        <p><strong>Nutritional Facts:</strong></p>
                        {recipe.totalNutrients ? (
                            Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                                <p key={key}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</p>
                            ))
                        ) : (
                            <p>No nutritional information available.</p>
                        )}
                        <button onClick={toggleModal} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeCard;
