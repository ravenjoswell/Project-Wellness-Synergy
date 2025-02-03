import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../utilities'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navbar = ({ user, setUser }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  const handleLogOut = async () => {
    await logOut()
    setUser(null)
    navigate('/login')
  }

  const handleLinkClick = () => {
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Logo */}
          <div className="navbar-logo">
            <h1 className="font-serif text-3xl text-blue-600">Wellness Synergy</h1>
          </div>
          {/* Navbar Links */}
          <div className="navbar-links">
            <Link to="/" className="menu-link" onClick={handleLinkClick}>About</Link>
            <Link to="/home" className="menu-link" onClick={handleLinkClick}>Home</Link>
            <Link to="/recipe" className="menu-link" onClick={handleLinkClick}>Recipes</Link>
            <Link to="/cookbook" className="menu-link" onClick={handleLinkClick}>Cookbook</Link>
            <Link to="/diet" className="menu-link" onClick={handleLinkClick}>Diet</Link>
            <Link to="/mindfulness" className="menu-link" onClick={handleLinkClick}>Mindfulness</Link>
            <Link to="/journal" className="menu-link" onClick={handleLinkClick}>Journal</Link>
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
              src="/lotus.gif" 
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
                await handleLogOut()
                handleLinkClick()
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
  )
}

export default Navbar
