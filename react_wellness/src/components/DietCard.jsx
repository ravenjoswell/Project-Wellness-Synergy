import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DietCard = ({ recipe, onRemoveFromDiet, onAddToCookbook, onRemoveFromCookbook, isInDiet, isInCookbook }) => {
    const [open, setOpen] = useState(false);

    // Assuming the recipe object has `dietLabels`, `healthLabels`, `name`, etc.
    const dietLabels = Array.isArray(recipe.dietLabels) ? recipe.dietLabels : recipe.dietLabels?.split(', ') || [];
    const healthLabels = Array.isArray(recipe.healthLabels) ? recipe.healthLabels : recipe.healthLabels?.split(', ') || [];

    const handleDietClick = () => {
        if (isInDiet) {
            onRemoveFromDiet(recipe);
        }
    };

    const handleCookbookClick = () => {
        if (isInCookbook) {
            onRemoveFromCookbook(recipe);
        } else {
            onAddToCookbook(recipe);
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
                <button onClick={handleDietClick}>
                    {isInDiet ? 'Remove from Diet' : 'Already in Diet'}
                </button>
                <button onClick={handleCookbookClick}>
                    {isInCookbook ? 'Remove from Cookbook' : 'Add to Cookbook'}
                </button>
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

export default DietCard;
