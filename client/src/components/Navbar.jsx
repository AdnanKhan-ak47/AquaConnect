import React, { useEffect } from 'react'
import './styles/Navbar.css'
import GoogleTranslateWidget from './googletranslate'

const Navbar = () => {
  const handleClick = () => {
    localStorage.removeItem('user')
    // get user id and delete user from db
    // let user = await fetch(`https://localhost:5000/api/user/${userID}`)
    window.location.reload()
  }
  return (
    <nav>
      <h2>AquaConnect</h2>
      <div className="right">
        <p>In case of Emergency contact: 011-24362705</p>
        <GoogleTranslateWidget />
        <button className="logout-btn" onClick={handleClick}>
          Log Out
        </button>
      </div>
    </nav>
  )
}

export default Navbar
