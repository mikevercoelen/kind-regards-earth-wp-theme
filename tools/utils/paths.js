const path = require('path')

const rootPath = path.resolve(__dirname, '../../')
const srcPath = path.resolve(rootPath, 'src')
const buildPath = path.resolve(rootPath, 'build')

module.exports = {
  rootPath,
  srcPath,
  buildPath
}
