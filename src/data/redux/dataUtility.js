import axios from "axios"
import { message } from "antd"

import { store } from "../../index"

import { updatePageState } from "../redux/page/actions"
import { resetReduxState } from "../redux/auth/actions"

import { LOCAL_STORAGE, METHOD_TYPES } from "../config/constants"
import { BASE_URL } from "../config/urls"
import { getDataFromLocalStorage, log } from "../config/utils"

const getHeaders = (contentType) => {
  const token = getDataFromLocalStorage(LOCAL_STORAGE.RENTO_HUB_TOKEN, null)
  let headers = { "Content-Type": contentType }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export const fetchDataAndProceed = (
  {
    url,
    method = METHOD_TYPES.GET,
    data = {},
    timeout = 20000,
    modalLoader = false,
    loader = true,
    loaderText = "Loading",
    contentType = "application/json",
    axios_args = {},
  } = {},
  callback
) => {
  if (modalLoader) store.dispatch(updatePageState({ modalLoading: true }))
  else if (loader)
    store.dispatch(
      updatePageState({ pageLoading: true, pageLoadingText: loaderText })
    )
  axios({
    url,
    baseURL: BASE_URL,
    method,
    timeout,
    params: method === METHOD_TYPES.GET ? data : {},
    data: method !== METHOD_TYPES.GET ? data : {},
    headers: getHeaders(contentType),
    validateStatus: (status) =>
      (status >= 200 && status < 300) || status === 412,
    ...axios_args,
  })
    .then((response) => {
      log("RESPONSE: ", response)
      callback(false, response.data)
      if (modalLoader) store.dispatch(updatePageState({ modalLoading: false }))
      else if (loader)
        store.dispatch(
          updatePageState({ pageLoading: false, pageLoadingText: "" })
        )
    })
    .catch((error) => {
      log("ERROR: ", error.response)
      callback(true)
      if (modalLoader) store.dispatch(updatePageState({ modalLoading: false }))
      else if (loader)
        store.dispatch(
          updatePageState({ pageLoading: false, pageLoadingText: "" })
        )
      if (error && error.response) {
        if (error.response.status === 401) store.dispatch(resetReduxState())
        message.error(
          error.response.data?.message
            ? error.response.data?.message
            : "Something went wrong"
        )
      }
    })
}
