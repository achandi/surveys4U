import { FETCH_USER } from '../actions/actionTypes'

const initialState = null

export default (state = initialState, actions) => {
  console.log('Data', actions)
  switch (actions.type) {
    case FETCH_USER:
      console.log(actions.data)
      return actions.data || false
    default:
      return state;
  }
}
