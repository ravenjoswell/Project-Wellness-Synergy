import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '../components/Box';
import '../App.css'; // Import your CSS file
import { Button, Typography } from '@mui/material';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);
  const [journalEntriesCount, setJournalEntriesCount] = useState(0);
  const [mindfulnessLogsCount, setMindfulnessLogsCount] = useState(0);
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

        // Fetch the user's name
        const userResponse = await axios.get('http://127.0.0.1:8000/api/users/', config);
        setUserName(userResponse.data.full_name);

        // Fetch the number of recipes in the user's cookbook
        const recipesResponse = await axios.get('http://127.0.0.1:8000/api/recipes/cookbook/', config);
        setRecipeCount(recipesResponse.data.length);

        // Fetch the user's journal entries for the past week
        const journalResponse = await axios.get('http://127.0.0.1:8000/api/journal/journal-entries/', config);
        setJournalEntriesCount(journalResponse.data.length);

        // Fetch the user's mindfulness logs for the past week
        const mindfulnessResponse = await axios.get('http://127.0.0.1:8000/api/mindfulness/well-being-logs/', config);
        setMindfulnessLogsCount(mindfulnessResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <Typography>{recipeCount} recipes</Typography>
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Weekly Journal Entries</Typography>
              <Typography>{journalEntriesCount} entries this week</Typography>
            </div>
            <div className="dashboard-section">
              <Typography variant="h6">Mindfulness Logs</Typography>
              <Typography>{mindfulnessLogsCount} logs this week</Typography>
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
