import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { logOut } from "../utilities";

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogOut = async () => {
    await logOut();
    setUser(null); // Update user state
    navigate('/login'); // Redirect to login page
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-stone-950 bg-opacity-20 h-20 fixed w-full top-0 left-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        <div className="flex items-center relative">
          {/* Drop Down Icon */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-stone-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* WS */}
          <div className="flex items-center ml-2">
            <h1 className='font-serif text-3xl mx-1 mt-3 text-white'>Wellness</h1>
            <h1 className='font-serif text-3xl mx-1 mt-3 text-white'>Synergy</h1>
          </div>

          {/* Left Icon */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } absolute left-0 top-full mt-2 w-48 origin-top-left rounded-md bg-stone-800 bg-opacity-60 py-1 shadow-lg z-50`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <Link
              to="/"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              to="/home"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              to="/recipe"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Recipes
            </Link>
            <Link
              to="/cookbook"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Cookbook
            </Link>
            <Link
              to="/diet"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Diet
            </Link>
            <Link
              to="/mindfulness"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Mindfulness
            </Link>
            <Link
              to="/journal"
              className="block px-4 py-2 text-base text-white font-serif"
              role="menuitem"
              onClick={handleLinkClick}
            >
              Journal
            </Link>
          </div>
        </div>

        {/* Right Icon */}
        <div className="relative flex items-center">
          <button
            type="button"
            className="relative flex rounded-full text-sm"
            id="user-menu-button"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            onClick={toggleUserMenu}
          >
            <span className="sr-only">Open user menu</span>
            <AccountBoxOutlinedIcon style={{ fontSize: 30, color: 'white' }} />
          </button>
          <div
            className={`absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-stone-800 bg-opacity-60 py-1 shadow-lg z-50 ${
              isUserMenuOpen ? 'block' : 'hidden'
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            <Link
              to="/login"
              className="block px-4 py-2 text-l text-white font-serif"
              role="menuitem"
              tabIndex="-1"
              onClick={handleLinkClick}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 text-l text-white font-serif"
              role="menuitem"
              tabIndex="-1"
              onClick={handleLinkClick}
            >
              Sign Up
            </Link>
            <Link
              onClick={async () => {
                await handleLogOut();
                handleLinkClick();
              }}
              to="/login"
              className="block px-4 py-2 text-l text-white font-serif"
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