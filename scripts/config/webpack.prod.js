const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')
const common = require('./webpack.common')
const { PROJECT_PATH } = require('../constant')

// 包注释
const customNote = ''

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    // 每次打包前先处理掉之前的 dist 目录，以保证每次打出的文件都是当前最新的
    new CleanWebpackPlugin(),
    // 去除无用样式
    new PurgeCSSPlugin({
      /**
       * glob 是用来查找文件路径的，
       * 我们同步找到 src 下面的后缀为 .tsx 、 .(sc|c|le)ss 的文件路径并以数组形式返给 paths ，
       * 然后该插件就会去解析每一个路径对应的文件，将无用样式去除；
       * nodir 即去除文件夹的路径，加快处理速度。
       *
       * 例如：
       ```
       [
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/app.scss',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/app.tsx',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/components/ComputedOne/index.scss',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/components/ComputedOne/index.tsx',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/components/ComputedTwo/index.scss',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/components/ComputedTwo/index.tsx',
       '/Users/RMBP/Desktop/react-ts-quick-starter/src/index.tsx'
       ]
       ```
       */
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, {
        nodir: true
      })
    }),
    // 添加包注释 （将banner字段修改为自己的包信息）
    new webpack.BannerPlugin({
      raw: true,
      banner: `/** @preserve ${customNote} */`
    }),
    //
    new webpack.BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888 // 端口号设置
    })
  ]
})
