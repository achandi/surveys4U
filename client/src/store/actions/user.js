import axios from 'axios'
import * as actionTypes from './actionTypes'

const authStatus = (data) => {
  return { type: actionTypes.FETCH_USER, data }
}

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/current_user')
    console.log(res.data)
    dispatch(authStatus(res.data))
  } catch (err) {
    console.log(err)
  }
}

const stripeData = (data) => {
  console.log('stripe data', data)
  return { type: actionTypes.FETCH_USER, data }
}

export const handleStripeToken = (token) => async (dispatch) => {
  try {
    if (token) {
      const res = await axios.post('/api/stripe', token)
      dispatch(stripeData(res.data))
    }
  } catch (err) {
    console.log(err)
  }
}
