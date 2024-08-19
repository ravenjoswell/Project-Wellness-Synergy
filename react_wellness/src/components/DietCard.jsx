import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DietCard = ({ recipe, onRemoveFromDiet, onAddToCookbook, onRemoveFromCookbook, onAddToDiet, isInDiet, isInCookbook }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [open, setOpen] = useState(false);

    const dietLabels = Array.isArray(recipe.diet_labels) ? recipe.diet_labels : recipe.diet_labels?.split(', ') || [];
    const healthLabels = Array.isArray(recipe.health_labels) ? recipe.health_labels : recipe.health_labels?.split(', ') || [];
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

    const handleDietClick = () => {
        const date = convertDayToDate(selectedDay);

        if (!selectedMealTime || !selectedDay || !date) {
            console.error('Meal time, day of the week, and date must be provided.');
            return;
        }

        // Allow adding the same recipe to different meals or days
        onAddToDiet(recipe, selectedMealTime, selectedDay, date);
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
            <CardHeader
                title={
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
                            wordWrap: 'break-word',
                        }}
                    >
                        {recipe.name}
                    </Typography>
                }
                action={
                    <Tooltip title="View Cooking Instructions">
                        <IconButton href={recipe.instructions} target="_blank" rel="noopener noreferrer">
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                }
                subheader={`Calories: ${Math.round(recipe.calories)} kcal`}
            />
            <CardMedia
                component="img"
                height="194"
                image={recipe.image}
                alt={recipe.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Ingredients: {ingredients.length}
                </Typography>
                <div className="meal-time-select" style={{ textAlign: 'center', marginTop: '16px' }}>
                    <select value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)} style={{ marginRight: '10px' }}>
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
                    <Button onClick={handleDietClick} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        Add to {selectedMealTime}
                    </Button>
                    {isInDiet && (
                        <Button onClick={() => onRemoveFromDiet(recipe)} variant="contained" color="secondary" style={{ marginTop: '16px' }}>
                            Remove from Diet
                        </Button>
                    )}
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
                <DialogTitle>{recipe.name}</DialogTitle>
                <DialogContent>
                    <Typography paragraph><strong>Diet Labels:</strong> {dietLabels.join(', ')}</Typography>
                    <Typography paragraph><strong>Health Labels:</strong> {healthLabels.join(', ')}</Typography>
                    <Typography paragraph><strong>Ingredients:</strong> {ingredients.map(ingredient => ingredient.text).join(', ')}</Typography>
                    <Typography paragraph><strong>Nutritional Facts:</strong></Typography>
                    {recipe.nutritional_facts ? (
                        recipe.nutritional_facts.map((nutrient, index) => (
                            <Typography paragraph key={index}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</Typography>
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

export default DietCard;
