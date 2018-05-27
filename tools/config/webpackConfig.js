const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashPlugin = require('lodash-webpack-plugin')
const autoprefixer = require('autoprefixer')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const paths = require('../utils/paths')
const env = require('../utils/env')

const rules = []

const getStyleLoaders = loaders => [
  env.isProd ? 'style-loader' : MiniCssExtractPlugin.loader
].concat(loaders)

rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    cacheDirectory: env.isDev
  }
})

// scss files in src
rules.push({
  test: /\.scss/,
  include: /src/,
  use: getStyleLoaders([{
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: env.isDev,
      modules: true,
      localIdentName: env.isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
      minimize: !env.isDev,
      discardComments: {
        removeAll: true
      }
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: env.isDev,
      plugins: function () {
        return [autoprefixer]
      }
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: env.isDev,
      includePaths: [
        path.resolve(paths.srcPath, 'styles')
      ]
    }
  }])
})

// css files in node_modules
rules.push({
  test: /\.css/,
  exclude: /src/,
  use: getStyleLoaders([{
    loader: 'css-loader',
    options: {
      sourceMap: env.isDev,
      minimize: !env.isDev
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: env.isDev,
      plugins: function () {
        return [autoprefixer]
      }
    }
  }])
})

// scss files in node_modules
rules.push({
  test: /\.scss/,
  exclude: /src/,
  use: getStyleLoaders([{
    loader: 'css-loader',
    options: {
      sourceMap: env.isDev,
      minimize: !env.isDev
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: env.isDev,
      plugins: function () {
        return [autoprefixer]
      }
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: env.isDev
    }
  }])
})

// images
rules.push({
  test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
  use: [{
    loader: 'file-loader',
    query: {
      name: env.isDev ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
    }
  }]
})

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new LodashPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
]

const optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

const webpackConfig = {
  mode: env.isDev ? 'development' : 'production',
  context: paths.rootPath,
  target: 'web',
  devtool: env.isDev ? 'source-map' : false,
  output: {
    path: paths.buildPath,
    filename: '[name].js'
  },
  optimization,
  plugins,
  resolve: {
    modules: [
      'node_modules',
      paths.srcPath
    ]
  },
  entry: {
    'app': './src/index.js',
    'customize-preview': './src/customize-preview.js'
  },
  module: {
    rules
  },
  cache: env.isDev
}

module.exports = webpackConfig
