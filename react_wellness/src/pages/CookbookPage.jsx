import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CookbookRecipeCard from '../components/CookbookRecipeCard';

const CookbookPage = () => {
    const [cookbookRecipes, setCookbookRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCookbookRecipes = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User must be logged in to view the cookbook.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/recipes/cookbook/', {
                    headers: { Authorization: `Token ${token}` },
                });
                setCookbookRecipes(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access. Please log in.');
                } else {
                    setError('Failed to fetch cookbook recipes. Please try again.');
                }
            }
        };

        fetchCookbookRecipes();
    }, []);

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
        <div className="cookbook-page">
            <h1>Your Cookbook</h1>
            {error && <p className="error">{error}</p>}
            <div className="cookbook-recipes">
                {cookbookRecipes.map((item, index) => (
                    <CookbookRecipeCard 
                    key={index} 
                    recipe={item.recipe} 
                    onRemoveFromCookbook={() => handleRemoveFromCookbook(item.id)} 
                />
                ))}
            </div>
        </div>
    );
};

export default CookbookPage;
