export const getHasMore = state => {
  return state.home.get('hasMore')
}

export const getCurrentPage = state => {
  return state.home.get('currentPage')
}

export const getHasInitiallyLoaded = state => {
  return state.home.get('hasInitiallyLoaded')
}
