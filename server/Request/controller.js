import db from '../db/db.js'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "5f4b50a65065027be65580a99edcfdafcf432098e88b4bed93073db34bcb18d5"


const router = Router()

export const getAllRequests = async (req, res) => {
  try {
    const requests = await db('requests').select('*')
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
    console.error('Login error:', error)
  }
}

export const getRequestById = async (req, res) => {
  const { id } = req.params
  try {
    const requests = await db('requests').where({ req_id: id }).first()
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
    console.error('Login error:', error)
  }
}

export const getRequestforUser = async (req, res) => {
  const { authtoken } = req.body

  const token = jwt.verify(authtoken, JWT_SECRET)
  const user_id = token.user.user_id

  try {
    const requests = await db('requests').where({ user_id: user_id })
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
    console.error('Login error:', error)
  }
}

export const createRequests = async (req, res) => {
  const { username, n_people, location, latitude, longitude, authtoken } = req.body

  const token = jwt.verify(authtoken, JWT_SECRET)
  const user_id = token.user.user_id

  try {
    const requests = await db('requests')
      .insert({ username: username, n_people: n_people, longitude: longitude, latitude: latitude, location: location, user_id: user_id })
      .returning('*')
    console.log(requests)
    res.status(201).json({ status: 'success' })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const updateRequest = async (req, res) => {
  const { id } = req.params
  const { username, n_people } = req.body
  try {
    const requests = await db('requests')
      .where({ req_id: id })
      .update({ username: username, n_people })
      .returning('*')
    console.log(requests)
    res.status(201).json(requests)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const deleteRequest = async (req, res) => {
  const { id } = req.params
  try {
    const requests = await db('requests').where({ req_id: id }).del()
    console.log(requests)
    res.status(201).json(requests)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params
  const { next } = req.body
  try {
    const statuses = [
      'rejected',
      'pending',
      'verified',
      'in_process',
      'resolved',
    ]
    // const status = await db('requests').select('status').where({ req_id: id })
    let query = await db('requests').select('status').whereRaw("req_id::text = ?", [id]);

    let status = query[0].status

    let index = statuses.indexOf(status)

    if (index == 4) {
      throw new Error('Status array overflowed')
    }
    // if not already rejected and
    // if you want to update to next step
    if (status != 'rejected' && next == true) {
      status = statuses[index + 1]
    } else {
      // else reject
      status = statuses[0]
    }

    const requests = await db('requests')
      .where({ req_id: id })
      .update({ status: status })
      .returning('*')
    console.log(requests)
    res.status(201).json(requests)
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const getVerifiedRequest = async (req, res) => {
  const { authtoken } = req.body
  const token = jwt.verify(authtoken, JWT_SECRET)

  const ngo_id = token.user.ngo_id
  try {
    const requests = await db('requests').where({ ngo_id: ngo_id, status: 'verified' })
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.error('Server error:', error);
  }
}

export const AssignNgo = async (req, res) => {
  const { ngo_id, req_id } = req.body
  console.log("ngo_id", ngo_id)
  console.log("req_id", req_id)
  console.log("bitch")
  try {

    const requests = await db('requests')
      .where({ req_id: req_id })
      .insert({ ngo_id: ngo_id })
      .returning('*')

    console.log(requests)
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
    console.error('Server error:', error);
  }
}
