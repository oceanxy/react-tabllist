const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  mode: 'production',
  entry: {
    'react-tabllist': './src/index.js',
    'react-tabllist.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'react-tabllist',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: [
    nodeExternals()
  ],
  // {
  // react: {
  //   root: 'React',
  //   commonjs2: 'react',
  //   commonjs: 'react',
  //   amd: 'react'
  // },
  // 'react-dom': {
  //   root: 'ReactDOM',
  //   commonjs2: 'react-dom',
  //   commonjs: 'react-dom',
  //   amd: 'react-dom'
  // }
  // },
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
  }
}

module.exports = merge(baseConfig, config)
