import React, { useEffect, useState } from 'react'
import WaterRequest from '../components/WaterRequest'
import Navbar from '../components/Navbar'

function Dashboard() {
  const [waterRequests, setWaterRequests] = useState([])

  const handleLogOut = () => {
    localStorage.removeItem('user') // remove user from local storage
  }

  const getWaterRequests = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/request/getverifiedrequest',
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken: localStorage.getItem('user') }),
        },
      )
      const jsonData = await response.json()
      setWaterRequests(jsonData)
      console.log(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getWaterRequests()
  }, [])


  const handleVerify = async (req_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/request/updatestatus/${req_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ next: true }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  const handleCampaignDone = async (req_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/request/updatestatus/${req_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: true }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="Dashboard">
        <h1>Dashboard</h1>

        {/* <p>
        ngo id: {ngo_id}
      </p>

      <p>ngo name: {ngo_name}</p> */}


      <h1>water requests</h1>

      <div className=''>
        {waterRequests.map((waterRequest) => {

          return (
            <WaterRequest
              key={waterRequest.req_id}
              location={waterRequest.location}
              userCount={waterRequest.n_people}
              username={waterRequest.username}
              status={waterRequest.status}
              campaign={waterRequest.campaign}
              onclick={handleCampaignDone(waterRequest.req_id)}
              onverify={handleVerify(waterRequest.req_id)}
            />
          )
        })}
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='held'
          onclick={handleClick}
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='left'
          onclick={handleClick}
        />
        <WaterRequest
          location='1234 Main St'
          userCount='5'
          userName='John Doe'
          status='Pending'
          campaign='held'
          onclick={handleClick}
        />
        </div>
      </div>
    </>
  )
}

export default Dashboard
