import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../redux'

const round = number => Math.round(number * 100) / 100

const loggerMiddleware = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

const monitorReducerEnhancer = createStore => (reducer, initialState, enhancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = round(end - start)
    console.log('reducer process time:', diff)
    return newState
  }
  return createStore(monitoredReducer, initialState, enhancer)
}

const configureStoreDev = initialState => {
  const middlewares = [
    loggerMiddleware,
    thunkMiddleware
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, initialState, composedEnhancers)
  if (module.hot)
    module.hot.accept('../redux', () => store.replaceReducer(rootReducer))
  return store
}

const configureStoreProd = initialState => {
  const middlewares = [
    thunkMiddleware
  ]
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)))
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
