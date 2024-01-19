import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import UserDashboard from './UserDashboard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const [role, setRole] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (!user) {
      navigate('/login')
    } else {
      setRole(user.role)
    }
  }, [])
  return (
    <>
      {role === 'ngo' ? <Dashboard /> : <UserDashboard />}
    </>
  )
}

export default Home
