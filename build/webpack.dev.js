const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.lib')
const htmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../test/index.js'),
    vendors: [
      'react',
      'react-dom',
      'lodash'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../test'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
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
  devServer: {
    contentBase: path.resolve(__dirname, '../test'),
    host: 'localhost',
    compress: true,
    port: 8080
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../test/index.html'),
      filename: 'index.html'
    })
  ]
}

module.exports = merge(baseConfig, config)
