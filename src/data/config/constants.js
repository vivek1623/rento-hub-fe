export const ROUTE_PATH = {
  AUTH: "/auth",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  HOME: "/",
  EDIT_VEHICLE: "/vehicle/:id",
  USERS: "/users",
  EDIT_USER: "/users/:id",
  MY_RESERVATION:"/my-reservation"
}

export const APP_PAGE = {
  HOME: "Home",
  EDIT_VEHICLE: "Edit Vehicle",
  USERS: "Users",
  EDIT_USER: "Edit User",
  MY_RESERVATION:"My Reservations"
}
export const LOCAL_STORAGE = {
  RENTO_HUB_USER: "rentoHubUser",
  RENTO_HUB_TOKEN: "rentoHubtoken",
}

export const APP_LAYOUT = {
  APP_HEADER_HEIGHT: 64,
}

export const METHOD_TYPES = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
  PATCH: "PATCH",
}

export const ROLE = {
  USER: "user",
  MANAGAER: "manager",
}

export const ROLES = [
  { label: "User", value: ROLE.USER },
  { label: "Manager", value: ROLE.MANAGAER },
]

export const MODELS = [
  { label: "Yamaha", value: "yamaha" },
  { label: "Royal Enfield", value: "royalEnfield" },
  { label: "Bajaj", value: "bajaj" },
  { label: "Honda", value: "honda" },
  { label: "Ducati", value: "ducati" },
  { label: "BMW", value: "bmw" },
]

export const COLORS = [
  { label: "Red", value: "red" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Grey", value: "grey" },
  { label: "Blue", value: "blue" },
]

export const LOCATIONS = [
  { label: "Delhi", value: "delhi" },
  { label: "Dehradun", value: "dehradun" },
  { label: "Haridwar", value: "haridwar" },
  { label: "Rishikesh", value: "rishikesh" },
  { label: "Kedarnath", value: "kedarnath" },
  { label: "Mussoorie", value: "mussoorie" },
]

export const RATINGS = [
  { label: "Low Rated", value: "low" },
  { label: "Mid Rated", value: "mid" },
  { label: "High Rated", value: "high" },

]
