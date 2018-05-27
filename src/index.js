import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import { Route, Switch } from 'react-router-dom'
import configureStore from 'utils/configureStore'
import makeRootSaga from 'sagas'
import { normalize } from 'normalizr'
import schemas from 'schemas'

import WebFont from 'webfontloader'
import 'sanitize.css'
import './index.scss'

import RouteScrollTop from 'components/RouteScrollTop/RouteScrollTop'
import BasicRoute from 'components/BasicRoute/BasicRoute'

import Home from 'pages/Home/Home'
import Post from 'pages/Post/Post'
import Page from 'pages/Page/Page'
import NotFound from 'pages/NotFound/NotFound'
import { setFontsLoaded, setPreloadData } from 'actions/app'
import { path } from 'utils/template'

const loadFonts = () => new Promise(resolve => {
  WebFont.load({
    classes: false,
    active: resolve,
    google: {
      families: [
        'Libre Baskerville:400,400i,700',
        'Lato:400,700,900',
        'Crimson Text:400,400i,700,700i'
      ]
    }
  })
})

const history = createHistory()
const store = configureStore()
store.runSaga(makeRootSaga())

export const rootElement = document.getElementById('root')

function renderApp () {
  const routes = (
    <RouteScrollTop>
      <Switch>
        <BasicRoute path={path} exact component={Home} />
        <BasicRoute path={`${path}pages/:paged`} component={Home} />
        <BasicRoute path={`${path}post/:slug`} component={Post} />
        <BasicRoute path={`${path}page/:slug`} component={Page} />
        <Route path='not-found' component={NotFound} />
        <Route path='*' component={NotFound} />
      </Switch>
    </RouteScrollTop>
  )

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>,
    rootElement
  )
}

function renderPreloadData () {
  const data = WPData.data
  const pages = data.filter(entry => entry.type === 'page')
  const posts = data.filter(entry => entry.type === 'post')

  const payload = {}

  if (pages) {
    payload.pages = normalize(pages, [schemas.page])
  }

  if (posts) {
    payload.posts = normalize(posts, [schemas.post])
  }

  store.dispatch(setPreloadData(payload))
}

document.addEventListener('DOMContentLoaded', () => {
  loadFonts().then(() => store.dispatch(setFontsLoaded(true)))
  renderApp()
  renderPreloadData()
})
