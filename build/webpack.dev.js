const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.lib')

let config = {
  mode: 'development',
  entry: {
    vendors: [
      'react',
      'react-dom',
      'lodash'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
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
          'sass-loader?sourceMap'
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
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  }
}

module.exports = merge(baseConfig, config)
