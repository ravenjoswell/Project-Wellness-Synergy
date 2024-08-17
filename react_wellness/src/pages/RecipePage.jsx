import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const RecipePage = () => {
    const [query, setQuery] = useState('');
    const [diet, setDiet] = useState('');
    const [allergies, setAllergies] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [cookbookRecipes, setCookbookRecipes] = useState([]);
    const [dietRecipes, setDietRecipes] = useState([]);  // State for diet recipes

    // Fetch recipes from the API
    useEffect(() => {
        const fetchCookbookRecipes = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/recipes/cookbook/', {
                    headers: { Authorization: `Token ${token}` },
                });
                setCookbookRecipes(response.data);
            } catch (err) {
                console.error('Failed to fetch cookbook recipes:', err);
            }
        };

        const fetchDietRecipes = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/diet/diet-plans/', {
                    headers: { Authorization: `Token ${token}` },
                });
                setDietRecipes(response.data);
            } catch (err) {
                console.error('Failed to fetch diet recipes:', err);
            }
        };

        fetchCookbookRecipes();
        fetchDietRecipes();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setNextPageUrl(null);
        try {
            const response = await axios.get('http://localhost:8000/api/recipes/', {
                params: { query, diet, allergies },
            });
            setRecipes(response.data.hits);
            setNextPageUrl(response.data.next);
        } catch (err) {
            setError('Failed to fetch recipes. Please try again.');
        }
        setLoading(false);
    };

    const handleLoadMore = async () => {
        if (!nextPageUrl) return;

        setLoading(true);
        try {
            const response = await axios.get(nextPageUrl);
            setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits]);
            setNextPageUrl(response.data.next);
        } catch (err) {
            setError('Failed to load more recipes. Please try again.');
        }
        setLoading(false);
    };

    const handleAddToCookbook = async (recipe) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8000/api/recipes/add-to-cookbook/', 
                { uri: recipe.uri }, 
                { headers: { Authorization: `Token ${token}` } }
            );
            setCookbookRecipes([...cookbookRecipes, recipe]);
        } catch (error) {
            console.error('Failed to add to cookbook:', error.response ? error.response.data : error.message);
        }
    };

    const handleRemoveFromCookbook = async (myCookbookId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/recipes/remove-from-cookbook/${myCookbookId}/`, {
                headers: { Authorization: `Token ${token}` }
            });
            console.log('Removed from Cookbook');
            setCookbookRecipes(prevRecipes => 
                prevRecipes.filter(r => r.id !== myCookbookId) 
            );
        } catch (error) {
            console.error('Failed to remove from cookbook:', error);
        }
    };

    const handleAddToDiet = async (recipe, mealTime, day) => {
        const token = localStorage.getItem('token');
    
        if (!mealTime || !day) {
            console.error('Meal time and day must be provided.');
            return;
        }
    
        try {
            await axios.post('http://localhost:8000/api/diet/add-to-diet/', 
                { 
                    uri: recipe.uri,  // Send the recipe URI
                    meal_time: mealTime,  // Send the meal time ("breakfast")
                    date: day  // Send the date (e.g., "2024-08-17")
                }, 
                { headers: { Authorization: `Token ${token}` } }
            );
            setDietRecipes((prevDietRecipes) => [...prevDietRecipes, recipe]);  // Update the diet recipes state
        } catch (error) {
            console.error('Failed to add to diet:', error.response ? error.response.data : error.message);
        }
    };
    

    

    return (
        <div className="recipe-page">
            <h1>Find Your Perfect Recipe</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                    {/* diet options */}
                </select>
                <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
                    {/* allergy options */}
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="recipe-results">
                {recipes.map((recipe, index) => (
                    <RecipeCard 
                        key={index} 
                        recipe={recipe.recipe} 
                        onAddToCookbook={handleAddToCookbook}
                        onRemoveFromCookbook={() => handleRemoveFromCookbook(recipe.my_cookbook_id)} 
                        onAddToDiet={handleAddToDiet}  // Pass the add to diet function
                        isInCookbook={cookbookRecipes.some(r => r.uri === recipe.recipe.uri)}
                        isInDiet={dietRecipes.some(r => r.uri === recipe.recipe.uri)}  // Check if the recipe is in the diet plan
                    />
                ))}
            </div>
            {nextPageUrl && !loading && (
                <button onClick={handleLoadMore}>Load More Recipes</button>
            )}
        </div>
    );
};

export default RecipePage;
