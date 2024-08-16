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
        fetchCookbookRecipes();
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
                        onRemoveFromCookbook={() => handleRemoveFromCookbook(item.id)} 
                        isInCookbook={cookbookRecipes.some(r => r.uri === recipe.recipe.uri)}
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
