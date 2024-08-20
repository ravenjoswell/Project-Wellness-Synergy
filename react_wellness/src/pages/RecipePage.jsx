import React from 'react';
import { useOutletContext } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const RecipePage = () => {
    const {
        query,
        setQuery,
        diet,
        setDiet,
        allergies,
        setAllergies,
        recipes,
        loading,
        error,
        nextPageUrl,
        handleSearch,
        handleLoadMore,
        handleAddToCookbook,
        handleRemoveFromCookbook,
        handleAddToDiet,
        cookbookRecipes,
        dietRecipes,
    } = useOutletContext();

    return (
        <div className="recipe-page">
            {/* Video Background */}
            <div className="recipe-video-container">
                <video autoPlay loop muted>
                    <source src="./recipepagebg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay-content">
                    <h1>Recipe</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for a recipe..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="filter-bar">
                        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                            <option value="">Select Diet</option>
                            <option value="balanced">Balanced</option>
                            <option value="high-protein">High-Protein</option>
                            {/* Add more options as needed */}
                        </select>
                        <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
                            <option value="">Select Health</option>
                            <option value="gluten-free">Gluten-Free</option>
                            <option value="vegan">Vegan</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
            </div>

            {/* Gradient Background for Recipes */}
            <div className="recipe-results-container">
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                <div className="recipe-results">
                    {recipes.map((recipe, index) => (
                        <RecipeCard 
                            key={index} 
                            recipe={recipe.recipe} 
                            onAddToCookbook={handleAddToCookbook}
                            onRemoveFromCookbook={() => handleRemoveFromCookbook(recipe.my_cookbook_id)} 
                            onAddToDiet={handleAddToDiet}  
                            isInCookbook={cookbookRecipes.some(r => r.uri === recipe.recipe.uri)}
                            isInDiet={dietRecipes.some(r => r.uri === recipe.recipe.uri)}  
                        />
                    ))}
                </div>
                {nextPageUrl && !loading && (
                    <button className="load-more" onClick={handleLoadMore}>
                        Load More Recipes
                    </button>
                )}
            </div>
        </div>
    );
};

export default RecipePage;
