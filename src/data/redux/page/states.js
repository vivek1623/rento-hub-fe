import moment from "moment"

const states = {
  pageDetails: {
    isMobile: window.innerWidth <= 480,
    currentPage: "",
    pageLoadingText: "",
    pageLoading: false,
    modalLoading: false,
    //------------------------ USERS ------------------------
    usersLoading: false,
    users: [],
    selectedUserLoading: false,
    selectedUser: {},
    selectedUserFilters: {
      startDate: moment(),
      endDate: moment().add(7, "days"),
    },
    //----------------------- VEHICLES -----------------------
    vehiclesLoading: false,
    vehicles: [],
    vehicleFilters: {
      // startDate: moment(),
      // endDate: moment().add(2, "days"),
    },
    selectedVehicleLoading: false,
    selectedVehicle: {},
    selectedVehicleFilters: {
      startDate: moment(),
      endDate: moment().add(7, "days"),
    },
    //----------------------- RESERVATION -----------------------
    myReservationsLoading: false,
    myReservations: [],
  },
}

export default states
