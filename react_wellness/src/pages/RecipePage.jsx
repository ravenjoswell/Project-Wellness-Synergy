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
                            <option value="high-fiber">High-Fiber</option>
                            <option value="high-protein">High-Protein</option>
                            <option value="low-carb">Low-Carb</option>
                            <option value="low-fat">Low-Fat</option>
                            <option value="low-sodium">Low-Sodium</option>
                        </select>
                        <select value={allergies} onChange={(e) => setAllergies(e.target.value)}>
                            <option value="">Select Allergies</option>
                            <option value="alcohol-cocktail">Alcohol-Cocktail</option>
                            <option value="alcohol-free">Alcohol-Free</option>
                            <option value="celery-free">Celery-Free</option>
                            <option value="crustacean-free">Crustacean-Free</option>
                            <option value="dairy-free">Dairy-Free</option>
                            <option value="DASH">DASH</option>
                            <option value="egg-free">Egg-Free</option>
                            <option value="fish-free">Fish-Free</option>
                            <option value="fodmap-free">FODMAP-Free</option>
                            <option value="gluten-free">Gluten-Free</option>
                            <option value="immuno-supportive">Immuno-Supportive</option>
                            <option value="keto-friendly">Keto-Friendly</option>
                            <option value="kidney-friendly">Kidney-Friendly</option>
                            <option value="kosher">Kosher</option>
                            <option value="low-fat-abs">Low-Fat-Abs</option>
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
