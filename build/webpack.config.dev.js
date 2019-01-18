const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const htmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'react-tabllist.dev': './test/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../test')
  },
  devServer: {
    contentBase: path.join(__dirname, '../test'),
    host: 'localhost',
    compress: true,
    // open: true,
    port: 3001
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
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
