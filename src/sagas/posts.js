import { takeLatest, put, all, call } from 'redux-saga/effects'
import actions, { constants } from 'actions/posts'
import api from 'api/wp'
import { normalize } from 'normalizr'
import * as schemas from 'schemas'

const ARTICLES_PER_PAGE = 3

export function * onPostsLoad () {
  yield put(actions.postsLoadRequest.start())

  try {
    const posts = yield call(api.getPosts, ARTICLES_PER_PAGE, 1)
    const norm = yield call(normalize, posts, [schemas.post])

    yield put(actions.postsLoadRequest.success({
      posts: norm,
      total: Number(posts._paging.total),
      lastPage: Number(posts._paging.totalPages) + 1
    }))
  } catch (error) {
    yield put(actions.postsLoadRequest.error(error))
  }
}

export function * onPostLoadBySlug ({ payload: slug }) {
  yield put(actions.postLoadBySlugRequest.start())

  try {
    const response = yield call(api.getPostBySlug, slug)
    const post = response[0]

    const output = {
      post,
      nextPost: null,
      nextPostError: null,
      previousPost: null,
      previousPostError: null
    }

    if (post.next) {
      try {
        output.nextPost = yield call(api.getPostById, post.next.id)
      } catch (error) {
        output.nextPostError = error
      }
    }

    if (post.previous) {
      try {
        output.previousPost = yield call(api.getPostById, post.previous.id)
      } catch (error) {
        output.previousPostError = error
      }
    }

    yield put(actions.postLoadBySlugRequest.success(output))
  } catch (error) {
    yield put(actions.postLoadBySlugRequest.error(error))
  }
}

export function * onPostLoadById ({ payload: id }) {
  yield put(actions.postLoadByIdRequest.start())

  try {
    const post = yield call(api.getPostById, id)
    const norm = yield call(normalize, post, schemas.post)
    yield put(actions.postLoadByIdRequest.success(norm))
  } catch (error) {
    yield put(actions.postLoadByIdRequest.error(error))
  }
}

export function * onCategoriesLoad () {
  yield put(actions.categoriesLoadRequest.start())

  try {
    const categories = yield call(api.getCategories)
    const norm = yield call(normalize, categories, [schemas.category])
    yield put(actions.categoriesLoadRequest.success(norm))
  } catch (error) {
    yield put(actions.categoriesLoadRequest.error(error))
  }
}

export function * onMediaLoad () {
  yield put(actions.mediaLoadRequest.start())

  try {
    const media = yield call(api.getMedia)
    const norm = yield call(normalize, media, [schemas.media])
    yield put(actions.mediaLoadRequest.success(norm))
  } catch (error) {
    yield put(actions.mediaLoadRequest.error(error))
  }
}

export default function * watchPosts () {
  yield all([
    takeLatest(constants.POSTS_LOAD, onPostsLoad),
    takeLatest(constants.POST_LOAD_BY_SLUG, onPostLoadBySlug),
    takeLatest(constants.POST_LOAD_BY_ID, onPostLoadById),
    takeLatest(constants.CATEGORIES_LOAD, onCategoriesLoad),
    takeLatest(constants.MEDIA_LOAD, onMediaLoad)
  ])
}
