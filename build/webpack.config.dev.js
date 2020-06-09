const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const htmlWebpackPlugin = require('html-webpack-plugin');
const stylelintWebpackPlugin = require('stylelint-webpack-plugin');

let config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'react-tabllist.dev': './app/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../app')
  },
  devServer: {
    contentBase: path.join(__dirname, '../app'),
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
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // 使用dart-sass代替node-sass
              sourceMap: true
            }
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
      files: '*.scss',
      failOnError: false,
      quiet: true,
      fix: true
    })
  ]
};

module.exports = merge(baseConfig, config);
