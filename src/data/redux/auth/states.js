import { getDataFromLocalStorage } from "../../config/utils"
import { LOCAL_STORAGE } from "../../config/constants"

const states = {
  authDetails: {
    user: getDataFromLocalStorage(LOCAL_STORAGE.RENTO_HUB_USER, null),
    token: getDataFromLocalStorage(LOCAL_STORAGE.RENTO_HUB_TOKEN, null),
    loading: false,
  },
}

export default states
