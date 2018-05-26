export const getIsLoaded = state => {
  return state.app.get('hasFontsLoaded') && state.app.get('hasPageLoaded')
}
