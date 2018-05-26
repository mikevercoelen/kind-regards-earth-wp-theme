import { fork, all } from 'redux-saga/effects'
import _ from 'lodash'

import posts from './posts'

export default function makeRootSaga (asyncSagas = {}, skipGlobal = false) {
  return function * rootSaga () {
    const globalSagas = [
      fork(posts)
    ]

    const sagas = Object.values(asyncSagas)

    if (!skipGlobal) {
      sagas.push(...globalSagas)
    }

    yield all(sagas)
  }
}

export const injectSaga = (store, ...sagas) => {
  const newSagas = sagas.reduce((asyncSagas, { key, saga }) => {
    if (Object.hasOwnProperty.call(store.asyncSagas, key)) { return asyncSagas }

    store.asyncSagas[key] = fork(saga)

    return _.extend(
      asyncSagas,
      _.pick(store.asyncSagas, [key])
    )
  }, {})

  store.sagaMiddleware.run(makeRootSaga(newSagas, true))
}
