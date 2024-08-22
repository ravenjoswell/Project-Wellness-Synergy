import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from "../utilities";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    navigate('/login');
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Menu Button */}
          <button
            type="button"
            className="menu-toggle"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <div className="navbar-logo">
            <h1 className='font-serif text-3xl text-blue-600'>Wellness Synergy</h1>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`menu-dropdown ${isMenuOpen ? 'block' : 'hidden'}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <Link to="/" className="menu-link" role="menuitem" onClick={handleLinkClick}>About</Link>
            <Link to="/home" className="menu-link" role="menuitem" onClick={handleLinkClick}>Home</Link>
            <Link to="/recipe" className="menu-link" role="menuitem" onClick={handleLinkClick}>Recipes</Link>
            <Link to="/cookbook" className="menu-link" role="menuitem" onClick={handleLinkClick}>Cookbook</Link>
            <Link to="/diet" className="menu-link" role="menuitem" onClick={handleLinkClick}>Diet</Link>
            <Link to="/mindfulness" className="menu-link" role="menuitem" onClick={handleLinkClick}>Mindfulness</Link>
            <Link to="/journal" className="menu-link" role="menuitem" onClick={handleLinkClick}>Journal</Link>
          </div>
        </div>

        {/* User Icon and Menu */}
        <div className="navbar-right">
          <button
            type="button"
            className="user-toggle"
            id="user-menu-button"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            onClick={toggleUserMenu}
          >
            <span className="sr-only">Open user menu</span>
            <img 
              src="/nervous-system.gif" 
              alt="Account" 
              className="user-icon"
              style={{ width: '70px', height: '70px', borderRadius: '50%' }} 
            />
          </button>
          <div
            className={`user-dropdown ${isUserMenuOpen ? 'block' : 'hidden'}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            <Link to="/login" className="menu-link" role="menuitem" tabIndex="-1" onClick={handleLinkClick}>Log In</Link>
            <Link to="/signup" className="menu-link" role="menuitem" tabIndex="-1" onClick={handleLinkClick}>Sign Up</Link>
            <Link
              onClick={async () => {
                await handleLogOut();
                handleLinkClick();
              }}
              to="/login"
              className="menu-link"
              role="menuitem"
              tabIndex="-1"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
