import { useState, useEffect } from 'react';
import axios from 'axios';

const JournalPage = () => {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
                setError('Failed to fetch journal entries');
            }
        };
        getEntries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = {
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
        } catch (err) {
            console.error(err);
            setError('Failed to save journal entry');
        } finally {
            setLoading(false);
        }
    };

    const handleEntrySelect = (e) => {
        const selectedId = e.target.value;
        const selected = entries.find(entry => entry.id === parseInt(selectedId));
        setSelectedEntry(selected);
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
        } catch (err) {
            console.error(err);
            setError('Failed to delete journal entry');
        }
    };

    return (
        <div className="journal-page">
            <h1>Your Journal</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Write your journal entry..."
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Mood (1-10)"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    required
                />
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
                <textarea
                    placeholder="Highlights"
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                />
                <textarea
                    placeholder="Challenges"
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                />
                <textarea
                    placeholder="Goals for Tomorrow"
                    value={goalsForTomorrow}
                    onChange={(e) => setGoalsForTomorrow(e.target.value)}
                />
                <textarea
                    placeholder="Goals Reflection"
                    value={goalsReflection}
                    onChange={(e) => setGoalsReflection(e.target.value)}
                />
                <textarea
                    placeholder="Mindfulness Practice"
                    value={mindfulnessPractice}
                    onChange={(e) => setMindfulnessPractice(e.target.value)}
                />
                <textarea
                    placeholder="Self-Care Activities"
                    value={selfCareActivities}
                    onChange={(e) => setSelfCareActivities(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Entry'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {aiResponse && (
                <div className="ai-response">
                    <h3>AI Response:</h3>
                    <p>{aiResponse}</p>
                </div>
            )}
            <div className="entries">
                <h2>Previous Entries</h2>
                <select onChange={handleEntrySelect} value={selectedEntry ? selectedEntry.id : ''}>
                    <option value="">Select an entry...</option>
                    {entries.map((entry) => (
                        <option key={entry.id} value={entry.id}>
                            {entry.date}
                        </option>
                    ))}
                </select>
                {selectedEntry && (
                    <div className="entry-details">
                        <p><strong>Date:</strong> {selectedEntry.date}</p>
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
                        <button onClick={handleDeleteEntry} className="delete-button">Delete Entry</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalPage;
