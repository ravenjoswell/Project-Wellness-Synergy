import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CookbookRecipeCard = ({ recipe, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInDiet }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [open, setOpen] = useState(false);

    const dietLabels = Array.isArray(recipe.diet_labels) ? recipe.diet_labels : recipe.diet_labels.split(', ');
    const healthLabels = Array.isArray(recipe.health_labels) ? recipe.health_labels : recipe.health_labels.split(', ');

    
    const handleDietClick = () => {
        if (isInDiet) {
            onRemoveFromDiet(recipe);
        } else {
            onAddToDiet(recipe, selectedMealTime);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
            <div className="buttons">
                    <button onClick={() => onRemoveFromCookbook(recipe.my_cookbook_id)}>
                        Remove from Cookbook
                    </button>
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
