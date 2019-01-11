const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    bundle: path.resolve(__dirname, './src/main.js')
    //添加要打包在vendor里面的库
    //vendors: ['react','react-dom','react-router'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // 将 JS 字符串生成为 style 节点
          }, {
            loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
          }, {
            loader: 'sass-loader' // 将 Sass 编译成 CSS
          }
        ]
      },
      {   //使用css配置
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        //使用less配置
        test: /\.less$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //         options: {
      //             //编译出来是项目中对应图片文件夹的文件目录
      //             // name: 'images/[path][name].[ext]'
      //             name: 'images/[hash].[ext]',//所有图片在一个目录
      //         }
      //       }
      //     ]
      //   }

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash].[ext]'//所有图片在一个目录
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  // devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({//设置成production去除警告
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './common.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin([
      'dist',
      'build'
    ], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['jslibs']
    })
  ]
}
