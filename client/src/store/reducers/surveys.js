import { FETCH_SURVEYS, SUBMIT_SURVEY } from '../actions/actionTypes'

const initialState = false
export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.data;
      default:
        return state;
  }
}
