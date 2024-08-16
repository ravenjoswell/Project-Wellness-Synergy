import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import RecipeCard from '../components/RecipeCard';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DietPage = ({ recipes, onAddToDiet, onRemoveFromDiet, dietPlan }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMealTime, setSelectedMealTime] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (day) => {
        setSelectedDay(day);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMealTime(null);
    };

    const handleMealTimeClick = (mealTime) => {
        setSelectedMealTime(mealTime);
    };

    const getRecipesForMealTime = () => {
        if (!selectedMealTime || !selectedDay) return [];
        return dietPlan.filter(
            (item) => item.meal_time === selectedMealTime && item.date === selectedDay
        );
    };

    return (
        <div className="diet-page">
            <h1>My Diet Plan</h1>
            <div className="day-buttons">
                {daysOfWeek.map((day) => (
                    <Button
                        variant="outlined"
                        key={day}
                        onClick={() => handleOpen(day)}
                        className="day-button"
                    >
                        {day}
                    </Button>
                ))}
            </div>

            <Modal open={open} onClose={handleClose}>
                <div className="modal-content">
                    <h2>{selectedDay}</h2>
                    <div className="meal-time-buttons">
                        {['breakfast', 'lunch', 'dinner', 'snack'].map((mealTime) => (
                            <Button
                                key={mealTime}
                                variant="contained"
                                onClick={() => handleMealTimeClick(mealTime)}
                            >
                                {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}
                            </Button>
                        ))}
                    </div>
                    {selectedMealTime && (
                        <div className="recipe-list">
                            <h3>{selectedMealTime.charAt(0).toUpperCase() + selectedMealTime.slice(1)} Recipes</h3>
                            {getRecipesForMealTime().map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onAddToCookbook={onAddToDiet}
                                    onRemoveFromCookbook={onRemoveFromDiet}
                                    isInCookbook={true} // Logic to determine if it's in the diet plan
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default DietPage;
