import states from "./states"
import {
  UPDATE_PAGE_STATE,
  DELETE_PAGE_STATE,
  USER_DELETED,
  USER_UPDATED,
} from "./actionTypes"

const pageDetails = (state = states.pageDetails, action) => {
  switch (action.type) {
    case UPDATE_PAGE_STATE: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case DELETE_PAGE_STATE: {
      const index = state[action.key].findIndex(
        (item) => item.id === action.payload
      )
      if (index >= 0)
        return {
          ...state,
          [action.key]: [
            ...state[action.key].slice(0, index),
            ...state[action.key].slice(index + 1),
          ],
        }
      return state
    }

    case USER_UPDATED: {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      )
      if (index >= 0)
        return {
          ...state,
          users: [
            ...state.users.slice(0, index),
            { ...state.users[index], ...action.payload },
            ...state.users.slice(index + 1),
          ],
        }
      return state
    }

    case USER_DELETED: {
      const index = state.users.findIndex((user) => user._id === action.payload)
      if (index >= 0)
        return {
          ...state,
          users: [
            ...state.users.slice(0, index),
            ...state.users.slice(index + 1),
          ],
        }
      return state
    }

    default:
      return state
  }
}

export default pageDetails
