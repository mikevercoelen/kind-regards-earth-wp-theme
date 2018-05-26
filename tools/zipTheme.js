const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const logger = require('./utils/logger')
const pkg = require('../package.json')

const themeName = pkg.name.toLowerCase() || path.basename(__dirname)

const files = pkg.files

if (!files || files.length < 1) {
  return logger.error('Please add the files you want to publish to the array `files` in `package.json`.')
}

const output = fs.createWriteStream(path.resolve(__dirname, `../build/${themeName}.zip`))
const archive = archiver('zip', {
  store: true
})

output.on('close', () => {
  logger.info(archive.pointer() + ' total bytes')
  logger.info('archiver has been finalized and the output file descriptor has closed.')
})

archive.on('error', error => {
  throw error
})

archive.pipe(output)

files.map(file => {
  logger.info(`Adding ${file}`)
  archive.glob(file)
})

logger.info(`Saving the zip to ./build/${themeName}.zip`)
archive.finalize()
