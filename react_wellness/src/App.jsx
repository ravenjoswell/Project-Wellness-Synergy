import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { confirmUser } from './utilities'
import axios from 'axios'

function App() {
  const [user, setUser] = useState(null)
  const [query, setQuery] = useState('')
  const [diet, setDiet] = useState('')
  const [allergies, setAllergies] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [cookbookRecipes, setCookbookRecipes] = useState([])
  const [dietRecipes, setDietRecipes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const authenticatedUser = await confirmUser()
      setUser(authenticatedUser)
    };
    checkUser()
  }, []);

  useEffect(() => {
    let nullUserUrls = ['/', '/login', '/signup']
    let nullAllowed = nullUserUrls.includes(location.pathname)

    if (user && nullAllowed) {
      navigate('/home')
    } else if (!user && !nullAllowed) {
      navigate('/login')
    }
  }, [location.pathname, user, navigate])

  // Fetch cookbook and diet recipes
  useEffect(() => {
    const fetchCookbookRecipes = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:8000/api/recipes/cookbook/', {
          headers: { Authorization: `Token ${token}` },
        });
        setCookbookRecipes(response.data);
      } catch (err) {
        console.error('Failed to fetch cookbook recipes:', err)
      }
    };

    const fetchDietRecipes = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('http://localhost:8000/api/diet/diet-plans/', {
          headers: { Authorization: `Token ${token}` },
        });
        setDietRecipes(response.data);
      } catch (err) {
        console.error('Failed to fetch diet recipes:', err)
      }
    };

    fetchCookbookRecipes()
    fetchDietRecipes()
  }, []);

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setNextPageUrl(null)
    try {
      const response = await axios.get('http://localhost:8000/api/recipes/', {
        params: { query, diet, allergies },
      });
      setRecipes(response.data.hits)
      setNextPageUrl(response.data.next)
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.', err);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    if (!nextPageUrl) return;

    setLoading(true);
    try {
      const response = await axios.get(nextPageUrl)
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.hits])
      setNextPageUrl(response.data.next)
    } catch (err) {
      setError('Failed to load more recipes. Please try again.', err);
    }
    setLoading(false);
  };

  const handleAddToCookbook = async (recipe) => {
    const token = localStorage.getItem('token')
    try {
      await axios.post('http://localhost:8000/api/recipes/add-to-cookbook/', 
        { uri: recipe.uri }, 
        { headers: { Authorization: `Token ${token}` } }
      );
      setCookbookRecipes([...cookbookRecipes, recipe])
    } catch (error) {
      console.error('Failed to add to cookbook:', error.response ? error.response.data : error.message)
    }
  };

  const handleRemoveFromCookbook = async (myCookbookId) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:8000/api/recipes/remove-from-cookbook/${myCookbookId}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setCookbookRecipes(prevRecipes => 
        prevRecipes.filter(r => r.id !== myCookbookId) 
      );
    } catch (error) {
      console.error('Failed to remove from cookbook:', error)
    }
  };

  const handleAddToDiet = async (recipe, mealTime, dayOfWeek, date) => {
    const token = localStorage.getItem('token')

    if (!mealTime || !dayOfWeek || !date) {
      console.error('Meal time, day of the week, and date must be provided.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/diet/add-to-diet/', 
        { 
          uri: recipe.uri,  //recipe.uri in AddToCookbookView
          meal_time: mealTime,  
          day_of_week: dayOfWeek,  
          date: date  
        }, 
        { headers: { Authorization: `Token ${token}` } }
      );
      setDietRecipes((prevDietRecipes) => [...prevDietRecipes, recipe]);  
      
    } catch (error) {
      console.error('Failed to add to diet:', error.response ? error.response.data : error.message);
    }
};

const handleRemoveFromDiet = async (dietPlanMealId) => {
  const token = localStorage.getItem('token')
  try {
      await axios.delete(`http://localhost:8000/api/diet/remove-from-diet/${dietPlanMealId}/`, {
          headers: { Authorization: `Token ${token}` }
      });

      
      setDietRecipes((prevDietRecipes) => prevDietRecipes.filter(r => r.id !== dietPlanMealId));
  } catch (err) {
      console.error("Failed to remove recipe from diet:", err);
  }
};

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{
        user, 
        setUser,
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
        handleRemoveFromDiet,
        cookbookRecipes,
        dietRecipes,
      }} />
      <Footer />
    </>
  );
}

export default App;