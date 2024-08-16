import { useState } from 'react';
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

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setNextPageUrl(null); // Reset pagination on new search
        try {
            const response = await axios.get('http://localhost:8000/api/recipes/', {
                params: {
                    query,
                    diet,
                    allergies,
                },
            });
            setRecipes(response.data.hits);
            setNextPageUrl(response.data.next); // Store the next page 
        } catch (err) {
            setError('Failed to fetch recipes. Please try again.');
        }
        setLoading(false);
    };

    const handleLoadMore = async () => {
        if (!nextPageUrl) return; // No more pages 

        setLoading(true);
        try {
            const response = await axios.get(nextPageUrl);
            setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits]);
            setNextPageUrl(response.data.next); // Update the next page 
        } catch (err) {
            setError('Failed to load more recipes. Please try again.');
        }
        setLoading(false);
    };

   const handleAddToCookbook = async (recipe) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post('http://localhost:8000/api/recipes/add-to-cookbook/', 
            { uri: recipe.uri }, 
            {
                headers: {
                    Authorization: `Token ${token}`,
                }
            }
        );
        console.log('Added to Cookbook:', response.data);
    } catch (error) {
        console.error('Failed to add to cookbook:', error.response ? error.response.data : error.message);
    }
};


    const handleAddToDiet = async (recipe, mealTime) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/diet/add-to-diet/', {
                recipe_id: recipe.recipe.uri.split('_').pop(),
                meal_time: mealTime,
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Added to Diet:', response.data);
        } catch (error) {
            console.error('Failed to add to diet:', error);
        }
    };

    const handleRemoveFromCookbook = async (recipe) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/recipes/remove-from-cookbook/${recipe.recipe.uri.split('_').pop()}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Removed from Cookbook:', response.data);
        } catch (error) {
            console.error('Failed to remove from cookbook:', error);
        }
    };

    const handleRemoveFromDiet = async (recipe, mealTime) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/diet/remove-from-diet/${recipe.recipe.uri.split('_').pop()}/`, {
                data: { meal_time: mealTime },
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('Removed from Diet:', response.data);
        } catch (error) {
            console.error('Failed to remove from diet:', error);
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
                    <option value="">Select Diet</option>
                    <option value="balanced">Balanced</option>
                    <option value="high-fiber">High-Fiber</option>
                    <option value="high-protein">High-Protein</option>
                    <option value="low-carb">Low-Carb</option>
                    <option value="low-fat">Low-Fat</option>
                    <option value="low-sodium">Low-Sodium</option>
                    {/*diet options*/ }
                </select>
                <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
                    <option value="">Select Allergy</option>
                    <option value="alcohol-free">Alcohol-Free</option>
                    <option value="celery-free">Celery-Free</option>
                    <option value="crustacean-free">Crustacean-Free</option>
                    <option value="dairy-free">Dairy-Free</option>
                    <option value="egg-free">Egg-Free</option>
                    <option value="fish-free">Fish-Free</option>
                    <option value="fodmap-free">FODMAP-Free</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="immuno-supportive">Immuno-Supportive</option>
                    <option value="keto-friendly">Keto-Friendly</option>
                    <option value="kidney-friendly">Kidney-Friendly</option>
                    <option value="kosher">Kosher</option>
                    <option value="low-fat-abs">Low-Fat</option>
                    <option value="low-potassium">Low-Potassium</option>
                    <option value="low-sugar">Low-Sugar</option>
                    <option value="lupine-free">Lupine-Free</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="mollusk-free">Mollusk-Free</option>
                    <option value="mustard-free">Mustard-Free</option>
                    <option value="no-oil-added">No-Oil-Added</option>
                    <option value="paleo">Paleo</option>
                    <option value="peanut-free">Peanut-Free</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="pork-free">Pork-Free</option>
                    <option value="red-meat-free">Red-Meat-Free</option>
                    <option value="sesame-free">Sesame-Free</option>
                    <option value="shellfish-free">Shellfish-Free</option>
                    <option value="soy-free">Soy-Free</option>
                    <option value="sugar-conscious">Sugar-Conscious</option>
                    <option value="sulfite-free">Sulfite-Free</option>
                    <option value="tree-nut-free">Tree-Nut-Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="wheat-free">Wheat-Free</option>
                    {/*allergy options*/}
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
                        onAddToDiet={handleAddToDiet}
                        onRemoveFromCookbook={handleRemoveFromCookbook}
                        onRemoveFromDiet={handleRemoveFromDiet}
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
