import { useState } from 'react'
import '../App.css'
import { FaHeart, FaRegHeart, FaEllipsisV, FaChevronDown } from 'react-icons/fa'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const CookbookRecipeCard = ({ recipe, onRemoveFromCookbook, onAddToDiet, onRemoveFromDiet, isInDiet, isInCookbook }) => {
    const [selectedMealTime, setSelectedMealTime] = useState('breakfast')
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [open, setOpen] = useState(false)

    const dietLabels = Array.isArray(recipe.diet_labels) ? recipe.diet_labels : recipe.diet_labels?.split(', ') || []
    const healthLabels = Array.isArray(recipe.health_labels) ? recipe.health_labels : recipe.health_labels?.split(', ') || []
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : []
    const nutritionalFacts = Array.isArray(recipe.nutritional_facts) ? recipe.nutritional_facts : []

    const handleDietClick = () => {
        const date = convertDayToDate(selectedDay)

        if (!selectedMealTime || !selectedDay || !date) {
            console.error('Meal time, day of the week, and date must be provided.')
            return
        }

        if (isInDiet) {
            onRemoveFromDiet(recipe, selectedMealTime, date)
        } else {
            onAddToDiet(recipe, selectedMealTime, selectedDay, date)
        }
    }

    const handleCookbookClick = () => {
        onRemoveFromCookbook(recipe.uri)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const convertDayToDate = (day) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const today = new Date()
        const dayIndex = daysOfWeek.indexOf(day)
        const currentDayIndex = today.getUTCDay()

        let dayDifference = dayIndex - currentDayIndex
        if (dayDifference < 0) {
            dayDifference += 7
        }

        const resultDate = new Date(today)
        resultDate.setUTCDate(today.getUTCDate() + dayDifference)

        return resultDate.toISOString().split('T')[0]
    }

    return (
        <div className="recipe-card">
            <div className="card-header">
                <div className="recipe-title">{recipe.name}</div>
                <a href={recipe.instructions} target="_blank" rel="noopener noreferrer" className="more-icon">
                    <FaEllipsisV />
                </a>
            </div>
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <div className="card-content">
                <p>Calories: {Math.round(recipe.calories)} kcal</p>
                <p>Ingredients: {ingredients.length}</p>
            </div>
            <div className="meal-time-select">
                <select className="dropdown" value={selectedMealTime} onChange={(e) => setSelectedMealTime(e.target.value)}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                </select>
                <select className="dropdown" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <button onClick={handleDietClick} className="diet-button">
                    {isInDiet ? 'Remove from Diet' : `Add to ${selectedMealTime}`}
                </button>
            </div>
            <div className="card-actions">
                <button className="favorite-icon" onClick={handleCookbookClick} style={{ color: isInCookbook ? 'red' : '#235ca1' }}>
                    {isInCookbook ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className="expand-icon" onClick={handleClickOpen}>
                    <FaChevronDown />
                </button>
            </div>

            {open && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{recipe.name}</h2>
                        <p><strong>Diet Labels:</strong> {dietLabels.join(', ')}</p>
                        <p><strong>Health Labels:</strong> {healthLabels.join(', ')}</p>
                        <p><strong>Ingredients:</strong> {ingredients.map(ingredient => ingredient.text).join(', ')}</p>
                        <p><strong>Nutritional Facts:</strong></p>
                        {nutritionalFacts.length > 0 ? (
                            nutritionalFacts.map((nutrient, index) => (
                                <p key={index}><strong>{nutrient.label}:</strong> {Math.round(nutrient.quantity)} {nutrient.unit}</p>
                            ))
                        ) : (
                            <p>No nutritional information available.</p>
                        )}
                        <button className="close-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CookbookRecipeCard
