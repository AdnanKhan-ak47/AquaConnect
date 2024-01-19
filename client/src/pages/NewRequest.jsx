import React, { useEffect, useState } from 'react'
import '../styles/NewRequest.css'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

function NewRequest() {
  const [username, setUsername] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
    if (!user) {
      navigate('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Perform submit request logic here

    try {
      const location_response = await fetch(
        `https://geocode.maps.co/search?q=${district}&api_key=65a5b22dc9fad405466629dzc6a56a3`,
        {
          method: 'GET',
        },
      ).then((res) => res.json())

      // console.log(location_response[0].lat)

      const latitude = await location_response[0].lat
      const longitude = await location_response[0].lon

      const authtoken = JSON.parse(localStorage.getItem('user')).authtoken

      const data = {
        username: username,
        n_people: numberOfPeople,
        location: district,
        latitude: latitude,
        longitude: longitude,
        authtoken: authtoken,
      }

      const response = await fetch(`http://localhost:5000/api/request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then((res) => res.json())

      console.log(response)

      if (response.status == 'success') {
        toast.success('Your Request is Submiited !', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
        navigate('/')
      } else {
        toast.error(response.error, {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="form-container">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h1>Request Form</h1>
        <form onSubmit={handleSubmit} className="request-form">
          {/* <label className="form-label">
                    User ID:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="form-input"
                    />
                </label>
                <br /> */}
          <label className="form-label">
            Name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Number of People:
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Address Line 1:
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            district:
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Postal Code:
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </form>
      </div>
    </>
  )
}

export default NewRequest
