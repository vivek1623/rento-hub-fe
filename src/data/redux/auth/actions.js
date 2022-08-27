import { message } from "antd"

import { RESET_REDUX_STATE, UPDATE_AUTH_STATE } from "./actionTypes"
import { LOCAL_STORAGE, METHOD_TYPES } from "../../config/constants"
import { setDataInLocalStorage } from "../../config/utils"
import { fetchDataAndProceed } from "../dataUtility"
import * as API from "./api"

export const resetReduxState = () => {
  return {
    type: RESET_REDUX_STATE,
  }
}

export const updateAuthState = (payload) => {
  return {
    type: UPDATE_AUTH_STATE,
    payload,
  }
}

export const loginUser = (data, callback) => (dispatch) => {
  dispatch(updateAuthState({ loading: true }))
  fetchDataAndProceed(
    {
      url: API.loginUser,
      method: METHOD_TYPES.POST,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data && res.data.user && res.data.token) {
        setDataInLocalStorage(LOCAL_STORAGE.RENTO_HUB_USER, res.data.user)
        setDataInLocalStorage(LOCAL_STORAGE.RENTO_HUB_TOKEN, res.data.token)
        dispatch(
          updateAuthState({
            loading: false,
            user: res.data.user,
            token: res.data.token,
          })
        )
        message.success(`Hey ${res.data.user.name}, Welcome to RentoHub`)
        if (callback) callback()
      } else {
        dispatch(updateAuthState({ loading: false }))
      }
    }
  )
}

export const signUpUser = (data, callback) => (dispatch) => {
  dispatch(updateAuthState({ loading: true }))
  fetchDataAndProceed(
    {
      url: API.signUpUser,
      method: METHOD_TYPES.POST,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data && res.data.user && res.data.token) {
        setDataInLocalStorage(LOCAL_STORAGE.RENTO_HUB_USER, res.data.user)
        setDataInLocalStorage(LOCAL_STORAGE.RENTO_HUB_TOKEN, res.data.token)
        dispatch(
          updateAuthState({
            loading: false,
            user: res.data.user,
            token: res.data.token,
          })
        )
        message.success(`Hey ${res.data.user.name}, Welcome to RentoHub`)
        if (callback) callback()
      } else {
        dispatch(updateAuthState({ loading: false }))
      }
    }
  )
}

export const signOutUser = () => ({
  type: RESET_REDUX_STATE,
})
