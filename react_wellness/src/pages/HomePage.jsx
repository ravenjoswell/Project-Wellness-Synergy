import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Box from '../components/Box';
import '../App.css'; 
import { Button } from '@mui/material';
import moment from 'moment';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);
  const [mindfulnessLogs, setMindfulnessLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Token ${token}`
          },
        };

        const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', config);
        setUserName(userResponse.data.user);

        const recipesResponse = await axios.get('http://127.0.0.1:8000/api/recipes/cookbook/', config);
        setRecipeCount(recipesResponse.data.length);

        const journalResponse = await axios.get('http://127.0.0.1:8000/api/journal/journal-entries/', config);
        setJournalEntries(journalResponse.data);

        const mindfulnessResponse = await axios.get('http://127.0.0.1:8000/api/mindfulness/well-being-logs/', config);
        setMindfulnessLogs(mindfulnessResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for the combined Line Chart
  const dates = mindfulnessLogs.map(log => moment(log.date).format('YYYY-MM-DD'));
  const moodData = mindfulnessLogs.map(log => log.mood);
  const stressLevelData = mindfulnessLogs.map(log => log.stress_level);
  const sleepHoursData = mindfulnessLogs.map(log => log.sleep_hours);
  const anxietyLevelData = mindfulnessLogs.map(log => log.anxiety_level);
  const depressionLevelData = mindfulnessLogs.map(log => log.depression_level);

  const combinedLineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
      {
        label: 'Stress Level',
        data: stressLevelData,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: 'Sleep Hours',
        data: sleepHoursData,
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        label: 'Anxiety Level',
        data: anxietyLevelData,
        fill: false,
        backgroundColor: 'purple',
        borderColor: 'purple',
      },
      {
        label: 'Depression Level',
        data: depressionLevelData,
        fill: false,
        backgroundColor: 'yellow',
        borderColor: 'yellow',
      }
    ]
  };

  // Chart.js animation 
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
        labels: dates
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Data for the Journal Pie Chart
  const journalEntriesCount = journalEntries.length;
  const pieChartData = {
    labels: ['Logged', 'Remaining'],
    datasets: [
      {
        label: 'Journal Entries',
        data: [journalEntriesCount, 7 - journalEntriesCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Data for the Cookbook Gauge Chart
  const gaugeChartData = {
    labels: ['Recipes'],
    datasets: [
      {
        label: 'Recipes in Cookbook',
        data: [recipeCount, 20 - recipeCount], // out of 20
        backgroundColor: ['#FFCE56', '#E7E9ED'],
      },
    ],
  };

  return (
    <div className="home-container">
      {/* Background Video */}
      <div className="background-video">
        <video
          src=""
          autoPlay
          loop
          muted
          className="video"
        />
      </div>
      {/* Overlay */}
      <div className="overlay"></div>
      {/* Content */}
      <div className="content">
        <h2 className="user-title">
          Welcome, {userName}
        </h2>
        <div className="box-grid">
          <Box to="/recipe" title="Recipe" />
          <Box to="/cookbook" title="Cookbook" />
          <Box to="/diet" title="Diet" />
          <Box to="/mindfulness" title="Mindfulness" />
          <Box to="/journal" title="Journal" />
        </div>

        {/* User Dashboard */}
        {!loading && (
          <div className="dashboard">
            <h4 className="dashboard-title">
              Your Dashboard
            </h4>
            <div className="charts-container">
              <div className="dashboard-section">
                <h6>Cookbook Recipes</h6>
                <Doughnut data={gaugeChartData} />
              </div>
              <div className="dashboard-section">
                <h6>Weekly Journal Entries</h6>
                <Pie data={pieChartData} />
              </div>
            </div>
            <div className="dashboard-section large-chart">
              <h6>Mindfulness Metrics</h6>
              <Line data={combinedLineChartData} options={combinedLineChartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
