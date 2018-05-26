import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from 'reducers'

export default function configureStore () {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    sagaMiddleware
  ]

  const enhancers = []

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.sagaMiddleware = createSagaMiddleware
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
