import React from 'react'
import '../styles/UserDashboard.css'
import DashboardInfo from '../components/DashboardInfo'
import CreateRequest from '../components/CreateRequest'
import MyRequests from '../components/MyRequests'
import Feedback from '../components/Feedback'
import Navbar from '../components/Navbar'

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="user__dashboard">
        <h1>UserDashboard</h1>
        <CreateRequest />
        <MyRequests />
        <DashboardInfo />
        <Feedback />
      </div>
    </>
  )
}

export default UserDashboard
