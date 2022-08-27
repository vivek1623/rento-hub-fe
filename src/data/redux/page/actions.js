import { message } from "antd"
import { fetchDataAndProceed } from "../dataUtility"
import * as API from "./api"

import { METHOD_TYPES } from "../../config/constants"

import {
  UPDATE_PAGE_STATE,
  DELETE_PAGE_STATE,
  USER_DELETED,
  USER_UPDATED,
} from "./actionTypes"

export const updatePageState = (payload) => {
  return {
    type: UPDATE_PAGE_STATE,
    payload,
  }
}

//------------------------ USERS ------------------------

export const getAllUsers = (data) => (dispatch) => {
  dispatch(updatePageState({ usersLoading: true }))
  fetchDataAndProceed(
    {
      url: API.users,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data && res.data.users) {
        dispatch(
          updatePageState({ users: res.data.users, usersLoading: false })
        )
      } else {
        dispatch(updatePageState({ usersLoading: false }))
      }
    }
  )
}

export const updateUser = (data, callback) => (dispatch) => {
  const id = data._id
  delete data._id
  fetchDataAndProceed(
    {
      url: `${API.users}/${id}`,
      method: METHOD_TYPES.PATCH,
      data,
      modalLoader: true,
    },
    (err, res) => {
      if (!err && res && res.data?.user?._id) {
        dispatch({
          type: USER_UPDATED,
          payload: res.data.user,
        })
        if (res.data.message) message.success(res.data.message)
        if (callback) callback()
      }
    }
  )
}

export const deleteUser = (data) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: `${API.users}/${data.id}`,
      method: METHOD_TYPES.DELETE,
    },
    (err, res) => {
      if (!err && res && res.data?.user?._id) {
        dispatch({
          type: USER_DELETED,
          payload: res.data.user._id,
        })
        if (res.data.message) message.success(res.data.message)
      }
    }
  )
}

//----------------------- VEHICLES -----------------------

export const getAllVehicles = (data) => (dispatch) => {
  dispatch(updatePageState({ vehiclesLoading: true }))
  fetchDataAndProceed(
    {
      url: API.vehicles,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data && res.data.vehicles) {
        dispatch(
          updatePageState({
            vehicles: res.data.vehicles,
            vehiclesLoading: false,
          })
        )
      } else {
        dispatch(updatePageState({ vehiclesLoading: false }))
      }
    }
  )
}

export const getAvailableVehicles = (data) => (dispatch) => {
  dispatch(updatePageState({ vehiclesLoading: true }))
  fetchDataAndProceed(
    {
      url: API.availableVehicles,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data && res.data.vehicles) {
        dispatch(
          updatePageState({
            vehicles: res.data.vehicles,
            vehiclesLoading: false,
          })
        )
      } else {
        dispatch(updatePageState({ vehiclesLoading: false }))
      }
    }
  )
}

export const addVehicle = (data, callback) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: API.vehicles,
      method: METHOD_TYPES.POST,
      data,
      modalLoader: true,
    },
    (err, res) => {
      if (!err && res && res.data?.vehicle) {
        if (res.data.message) message.success(res.data.message)
        if (callback) callback()
      }
    }
  )
}

export const updateVehicle = (data, callback) => (dispatch) => {
  const id = data.id
  delete data.id
  fetchDataAndProceed(
    {
      url: `${API.vehicles}/${id}`,
      method: METHOD_TYPES.PATCH,
      data,
      modalLoader: true,
    },
    (err, res) => {
      if (!err && res && res.data?.vehicle?.id) {
        if (res.data.message) message.success(res.data.message)
        if (callback) callback()
      }
    }
  )
}

export const deleteVehicle = (id) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: `${API.vehicles}/${id}`,
      method: METHOD_TYPES.DELETE,
      loaderText: "Deleting",
    },
    (err, res) => {
      if (!err && res && res.data?.vehicle?.id) {
        dispatch({
          type: DELETE_PAGE_STATE,
          payload: res.data.vehicle.id,
          key: "vehicles",
        })
        if (res.data.message) message.success(res.data.message)
      }
    }
  )
}

//----------------------- REVIEW -----------------------

export const addReview = (data, callback) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: API.reviews,
      method: METHOD_TYPES.POST,
      data,
      modalLoader: true,
    },
    (err, res) => {
      if (!err && res && res.data?.review) {
        if (res.data.message) message.success(res.data.message)
        if (callback) callback()
      }
    }
  )
}

//----------------------- RESERVATION -----------------------

export const addReservation = (data, callback) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: API.reservations,
      method: METHOD_TYPES.POST,
      data,
      modalLoader: true,
    },
    (err, res) => {
      if (!err && res && res.data?.reservation) {
        if (res.data.message) message.success(res.data.message)
        if (callback) callback()
      }
    }
  )
}

export const deleteReservation = (id) => (dispatch) => {
  fetchDataAndProceed(
    {
      url: `${API.reservations}/${id}`,
      method: METHOD_TYPES.DELETE,
      loaderText: "Canceling",
    },
    (err, res) => {
      if (!err && res && res.data?.reservation?.id) {
        dispatch({
          type: DELETE_PAGE_STATE,
          payload: res.data.reservation.id,
          key: "myReservations",
        })
        if (res.data.message) message.success("reservation cancelled")
      }
    }
  )
}

export const getMyReservations = (errorCallback) => (dispatch) => {
  dispatch(updatePageState({ myReservationsLoading: true }))
  fetchDataAndProceed(
    {
      url: API.myReservations,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data?.reservations) {
        dispatch(
          updatePageState({
            myReservations: res.data.reservations,
            myReservationsLoading: false,
          })
        )
        if (res.data.message) message.success(res.data.message)
      } else {
        dispatch(updatePageState({ myReservationsLoading: false }))
        if (errorCallback) errorCallback()
      }
    }
  )
}

export const getUserReservations = (data, errorCallback) => (dispatch) => {
  dispatch(updatePageState({ selectedUserLoading: true }))
  fetchDataAndProceed(
    {
      url: API.userReservations,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data?.userDetails) {
        dispatch(
          updatePageState({
            selectedUser: res.data.userDetails,
            selectedUserLoading: false,
          })
        )
        if (res.data.message) message.success(res.data.message)
      } else {
        dispatch(updatePageState({ selectedUserLoading: false }))
        if (errorCallback) errorCallback()
      }
    }
  )
}

export const getVehicleReservations = (data, errorCallback) => (dispatch) => {
  dispatch(updatePageState({ selectedVehicleLoading: true }))
  fetchDataAndProceed(
    {
      url: API.vehicleReservations,
      data,
      loader: false,
    },
    (err, res) => {
      if (!err && res && res.data?.vehicleDetails) {
        dispatch(
          updatePageState({
            selectedVehicle: res.data.vehicleDetails,
            selectedVehicleLoading: false,
          })
        )
        if (res.data.message) message.success(res.data.message)
      } else {
        dispatch(updatePageState({ selectedVehicleLoading: false }))
        if (errorCallback) errorCallback()
      }
    }
  )
}

export const getVehicleReservedDates = (data, callback) => (dispatch) => {
  console.log("data", data)
  fetchDataAndProceed(
    {
      url: API.vehicleReservedDates,
      data,
    },
    (err, res) => {
      if (!err && res && res.data?.reservedDates && callback) {
        callback(res.data.reservedDates)
      } else if (callback) callback([]) //this callback is for demo perpuse. it should not be in actual applications
    }
  )
}
