import pageStates from "./page/states"
import authStates from './auth/states'

const getInitialStates = () => {
  return {
    ...pageStates,
    ...authStates
  }
}

export default getInitialStates
