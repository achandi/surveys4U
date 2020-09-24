import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './actionTypes'

const updateUserBalance = ({ data }) => {
  return { type: FETCH_USER, data }
}


export const surveyPost = (values, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/surveys', values)
    history.push('/surveys')
    dispatch(updateUserBalance(res))
  } catch (err) {
    console.log(err)
  }
}

const updateSurveyList = ({data}) => {
    return { type: FETCH_SURVEYS, data}
}


export const fetchSurveys = () => async dispatch => {
  try {
  const res = await axios.get('/api/surveys');
  dispatch(updateSurveyList(res))
  } catch (err) {
    console.log(err);
  }
}