/* eslint-disable no-useless-escape */
import { LOCAL_STORAGE } from "./constants"

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

export const uniqueId = () => {
  let time = new Date().getTime()
  return `${time}${s4()}${s4()}${s4()}`
}

export const log = (...arg) => {
  if (process.env.NODE_ENV !== "production") console.log(...arg)
}

export const reloadPage = () => {
  if (window.location) window.location.reload()
}

export const isEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export const clearAllDataFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.RENTO_HUB_USER)
  localStorage.removeItem(LOCAL_STORAGE.RENTO_HUB_TOKEN)
}

export const getDataFromLocalStorage = (key, undefined_return_value) => {
  const data = localStorage.getItem(key)
  return data && data !== undefined ? JSON.parse(data) : undefined_return_value
}

export const setDataInLocalStorage = (key, data) => {
  const json_data = JSON.stringify(data)
  localStorage.setItem(key, json_data)
}
