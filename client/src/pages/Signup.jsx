import React, { useEffect, useState } from 'react'
import '../styles/Signup.css'
import RadioButton from '../components/RadioButton'
import { useNavigate } from 'react-router-dom'
import GoogleTranslateWidget from '../components/googletranslate.jsx'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Signup() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
    if (user) {
      navigate('/')
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState({ user: true, ngo: false })
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (password !== confirmPassword) {
        throw new Error('Confirm password does not match password')
      }

      const data = {
        email,
        password,
        role: role.ngo ? 'ngo' : 'user',
        phone,
        username: name,
        address: district,
      }

      let res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let response = await res.json()

      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setPhone('')
      setDistrict('')

      if (response.status === 'success') {
        toast.success('Your account is created Successfully !', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          navigate('/login')
        }, 2000)
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
        console.log(response)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    } else if (e.target.name == 'password') {
      setPassword(e.target.value)
    } else if (e.target.name == 'confirmPassword') {
      setConfirmPassword(e.target.value)
    } else if (e.target.name == 'user') {
      setRole({ ngo: false, user: true })
    } else if (e.target.name == 'ngo') {
      setRole({ ngo: true, user: false })
    } else if (e.target.name == 'name') {
      setName(e.target.value)
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    } else if (e.target.name == 'district') {
      setDistrict(e.target.value)
    }
  }

  return (
    <>
      <section className="loginPage">
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
        <div className="loginBox">
          <h2>Sign Up</h2>
          <GoogleTranslateWidget />
          <div className="radioBox">
            <span>Sign up as :</span>
            <RadioButton
              name="user"
              id="userRadio"
              value="user"
              onChange={handleChange}
              checked={role.user}
              text="user"
            />
            <RadioButton
              name="ngo"
              id="teahcerRadio"
              value="ngo"
              onChange={handleChange}
              checked={role.ngo}
              text="ngo"
            />
          </div>
          <form action="#" onSubmit={handleSubmit} className="loginForm">
            <div className="inputSection">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div className="inputSection">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="abc@eng.rizvi.edu.in"
                required=""
              />
            </div>
            <div className="inputSection">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required=""
              />
            </div>
            <div className="inputSection">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                required=""
              />
            </div>
            <div className="inputSection">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={handleChange}
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your 10 digits phone number"
                required=""
              />
            </div>
            <div className="inputSection">
              <label htmlFor="district">District</label>
              <input
                value={district}
                onChange={handleChange}
                type="text"
                name="district"
                id="district"
                placeholder="Enter your District"
                required=""
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="loginButton">
                Sign Up
              </button>
            </div>
            <p>
              Already have an account? <a href="/">Sign in</a>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup
