const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'production',
  entry: {
    'react-tabllist.demo.min': './app/examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../examples'),
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
      template: './index.html',
      filename: 'index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
