import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CookbookRecipeCard = ({ recipe, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInDiet }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [open, setOpen] = useState(false);

    const dietLabels = Array.isArray(recipe.diet_labels) ? recipe.diet_labels : recipe.diet_labels.split(', ');
    const healthLabels = Array.isArray(recipe.health_labels) ? recipe.health_labels : recipe.health_labels.split(', ');

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const convertDayToDate = (day) => {
        const today = new Date();
        const dayIndex = daysOfWeek.indexOf(day);
        const currentDayIndex = today.getDay(); // Get the current day index

        let dayDifference = dayIndex - currentDayIndex;
        if (dayDifference < 0) {
            dayDifference += 7; // Adjust for days earlier in the week
        }

        const resultDate = new Date(today);
        resultDate.setDate(today.getDate() + dayDifference); // Adjust the date

        const dateString = resultDate.toISOString().split('T')[0]; // This will give the date in YYYY-MM-DD format
        return dateString;
    };

    return (
        <div className="recipe-card">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <p><strong>Calories:</strong> {Math.round(recipe.calories)} kcal</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.map(ingredient => ingredient.text).join(', ')}</p>
            <p><strong>Diet Labels:</strong> {dietLabels.join(', ')}</p>
            <p><strong>Health Labels:</strong> {healthLabels.join(', ')}</p>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View Details
            </Button>
            <div className="buttons">
                <button onClick={() => onRemoveFromCookbook(recipe.my_cookbook_id)}>
                    Remove from Cookbook
                </button>
                <div className="meal-time-select">
                    <label htmlFor={`meal-time-${recipe.uri}`}>Select Meal Time: </label>
                    <select
                        id={`meal-time-${recipe.uri}`}
                        value={selectedMealTime}
                        onChange={(e) => setSelectedMealTime(e.target.value)}
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                    <label htmlFor={`day-of-week-${recipe.uri}`}>Select Day: </label>
                    <select
                        id={`day-of-week-${recipe.uri}`}
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        {daysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <button onClick={handleDietClick}>
                        {isInDiet ? 'Remove from Diet' : `Add to ${selectedMealTime}`}
                    </button>
                </div>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{recipe.name}</DialogTitle>
                <DialogContent>
                    <img src={recipe.image} alt={recipe.name} style={{ width: '50%' }} />
                    <p><strong>Calories:</strong> {Math.round(recipe.calories)} kcal</p>
                    <p><strong>Diet Labels:</strong> {dietLabels.join(', ')}</p>
                    <p><strong>Health Labels:</strong> {healthLabels.join(', ')}</p>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.map(ingredient => ingredient.text).join(', ')}</p>
                    <h4>Nutritional Facts:</h4>
                    {recipe.totalNutrients ? (
                        Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                            <p key={key}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</p>
                        ))
                    ) : (
                        <p>No nutritional information available.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        href={recipe.instructions}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                    >
                        View Full Recipe Instructions
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CookbookRecipeCard;
