// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const localUser = localStorage.getItem("loggedInUser");
  const parsedUser = JSON.parse(localUser);
  
  const profileLink = `http://localhost:5173/profile/${parsedUser.id}`
  
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
      navigate('/login')
    
  }

  return (
    <div className="navbar-container">
      <Nav pills>
        <NavItem className="navbar-logo">
          <NavLink href="http://localhost:5173/games">
            <img src='src/assets/sideout! logo.png' alt='Logo' className='logo-img'/>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="http://localhost:5173/create-game">
            <strong>CREATE GAME</strong>
          </NavLink>
        </NavItem>
        <div></div>
        <NavItem>
          <Link to={profileLink} className="nav-link">
          <strong>PROFILE</strong>
          </Link>
        </NavItem>
        <NavItem>
          <button onClick={handleLogout} className="logout-button"><strong>LOGOUT</strong></button>
        </NavItem>
      </Nav>
    </div>
  )
}

export default NavBar