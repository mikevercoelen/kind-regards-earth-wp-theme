import { fork, all } from 'redux-saga/effects'

import posts from './posts'

export default function makeRootSaga () {
  return function * rootSaga () {
    const sagas = [
      fork(posts)
    ]

    yield all(sagas)
  }
}
