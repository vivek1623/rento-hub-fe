import states from './states'
import { UPDATE_AUTH_STATE } from './actionTypes'

const authDetails = (state = states.authDetails, action) => {
  switch (action.type) {
    case UPDATE_AUTH_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state
  }
}

export default authDetails
