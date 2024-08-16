import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CookbookRecipeCard = ({ recipe, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet }) => {
    const [isInDiet, setIsInDiet] = useState(false);
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [open, setOpen] = useState(false);

    const handleDietClick = () => {
        if (isInDiet) {
            onRemoveFromDiet(recipe);
        } else {
            onAddToDiet(recipe, selectedMealTime);
        }
        setIsInDiet(!isInDiet);
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="recipe-card">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <p><strong>Diet Labels:</strong> {recipe.diet_labels}</p>
            <p><strong>Health Labels:</strong> {recipe.health_labels}</p>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View Details
            </Button>
            <div className="buttons">
                <button onClick={() => onRemoveFromCookbook(recipe)}>
                    Remove from Cookbook
                </button>
                <div className="meal-time-select">
                    <label htmlFor={`meal-time-${recipe.id}`}>Select Meal Time: </label>
                    <select
                        id={`meal-time-${recipe.id}`}
                        value={selectedMealTime}
                        onChange={(e) => setSelectedMealTime(e.target.value)}
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
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
                    <p><strong>Diet Labels:</strong> {recipe.diet_labels}</p>
                    <p><strong>Health Labels:</strong> {recipe.health_labels}</p>
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <h4>Nutritional Facts:</h4>
                    {recipe.nutritional_facts.map(nutrient => (
                        <p key={nutrient.id}><strong>{nutrient.label}:</strong> {nutrient.quantity} {nutrient.unit}</p>
                    ))}
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
