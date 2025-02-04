import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../utilities'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navbar = ({ user, setUser }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleLogOut = async () => {
    await logOut()
    setUser(null)
    navigate('/login')
  }

  const handleLinkClick = () => {
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-[#204777] fixed top-0 left-0 w-full z-50 border-b border-[#ffffffdd]">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center h-[10vh]">
        <div className="flex items-center">
          <button
            className="lg:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <h1 className=" font-serif text-4xl text-white mr-5">Wellness Synergy</h1>
        </div>
        <div className="hidden lg:flex space-x-8 font-serif text-lg text-white">
          <Link to="/" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>About</Link>
          <Link to="/home" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Home</Link>
          <Link to="/recipe" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Recipes</Link>
          <Link to="/cookbook" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Cookbook</Link>
          <Link to="/diet" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Diet</Link>
          <Link to="/mindfulness" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Mindfulness</Link>
          <Link to="/journal" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Journal</Link>
        </div>
        <div className="relative">
          <button
            type="button"
            className="user-toggle p-2"
            id="user-menu-button"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            onClick={toggleUserMenu}
          >
            <img 
              src="/lotus.gif" 
              alt="Account" 
              className="user-icon w-16 h-16 rounded-full ml-5" 
            />
          </button>
          <div
            className={`user-dropdown absolute right-0 top-full mt-2 w-48 bg-white bg-opacity-60 shadow-lg rounded-lg z-50 ${isUserMenuOpen ? 'block' : 'hidden'}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <Link to="/login" className="menu-link block px-4 py-2 text-lg text-black" onClick={handleLinkClick}>Log In</Link>
            <Link to="/signup" className="menu-link block px-4 py-2 text-lg text-black" onClick={handleLinkClick}>Sign Up</Link>
            <Link
              onClick={async () => { await handleLogOut(); handleLinkClick() }}
              to="/login"
              className="menu-link block px-4 py-2 text-lg text-black"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#204777] text-white p-4 space-y-4`}>
        <Link to="/" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>About</Link>
        <Link to="/home" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Home</Link>
        <Link to="/recipe" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Recipes</Link>
        <Link to="/cookbook" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Cookbook</Link>
        <Link to="/diet" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Diet</Link>
        <Link to="/mindfulness" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Mindfulness</Link>
        <Link to="/journal" className="hover:bg-[#658bb92b] p-3 rounded-xl" onClick={handleLinkClick}>Journal</Link>
      </div>
    </nav>
  )
}

export default Navbar
