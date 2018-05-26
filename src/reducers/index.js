import { combineReducers } from 'redux'

import {
  routerReducer as routing
} from 'react-router-redux'

import entities from './entities'
import app from './app'
import home from 'pages/Home/reducers'
import post from 'pages/Post/reducers'

export const makeRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    routing,
    entities,
    app,
    home,
    post,

    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return
  }

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
