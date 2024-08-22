import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Line, Pie, Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined' 
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined'
import '../App.css' 
import moment from 'moment'

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const HomePage = () => {
  const [userName, setUserName] = useState('')
  const [recipeCount, setRecipeCount] = useState(0)
  const [journalEntries, setJournalEntries] = useState([])
  const [mindfulnessLogs, setMindfulnessLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Token ${token}`
          },
        }

        const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', config)
        setUserName(userResponse.data.user)

        const recipesResponse = await axios.get('http://127.0.0.1:8000/api/recipes/cookbook/', config)
        setRecipeCount(recipesResponse.data.length)

        const journalResponse = await axios.get('http://127.0.0.1:8000/api/journal/journal-entries/', config)
        setJournalEntries(journalResponse.data)

        const mindfulnessResponse = await axios.get('http://127.0.0.1:8000/api/mindfulness/well-being-logs/', config)
        setMindfulnessLogs(mindfulnessResponse.data)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const dates = mindfulnessLogs.map(log => moment(log.date).format('YYYY-MM-DD'))
  const moodData = mindfulnessLogs.map(log => log.mood)
  const stressLevelData = mindfulnessLogs.map(log => log.stress_level)
  const sleepHoursData = mindfulnessLogs.map(log => log.sleep_hours)
  const anxietyLevelData = mindfulnessLogs.map(log => log.anxiety_level)
  const depressionLevelData = mindfulnessLogs.map(log => log.depression_level)

  const combinedLineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        fill: false,
        backgroundColor: '#66b3ff',
        borderColor: '#3A5FCD',
      },
      {
        label: 'Stress Level',
        data: stressLevelData,
        fill: false,
        backgroundColor: '#ff6666',
        borderColor: 'red',
      },
      {
        label: 'Sleep Hours',
        data: sleepHoursData,
        fill: false,
        backgroundColor: '#66ff66',
        borderColor: 'green',
      },
      {
        label: 'Anxiety Level',
        data: anxietyLevelData,
        fill: false,
        backgroundColor: '#d1b3ff',
        borderColor: 'purple',
      },
      {
        label: 'Depression Level',
        data: depressionLevelData,
        fill: false,
        backgroundColor: '#ffff99',
        borderColor: '#b8860b',
      }
    ]
  }

  const combinedLineChartOptions = {
    animations: {
      tension: {
        duration: 5000,
        easing: 'easeInBounce',
        from: 1,
        to: 0,
        loop: false
      }
    },
    scales: {
      x: {
        type: 'category',
        labels: dates,
        ticks: {
          font: {
            size: 20 
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 20 
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 20 
          }
        }
      }
    }
  }

  const journalEntriesCount = journalEntries.length
  const pieChartData = {
    labels: ['Logged', 'Remaining'],
    datasets: [
      {
        label: 'Journal Entries',
        data: [journalEntriesCount, 7 - journalEntriesCount],
        backgroundColor: ['#3A5FCD', '#b35900'],
      },
    ],
  
  }
  const pieChartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25 
          }
        }
      }
    }
  }

  const gaugeChartData = {
    labels: ['Recipes'],
    datasets: [
      {
        label: 'Recipes in Cookbook',
        data: [recipeCount, 20 - recipeCount],
        backgroundColor: ['#3A5FCD', '#b35900'],
      },
    ],
  }
  const gaugeChartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25 
          }
        }
      }
    }
  }

  return (
    <div className="home-page-wrapper">
      <div className="content">
        <h2 className="user-title">
          Hello, {userName}
        </h2>
        {/* Link Buttons */}
        <div className="wide-button-container">
          <Link to="/recipe" className="wide-button">
            <RestaurantOutlinedIcon style={{ fontSize: 30 }} />
            <div>
              <h3>Recipe</h3>
              <p>
                Explore a vast collection of recipes with powerful search and filter options to find the perfect dish for any occasion.
              </p>
            </div>
          </Link>
  
          <Link to="/cookbook" className="wide-button">
            <MenuBookOutlinedIcon style={{ fontSize: 30 }} />
            <div>
              <h3>Cookbook</h3>
              <p>
                Save your favorite recipes in your personal cookbook, ensuring they're always just a click away.
              </p>
            </div>
          </Link>
  
          <Link to="/diet" className="wide-button">
            <ArticleOutlinedIcon style={{ fontSize: 30 }} />
            <div>
              <h3>Diet</h3>
              <p>
                Plan your meals for the week with daily diet plans, organized by meal times to keep you on track with your nutritional goals.
              </p>
            </div>
          </Link>
  
          <Link to="/mindfulness" className="wide-button">
            <PsychologyAltOutlinedIcon style={{ fontSize: 30 }} />
            <div>
              <h3>Mindfulness</h3>
              <p>
                Track your mood, stress, sleep, anxiety, and depression levels. Get expert guidance on improving your mental and physical well-being with mindful practices.
              </p>
            </div>
          </Link>
  
          <Link to="/journal" className="wide-button">
            <DrawOutlinedIcon style={{ fontSize: 30 }} />
            <div>
              <h3>Journal</h3>
              <p>
                Reflect on your daily experiences and cultivate gratitude with a personal journaling space that supports your mental health journey.
              </p>
            </div>
          </Link>
        </div>

        {!loading && (
          <div className="dashboard">
            <h4 className="dashboard-title">
              Your Wellness Overview
            </h4>
            <div className="charts-container">
              <div className="dashboard-section">
                <h6>Cookbook</h6>
                <Doughnut data={gaugeChartData} options={gaugeChartOptions} />
              </div>
              <div className="dashboard-section">
                <h6>Journaling Tracker</h6>
                <Pie data={pieChartData} options={pieChartOptions}  />
              </div>
            </div>
            <div className="dashboard-section large-chart">
              <h6>Mindfulness Tracker</h6>
              <Line data={combinedLineChartData} options={combinedLineChartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
