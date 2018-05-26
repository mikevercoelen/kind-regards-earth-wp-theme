import { combineReducers } from 'redux'

import {
  routerReducer as routing
} from 'react-router-redux'

import entities from './entities'
import app from './app'
import home from 'pages/Home/reducers'

export default combineReducers({
  routing,
  entities,
  app,
  home
})
