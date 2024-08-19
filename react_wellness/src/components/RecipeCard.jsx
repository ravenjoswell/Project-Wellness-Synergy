import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
        <Card sx={{ maxWidth: 330, margin: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px' }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        height: '60px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'normal', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical',
                        wordWrap: 'break-word', // Prevents long words from breaking the layout
                    }}
                >
                    {recipe.label}
                </Typography>
                <Tooltip title="View Cooking Instructions">
                    <IconButton href={recipe.url} target="_blank" rel="noopener noreferrer">
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <CardMedia
                component="img"
                height="194"
                image={recipe.image}
                alt={recipe.label}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Ingredients: {recipe.ingredients.length}
                </Typography>
                <div className="meal-time-select">
                    <select value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)}>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                    <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                        {daysOfWeek.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <Button onClick={handleDietClick} variant="contained" color={isInDiet ? "secondary" : "primary"}>
                        {isInDiet ? 'Remove from Diet' : `Add to ${selectedMealTime}`}
                    </Button>
                </div>
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <Tooltip title={isInCookbook ? "Remove from Cookbook" : "Add to Cookbook"}>
                    <IconButton onClick={handleCookbookClick} color={isInCookbook ? "error" : "default"}>
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View More Details">
                    <IconButton onClick={handleClickOpen}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>

            {/* Modal for Recipe Details */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{recipe.label}</DialogTitle>
                <DialogContent>
                    <Typography paragraph><strong>Diet Labels:</strong> {recipe.dietLabels.join(', ')}</Typography>
                    <Typography paragraph><strong>Health Labels:</strong> {recipe.healthLabels.join(', ')}</Typography>
                    <Typography paragraph><strong>Ingredients:</strong> {recipe.ingredientLines.join(', ')}</Typography>
                    <Typography paragraph><strong>Nutritional Facts:</strong></Typography>
                    {recipe.totalNutrients ? (
                        Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                            <Typography paragraph key={key}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</Typography>
                        ))
                    ) : (
                        <Typography paragraph>No nutritional information available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default RecipeCard;
