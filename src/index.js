import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import * as serviceWorker from "./serviceWorker"
import configureStore from "./data/store/configureStore"

import App from "./App"

import "./data/styles/index.scss"

export const store = configureStore({})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("rentohub-root")
)

serviceWorker.unregister()
