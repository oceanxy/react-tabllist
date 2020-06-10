const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'production',
  entry: {
    'react-tabllist': './src/index.js',
    'react-tabllist.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'ReactTabllist',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    babel: {
      root: 'Babel',
      commonjs2: 'babel',
      commonjs: 'babel',
      amd: 'babel'
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
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
              implementation: require('sass')
            }
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
};

module.exports = merge(baseConfig, config);
