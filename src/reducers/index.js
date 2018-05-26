import { combineReducers } from 'redux'

import {
  routerReducer as routing
} from 'react-router-redux'

import app from './app'
import home from './home'
import posts from './posts'

const rootReducer = combineReducers({
  routing,
  app,
  home,
  posts
})

export default rootReducer
