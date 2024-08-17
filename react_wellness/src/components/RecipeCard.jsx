import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const RecipeCard = ({ recipe, onAddToCookbook, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInCookbook, isInDiet }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [open, setOpen] = useState(false);

    const handleCookbookClick = () => {
        if (isInCookbook) {
            onRemoveFromCookbook(recipe);
        } else {
            onAddToCookbook(recipe);
        }
    };

    const handleDietClick = () => {
        if (isInDiet) {
            onRemoveFromDiet(recipe, selectedMealTime, convertDayToDate(selectedDay));
        } else {
            onAddToDiet(recipe, selectedMealTime, convertDayToDate(selectedDay));
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
        const currentDayIndex = today.getDay();
        const dayDifference = dayIndex - currentDayIndex;
        const resultDate = new Date(today);
        resultDate.setDate(today.getDate() + dayDifference);
        return resultDate.toISOString().split('T')[0];  // Convert to YYYY-MM-DD format
    };

    return (
        <div className="recipe-card">
            <h2>{recipe.label}</h2>
            <img src={recipe.image} alt={recipe.label} />
            <p><strong>Calories:</strong> {Math.round(recipe.calories)} kcal</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.length}</p>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View Details
            </Button>
            <div className="buttons">
                <div className="buttons">
                    {isInCookbook ? (
                        <button onClick={() => onRemoveFromCookbook(recipe.my_cookbook_id)}>
                            Remove from Cookbook
                        </button>
                    ) : (
                        <button onClick={() => onAddToCookbook(recipe)}>
                            Add to Cookbook
                        </button>
                    )}
                </div>
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
                <DialogTitle>{recipe.label}</DialogTitle>
                <DialogContent>
                    <img src={recipe.image} alt={recipe.label} style={{ width: '50%' }} />
                    <p><strong>Calories:</strong> {Math.round(recipe.calories)} kcal</p>
                    <p><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}</p>
                    <p><strong>Health Labels:</strong> {recipe.healthLabels.join(', ')}</p>
                    <p><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</p>
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
                        href={recipe.url}
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

export default RecipeCard;
