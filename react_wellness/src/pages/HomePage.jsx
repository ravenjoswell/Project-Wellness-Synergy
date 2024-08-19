import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Box from '../components/Box';
import '../App.css'; // Import your CSS file
import { Button, Typography } from '@mui/material';

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

        // user's name
        const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', config);
        setUserName(userResponse.data.full_name);

        // number of recipes in the user's cookbook
        const recipesResponse = await axios.get('http://127.0.0.1:8000/api/recipes/cookbook/', config);
        setRecipeCount(recipesResponse.data.length);

        // user's journal entries for the past week
        const journalResponse = await axios.get('http://127.0.0.1:8000/api/journal/journal-entries/', config);
        setJournalEntries(journalResponse.data);

        // user's mindfulness logs for the past week
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

  // data for the Line Charts
  const dates = mindfulnessLogs.map(log => new Date(log.date).toLocaleDateString());
  const moodData = mindfulnessLogs.map(log => log.mood);
  const stressLevelData = mindfulnessLogs.map(log => log.stress_level);
  const sleepHoursData = mindfulnessLogs.map(log => log.sleep_hours);
  const anxietyLevelData = mindfulnessLogs.map(log => log.anxiety_level);
  const depressionLevelData = mindfulnessLogs.map(log => log.depression_level);

  // Line chart 
  const lineChartOptions = (label, data, color) => ({
    labels: dates,
    datasets: [
      {
        label: label,
        data: data,
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
    ],
  });

  // Data Journal Entries Pie Chart
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

  // Data Cookbook Gauge Chart
  const gaugeChartData = {
    labels: ['Recipes'],
    datasets: [
      {
        label: 'Recipes in Cookbook',
        data: [recipeCount, 10 - recipeCount], // out of 20
        backgroundColor: ['#FFCE56', '#E7E9ED'],
      },
    ],
  };

  return (
    <div className="home-container">
      {/* Background Video */}
      <div className="background-video">
        <video
          src="your-video-url.mp4"
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
        <Typography variant="h2" className="title">
          Welcome, {userName}
        </Typography>
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
            <Typography variant="h4" className="dashboard-title">
              Your Dashboard
            </Typography>
            <div className="dashboard-section">
              <Typography variant="h6">Cookbook Recipes</Typography>
              <Doughnut data={gaugeChartData} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Weekly Journal Entries</Typography>
              <Pie data={pieChartData} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Mood</Typography>
              <Line data={lineChartOptions('Mood', moodData, 'blue')} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Stress Level</Typography>
              <Line data={lineChartOptions('Stress Level', stressLevelData, 'red')} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Sleep Hours</Typography>
              <Line data={lineChartOptions('Sleep Hours', sleepHoursData, 'green')} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Anxiety Level</Typography>
              <Line data={lineChartOptions('Anxiety Level', anxietyLevelData, 'purple')} />
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Depression Level</Typography>
              <Line data={lineChartOptions('Depression Level', depressionLevelData, 'yellow')} />
            </div>
            <div className="dashboard-navigation">
              <Button variant="contained" color="primary" href="/recipe">
                Go to Recipe Page
              </Button>
              <Button variant="contained" color="secondary" href="/diet">
                View Your Diet Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
