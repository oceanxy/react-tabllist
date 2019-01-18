const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const nodeExternals = require('webpack-node-externals')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'production',
  entry: {
    'react-tabllist.demo.min': './test/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: '[name].js',
    library: 'react-tabllist',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../test/index.html'),
      filename: 'index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
