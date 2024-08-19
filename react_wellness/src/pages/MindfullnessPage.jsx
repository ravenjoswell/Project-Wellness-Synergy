import React, { useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MindfulnessPage = () => {
  const [stressLevel, setStressLevel] = useState(5);
  const [mood, setMood] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [depressionLevel, setDepressionLevel] = useState(5);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [guidedResponse, setGuidedResponse] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    return (
      stressLevel !== null &&
      mood !== null &&
      sleepHours !== null &&
      anxietyLevel !== null &&
      depressionLevel !== null &&
      additionalNotes !== ''
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Token ${token}`
      },
    };

    const data = {
      stress_level: stressLevel,
      mood: mood,
      sleep_hours: sleepHours,
      anxiety_level: anxietyLevel,
      depression_level: depressionLevel,
      additional_notes: additionalNotes,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/mindfulness/well-being-logs/', data, config);
      setGuidedResponse('');  // Clear any previous responses
      setIsDialogOpen(true);  // Open modal after submission

      // Clear form after submission
      setStressLevel(5);
      setMood(5);
      setSleepHours(7);
      setAnxietyLevel(5);
      setDepressionLevel(5);
      setAdditionalNotes('');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleGuidedSession = async (category) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Token ${token}`
      },
    };

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/mindfulness/guided-session/${category}/`, config);
      setGuidedResponse(response.data.session_content);  // Display response inside modal
    } catch (error) {
      console.error('Error fetching guided session:', error);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setGuidedResponse('');  // Clear response when closing the modal
  };

  return (
    <div className="mindfulness-container">
      <h1>Mindfulness Tracker</h1>
      <form onSubmit={handleSubmit} className="mindfulness-form">
        <div>
          <label>Stress Level:</label>
          <Slider
            value={stressLevel}
            onChange={(e, value) => setStressLevel(value)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Mood:</label>
          <Slider
            value={mood}
            onChange={(e, value) => setMood(value)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Sleep Hours:</label>
          <Slider
            value={sleepHours}
            onChange={(e, value) => setSleepHours(value)}
            min={0}
            max={12}
            step={0.5}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Anxiety Level:</label>
          <Slider
            value={anxietyLevel}
            onChange={(e, value) => setAnxietyLevel(value)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Depression Level:</label>
          <Slider
            value={depressionLevel}
            onChange={(e, value) => setDepressionLevel(value)}
            min={1}
            max={10}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </div>
        <div>
          <label>Additional Notes:</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>

      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Choose Your Guidance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the type of guidance you would like to receive.
          </DialogContentText>
          {guidedResponse && (
            <div className="guided-response">
              <h2>Guided Mindfulness Exercise</h2>
              <p>{guidedResponse}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleGuidedSession('sleep')} color="primary">Guidance for Sleep</Button>
          <Button onClick={() => handleGuidedSession('meditation')} color="primary">Guidance for Meditation</Button>
          <Button onClick={() => handleGuidedSession('move')} color="primary">Guidance for Move</Button>
          <Button onClick={closeDialog} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MindfulnessPage;
