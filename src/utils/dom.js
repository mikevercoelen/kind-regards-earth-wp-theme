const injectStyle = style => {
  const styleElement = document.createElement('style')
  let styleSheet

  document.head.appendChild(styleElement)
  styleSheet = styleElement.sheet
  styleSheet.insertRule(style, styleSheet.cssRules.length)
}

export {
  injectStyle
}
