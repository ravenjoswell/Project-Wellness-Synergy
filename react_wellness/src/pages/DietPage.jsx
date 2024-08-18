import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DietCard from '../components/DietCard';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DietPage = () => {
    const [dietPlan, setDietPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mealTimeModalOpen, setMealTimeModalOpen] = useState(false);
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMealTime, setSelectedMealTime] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    const {
        handleRemoveFromDiet,
        handleAddToDiet,
        dietRecipes,
        handleRemoveFromCookbook,
        handleAddToCookbook,
        cookbookRecipes,
    } = useOutletContext();

    useEffect(() => {
        const fetchDietPlan = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/diet/daily-diet-plans/', {
                    headers: { Authorization: `Token ${token}` },
                });
                const dietPlanData = organizeDietData(response.data);
                setDietPlan(dietPlanData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch diet plan');
                setLoading(false);
            }
        };

        fetchDietPlan();
    }, []);

    const organizeDietData = (data) => {
        const organizedData = {};
    
        daysOfWeek.forEach(day => {
            organizedData[day] = {
                date: '',
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            };
        });
    
        data.forEach(item => {
            const date = new Date(item.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
    
            organizedData[dayName].date = date.toISOString().split('T')[0]; // Add the date to the day
    
            item.meals.forEach(meal => {
                organizedData[dayName][meal.meal_time].push(meal.recipe);
            });
        });
    
        return organizedData;
    };
    
    

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setMealTimeModalOpen(true);
    };

    const handleMealTimeClick = (mealTime) => {
        setSelectedMealTime(mealTime);
        setSelectedRecipes(dietPlan[selectedDay][mealTime] || []);
        setRecipeModalOpen(true);
        setMealTimeModalOpen(false);
    };

    const handleCloseMealTimeModal = () => {
        setMealTimeModalOpen(false);
        setSelectedDay('');
    };

    const handleCloseRecipeModal = () => {
        setRecipeModalOpen(false);
        setSelectedMealTime('');
        setSelectedRecipes([]);
    };
    

    const isRecipeInCookbook = (recipe) => {
        return cookbookRecipes.some(r => r.uri === recipe.uri);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="diet-page">
            <h1>My Diet Plan</h1>
            <div className="diet-plan-container">
                {Object.keys(dietPlan).map(day => (
                    <div key={day} className="day-section" onClick={() => handleDayClick(day)}>
                        <h3>{day} {dietPlan[day].date && `(${dietPlan[day].date})`}</h3>
                    </div>
                ))}
            </div>

            <Dialog open={mealTimeModalOpen} onClose={handleCloseMealTimeModal} maxWidth="sm" fullWidth>
                <DialogTitle>Select Meal Time for {selectedDay}</DialogTitle>
                <DialogContent>
                    {['breakfast', 'lunch', 'dinner', 'snack'].map(mealTime => (
                        <Button
                            key={mealTime}
                            onClick={() => handleMealTimeClick(mealTime)}
                            fullWidth
                            variant="outlined"
                            color="primary"
                            style={{ margin: '10px 0' }}
                        >
                            {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}
                        </Button>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMealTimeModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={recipeModalOpen} onClose={handleCloseRecipeModal} maxWidth="md" fullWidth>
                <DialogTitle>{selectedMealTime.charAt(0).toUpperCase() + selectedMealTime.slice(1)} Recipes for {selectedDay}</DialogTitle>
                <DialogContent>
                    {selectedRecipes.length > 0 ? (
                        selectedRecipes.map((meal, index) => {
                            const recipe = {
                                ...meal,
                                dietLabels: meal.diet_labels.split(', '),
                                healthLabels: meal.health_labels.split(', '),
                                ingredients: meal.ingredients,  // Ensure ingredients are passed as an array of objects
                            };
                            return (
                                <DietCard 
                                    key={index} 
                                    recipe={recipe}  
                                    onRemoveFromDiet={handleRemoveFromDiet}
                                    onAddToCookbook={handleAddToCookbook} 
                                    onRemoveFromCookbook={handleRemoveFromCookbook}
                                    isInDiet={dietRecipes.some(r => r.uri === meal.uri)}  
                                    isInCookbook={isRecipeInCookbook(meal)}
                                />
                            );
                        })
                    ) : (
                        <p>No recipes added for this meal time.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRecipeModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DietPage;
