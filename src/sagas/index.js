import { fork, all } from 'redux-saga/effects'

import posts from './posts'
import pages from './pages'

export default function makeRootSaga () {
  return function * rootSaga () {
    const sagas = [
      fork(posts),
      fork(pages)
    ]

    yield all(sagas)
  }
}
