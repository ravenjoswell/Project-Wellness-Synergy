import './App.css';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { confirmUser } from './utilities';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const authenticatedUser = await confirmUser();
      setUser(authenticatedUser);
    };

    checkUser();
  }, []);

  useEffect(() => {
    let nullUserUrls = ['/', '/login', '/signup'];
    let nullAllowed = nullUserUrls.includes(location.pathname);

    if (user && nullAllowed) {
      navigate('/home');
    } else if (!user && !nullAllowed) {
      navigate('/login');
    }
  }, [location.pathname, user, navigate]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
