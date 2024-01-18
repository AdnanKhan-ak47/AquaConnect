import React, { useState, useEffect } from 'react'
import WaterRequestVerify from '../components/WaterRequestVerify'

function VerificationPage() {
  const [verificationId, setVerificationId] = useState('abcd1234')
  const [waterRequests, setWaterRequests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/request')
        const data = await response.json()
        setWaterRequests(data)
        console.log(waterRequests)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Verification Page</h1>
      <p>Verification id: {verificationId}</p>
      {/* need a similar table thing here */}
      {waterRequests.map((req) => (
        <WaterRequestVerify
          location={req.location}
          userCount={req.n_people}
          username={req.username}
          status={req.status}
          key={req.req_id}
        />
      ))}
    </div>
  )
}

export default VerificationPage
