import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Typography, Box } from '@mui/material';
import '../App.css';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [entryDate, setEntryDate] = useState(''); 
  const [entryText, setEntryText] = useState('');
  const [mood, setMood] = useState(5);
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');
  const [highlights, setHighlights] = useState('');
  const [challenges, setChallenges] = useState('');
  const [goalsForTomorrow, setGoalsForTomorrow] = useState('');
  const [goalsReflection, setGoalsReflection] = useState('');
  const [mindfulnessPractice, setMindfulnessPractice] = useState('');
  const [selfCareActivities, setSelfCareActivities] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/journal/journal-entries/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setEntries(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      entry_date: entryDate, 
      entry_text: entryText,
      mood,
      gratitude_1: gratitude1,
      gratitude_2: gratitude2,
      gratitude_3: gratitude3,
      highlights,
      challenges,
      goals_for_tomorrow: goalsForTomorrow,
      goals_reflection: goalsReflection,
      mindfulness_practice: mindfulnessPractice,
      self_care_activities: selfCareActivities
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/journal/journal-entries/', data, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setAiResponse(response.data.ai_response);
      setEntries([...entries, response.data.entry]);
      resetForm(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEntryDate('');
    setEntryText('');
    setMood(5);
    setGratitude1('');
    setGratitude2('');
    setGratitude3('');
    setHighlights('');
    setChallenges('');
    setGoalsForTomorrow('');
    setGoalsReflection('');
    setMindfulnessPractice('');
    setSelfCareActivities('');
    setCurrentStep(1);
  };

  const handleEntrySelect = (e) => {
    const selectedId = e.target.value;
    const selected = entries.find(entry => entry.id === parseInt(selectedId));
    // console.log('Selected Entry:', selected);
    setSelectedEntry(selected);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = async () => {
    if (!selectedEntry) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/journal/journal-entries/${selectedEntry.id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      setEntries(entries.filter(entry => entry.id !== selectedEntry.id));
      setSelectedEntry(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What date is this entry for?</Typography>
            </div>
            <input
              type="date"
              placeholder="Select Date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">Write about your day.</Typography>
            </div>
            <textarea
              placeholder="Write your journal entry..."
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">How was your mood today?</Typography>
            </div>
            <input
              type="number"
              placeholder="Mood (1-10)"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            />
          </>
        );
      case 4:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What are you grateful for today?</Typography>
            </div>
            <input
              type="text"
              placeholder="Gratitude 1"
              value={gratitude1}
              onChange={(e) => setGratitude1(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Gratitude 2"
              value={gratitude2}
              onChange={(e) => setGratitude2(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gratitude 3"
              value={gratitude3}
              onChange={(e) => setGratitude3(e.target.value)}
            />
          </>
        );
      case 5:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What were the highlights of your day?</Typography>
            </div>
            <textarea
              placeholder="Highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
            />
          </>
        );
      case 6:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What challenges did you face today?</Typography>
            </div>
            <textarea
              placeholder="Challenges"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            />
          </>
        );
      case 7:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What are your goals for tomorrow?</Typography>
            </div>
            <textarea
              placeholder="Goals for Tomorrow"
              value={goalsForTomorrow}
              onChange={(e) => setGoalsForTomorrow(e.target.value)}
            />
          </>
        );
      case 8:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">Reflect on your goals for today.</Typography>
            </div>
            <textarea
              placeholder="Goals Reflection"
              value={goalsReflection}
              onChange={(e) => setGoalsReflection(e.target.value)}
            />
          </>
        );
      case 9:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">Describe your mindfulness practice today.</Typography>
            </div>
            <textarea
              placeholder="Mindfulness Practice"
              value={mindfulnessPractice}
              onChange={(e) => setMindfulnessPractice(e.target.value)}
            />
          </>
        );
      case 10:
        return (
          <>
            <div className="question-container">
              <Typography variant="h6" className="typing-effect">What self-care activities did you do today?</Typography>
            </div>
            <textarea
              placeholder="Self-Care Activities"
              value={selfCareActivities}
              onChange={(e) => setSelfCareActivities(e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="journal-page-wrapper">
      <div className="journal-page-container">
        {/* Video Containers */}
        <div className="j-video-container j-second-video-container">
          <video src="./journalbg2.mp4" autoPlay loop muted />
        </div>
        <div className="j-video-container j-third-video-container">
          <video src="./journalbg2.mp4" autoPlay loop muted />
        </div>
        <div className="j-video-container j-fourth-video-container">
          <video src="./journalbg2.mp4" autoPlay loop muted />
        </div>

        <div className="journal-page">
          <h1>Reflect and Record</h1>
          <form onSubmit={handleSubmit}>
            <div className="step-container">
              {renderStep()}
            </div>
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep >= 10}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
            {currentStep >= 10 && (
              <Button type="submit" disabled={loading} variant="contained" color="secondary">
                {loading ? 'Saving...' : 'Save Entry'}
              </Button>
            )}
          </form>
          {aiResponse && (
            <div className="ai-response">
              <h3>Wellness Partner:</h3>
              <p>{aiResponse}</p>
            </div>
          )}
          <div className="entries">
            <h2>Previous Reflections</h2>
            <select onChange={handleEntrySelect} value={selectedEntry ? selectedEntry.id : ''}>
              <option value="">Select an entry...</option>
              {entries.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.date}
                </option>
              ))}
            </select>
            {selectedEntry && (
              <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="entry-details-title"
              >
                <Box sx={{ p: 4, backgroundColor: 'white', opacity: 0.9, borderRadius: 2 }}>
                  <Typography id="entry-details-title" variant="h6" component="h2">
                    Entry Details
                  </Typography>
                  <div className="entry-details">
                    <p><strong>Date:</strong> {selectedEntry.entry_date}</p>
                    <p><strong>Entry:</strong> {selectedEntry.entry_text}</p>
                    <p><strong>Mood:</strong> {selectedEntry.mood}</p>
                    <p><strong>Gratitude 1:</strong> {selectedEntry.gratitude_1}</p>
                    <p><strong>Gratitude 2:</strong> {selectedEntry.gratitude_2}</p>
                    <p><strong>Gratitude 3:</strong> {selectedEntry.gratitude_3}</p>
                    <p><strong>Highlights:</strong> {selectedEntry.highlights}</p>
                    <p><strong>Challenges:</strong> {selectedEntry.challenges}</p>
                    <p><strong>Goals for Tomorrow:</strong> {selectedEntry.goals_for_tomorrow}</p>
                    <p><strong>Goals Reflection:</strong> {selectedEntry.goals_reflection}</p>
                    <p><strong>Mindfulness Practice:</strong> {selectedEntry.mindfulness_practice}</p>
                    <p><strong>Self-Care Activities:</strong> {selectedEntry.self_care_activities}</p>
                    <Button onClick={handleDeleteEntry} variant="contained" color="error">
                      Delete Entry
                    </Button>
                  </div>
                </Box>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
