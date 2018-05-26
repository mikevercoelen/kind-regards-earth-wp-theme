const templateUrl = WPSettings.templateUrl
export const path = WPSettings.URL.path || '/'
export const base = WPSettings.URL.base

export const getAssetPath = path => {
  return `${templateUrl}/${path}`
}
