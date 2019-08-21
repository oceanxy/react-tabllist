const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const htmlWebpackPlugin = require('html-webpack-plugin')
const stylelintWebpackPlugin = require('stylelint-webpack-plugin')

let config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'react-tabllist.dev': './app/examples/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../app/examples')
  },
  devServer: {
    contentBase: path.join(__dirname, '../app/examples'),
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new stylelintWebpackPlugin({
      context: 'src',
      files: 'style/css/*.scss',
      failOnError: false,
      quiet: true,
      fix: true
    })
  ]
}

module.exports = merge(baseConfig, config)
