import { combineReducers } from "redux"

import getInitialStates from "./initialStates"

import { RESET_REDUX_STATE } from "./auth/actionTypes"
import { clearAllDataFromLocalStorage } from "../config/utils"

import pageDetails from "./page/reducers"
import authDetails from "./auth/reducers"

const appReducer = combineReducers({
  pageDetails,
  authDetails,
})

const rootReducer = (state, action) => {
  if (action.type === RESET_REDUX_STATE) {
    clearAllDataFromLocalStorage()
    state = getInitialStates()
  }
  return appReducer(state, action)
}

export default rootReducer
