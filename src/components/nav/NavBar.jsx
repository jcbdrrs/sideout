// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
      navigate('/login')
    
  }

  return (
      <div className="navbar-container">
      <Nav pills>
        <NavItem className="navbar-logo">
          <NavLink
            href="http://localhost:5173/games"
          >
            <img src='src/assets/sideout! logo.png' alt='Logo' className='logo-img'/>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="http://localhost:5173/create-game"
          >
            CREATE GAME
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="http://localhost:5173/profile"
          >
          </NavLink>
        </NavItem>
        <div></div>
        <NavItem>
          <NavLink
            href="http://localhost:5173/profile"
          >
            PROFILE
          </NavLink>
        </NavItem>
        <NavItem>
          <button onClick={handleLogout} className="logout-button">LOGOUT</button>
        </NavItem>
      </Nav>
    </div>
  )
}

export default NavBar
