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
                        onAddToDiet={handleAddToDiet}  
                        isInCookbook={cookbookRecipes.some(r => r.uri === recipe.recipe.uri)}
                        isInDiet={dietRecipes.some(r => r.uri === recipe.recipe.uri)}  
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
