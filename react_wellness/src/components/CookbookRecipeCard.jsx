import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CookbookRecipeCard = ({ recipe, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInDiet, isInCookbook }) => {
    const [open, setOpen] = useState(false);

    const dietLabels = Array.isArray(recipe.diet_labels) ? recipe.diet_labels : recipe.diet_labels?.split(', ') || [];
    const healthLabels = Array.isArray(recipe.health_labels) ? recipe.health_labels : recipe.health_labels?.split(', ') || [];
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const nutritionalFacts = Array.isArray(recipe.nutritional_facts) ? recipe.nutritional_facts : [];

    const handleDietClick = () => {
        if (isInDiet) {
            onRemoveFromDiet(recipe);
        } else {
            onAddToDiet(recipe);
        }
    };

    const handleCookbookClick = () => {
        onRemoveFromCookbook(recipe);
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
            <p><strong>Ingredients:</strong> {ingredients.map(ingredient => ingredient.text).join(', ')}</p>
            <p><strong>Diet Labels:</strong> {dietLabels.join(', ')}</p>
            <p><strong>Health Labels:</strong> {healthLabels.join(', ')}</p>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View Details
            </Button>
            <div className="buttons">
                <button onClick={handleDietClick}>
                    {isInDiet ? 'Remove from Diet' : 'Add to Diet'}
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
                    <p><strong>Ingredients:</strong> {ingredients.map(ingredient => ingredient.text).join(', ')}</p>
                    <h4>Nutritional Facts:</h4>
                    {nutritionalFacts.length > 0 ? (
                        nutritionalFacts.map((nutrient, index) => (
                            <p key={index}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</p>
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
