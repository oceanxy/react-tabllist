const merge = require('webpack-merge')
const baseConfig = require('./webpack.lib')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'scripts/[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugs: [
    new ExtractTextPlugin('styles/[name].[contenthash].css', {
      allChunks: true
    })
  ]
}

module.exports = merge(baseConfig, config)
