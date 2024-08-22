import { useEffect, useState } from 'react'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import DietCard from '../components/DietCard'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DietPage = () => {
    const [dietPlan, setDietPlan] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mealTimeModalOpen, setMealTimeModalOpen] = useState(false)
    const [recipeModalOpen, setRecipeModalOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMealTime, setSelectedMealTime] = useState('')
    const [selectedRecipes, setSelectedRecipes] = useState([])
    const [showWeeklyLog, setShowWeeklyLog] = useState(false)
    const [weeklyReflection, setWeeklyReflection] = useState('')
    const [goalsForNextWeek, setGoalsForNextWeek] = useState('')
    const [challenges, setChallenges] = useState('')
    const [highlights, setHighlights] = useState('')

    const {
        handleRemoveFromDiet,
        dietRecipes,
        handleRemoveFromCookbook,
        handleAddToCookbook,
        cookbookRecipes,
    } = useOutletContext()

    useEffect(() => {
        fetchDietPlan()
    }, [])

    const fetchDietPlan = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get('http://localhost:8000/api/diet/daily-diet-plans/', {
                headers: { Authorization: `Token ${token}` },
            })
            const dietPlanData = organizeDietData(response.data)
            setDietPlan(dietPlanData)
            setLoading(false)
        } catch (err) {
            setError('Failed to fetch diet plan', err)
            setLoading(false)
        }
    }

    const organizeDietData = (data) => {
        const organizedData = {}

        daysOfWeek.forEach(day => {
            organizedData[day] = {
                date: '',
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            }
        })

        data.forEach(item => {
            const date = new Date(item.date)
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })

            organizedData[dayName].date = date.toISOString().split('T')[0]

            item.meals.forEach(meal => {
                organizedData[dayName][meal.meal_time].push(meal.recipe)
            })
        })

        return organizedData
    }

    const handleDayClick = (day) => {
        setSelectedDay(day)
        setMealTimeModalOpen(true)
    }

    const handleMealTimeClick = (mealTime) => {
        setSelectedMealTime(mealTime)
        setSelectedRecipes(dietPlan[selectedDay][mealTime] || [])
        setRecipeModalOpen(true)
        setMealTimeModalOpen(false)
    }

    const handleCloseMealTimeModal = () => {
        setMealTimeModalOpen(false)
        setSelectedDay('')
    }

    const handleCloseRecipeModal = () => {
        setRecipeModalOpen(false)
        setSelectedMealTime('')
        setSelectedRecipes([])
    }

    const isRecipeInDiet = (recipe) => {
        return dietRecipes.some(r => r.uri === recipe.uri)
    }

    const isRecipeInCookbook = (recipe) => {
        return cookbookRecipes.some(r => r.uri === recipe.uri)
    }

    const handleWeeklyLogEntry = async (e) => {
        e.preventDefault()  
        try {
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:8000/api/diet/weekly-log/', {
                reflection: weeklyReflection,
                goals: goalsForNextWeek,
                challenges: challenges,
                highlights: highlights,
            }, {
                headers: { Authorization: `Token ${token}` },
            })
            
            fetchDietPlan()
            
            setWeeklyReflection('')
            setGoalsForNextWeek('')
            setChallenges('')
            setHighlights('')
        } catch (err) {
            setError('Failed to submit weekly log entry',err)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="diet-outer-container">
            <div className="diet-page-wrapper">
                <div className="diet-page">
                    <h1 className="diet-page-title">Weekly Wellness Planner</h1>
                    <div className="diet-plan-container">
                        {Object.keys(dietPlan).map(day => (
                            <div key={day} className="day-section" onClick={() => handleDayClick(day)}>
                                <h3>{day}</h3>
                                <p>{dietPlan[day].date}</p>
                            </div>
                        ))}
                    </div>

                    <button 
                        className="weekly-log-button" 
                        onClick={() => setShowWeeklyLog(!showWeeklyLog)}
                    >
                        {showWeeklyLog ? 'Hide Weekly Log' : 'Initiate Weekly Log'}
                    </button>

                    {showWeeklyLog && (
                        <form onSubmit={handleWeeklyLogEntry} style={{ marginTop: '20px' }}>
                            <textarea
                                placeholder="Weekly Reflection"
                                value={weeklyReflection}
                                onChange={(e) => setWeeklyReflection(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Goals for Next Week"
                                value={goalsForNextWeek}
                                onChange={(e) => setGoalsForNextWeek(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Challenges"
                                value={challenges}
                                onChange={(e) => setChallenges(e.target.value)}
                            />
                            <textarea
                                placeholder="Highlights"
                                value={highlights}
                                onChange={(e) => setHighlights(e.target.value)}
                            />
                            <button type="submit" className="weekly-submit-button" disabled={loading}>
                                {loading ? 'Saving...' : 'Submit Weekly Log and Clear Diet'}
                            </button>
                        </form>
                    )}

                    {mealTimeModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Select Meal Time for {selectedDay}</h2>
                                <div className="meal-times">
                                    {['breakfast', 'lunch', 'dinner', 'snack'].map(mealTime => (
                                        <button
                                            key={mealTime}
                                            onClick={() => handleMealTimeClick(mealTime)}
                                            className="meal-time"
                                        >
                                            {mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={handleCloseMealTimeModal} className="close-modal-button">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {recipeModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>{selectedMealTime.charAt(0).toUpperCase() + selectedMealTime.slice(1)} Recipes for {selectedDay}</h2>
                                <div className="recipes">
                                    {selectedRecipes.length > 0 ? (
                                        selectedRecipes.map((meal, index) => {
                                            const recipe = {
                                                ...meal,
                                                dietLabels: meal.diet_labels.split(', '),
                                                healthLabels: meal.health_labels.split(', '),
                                                ingredients: meal.ingredients,
                                            }
                                            return (
                                                <DietCard 
                                                    key={index} 
                                                    recipe={recipe}  
                                                    onRemoveFromDiet={handleRemoveFromDiet}
                                                    onAddToCookbook={handleAddToCookbook} 
                                                    onRemoveFromCookbook={handleRemoveFromCookbook}
                                                    isInDiet={isRecipeInDiet(recipe)}  
                                                    isInCookbook={isRecipeInCookbook(recipe)}
                                                />
                                            )
                                        })
                                    ) : (
                                        <p>No recipes added for this meal time.</p>
                                    )}
                                </div>
                                <button onClick={handleCloseRecipeModal} className="close-modal-button">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DietPage
