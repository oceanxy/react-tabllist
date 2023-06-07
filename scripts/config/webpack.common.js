const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { isDev, PROJECT_PATH } = require('../constant')

/**
 * 提取css处理公共部分
 * @param importLoaders
 */
const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false, // 默认 false, 若要开启，可在官网具体查看可配置项
      sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
      importLoaders // 指定在 CSS loader 处理前使用的 loader 数量
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        // 修复一些和 flex 布局相关的 bug
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            grid: true,
            flexbox: 'no-2009'
          },
          stage: 3
        }),
        require('postcss-normalize')
      ],
      sourceMap: isDev
    }
  }
]

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx')
  },
  output: {
    // 开发环境不需要生成hash值
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist')
  },
  resolve: {
    // 引入文件时，可省略后缀。webpack会从下面的配置中依次匹配后缀，所以尽可能把常用的写在数组前面，节省匹配时间
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      Src: path.resolve(PROJECT_PATH, './src'),
      Components: path.resolve(PROJECT_PATH, './src/components'),
      Utils: path.resolve(PROJECT_PATH, './src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        options: {
          // babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率。开启该选项后将这些公共文件缓存起来，下次编译就会加快很多。
          cacheDirectory: true
        },
        // 编译时，排除 node_modules文件
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1)
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              implementation: require('sass') // 使用dart-sass代替node-sass
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    // 拷贝公共静态资源
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(PROJECT_PATH, './public'),
          from: '*',
          to: path.resolve(PROJECT_PATH, './dist'),
          toType: 'dir'
        }
      ]
    }),
    // 显示编译进度
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16'
    }),
    // 编译时的 typescript 类型检查
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json')
      }
    }),
    // 加快二次编译速度
    new HardSourceWebpackPlugin()
  ],
  // external 减少打包体积
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  // 抽离公共代码
  optimization: {
    /**
     * 指定压缩器
     *  true: 就默认使用 terser-webpack-plugin
     *  false: 不压缩代码。
     *
     * 接下来在 minimize 中判断如果是生产环境，就开启压缩。
     *
     *  extractComments: false 去除所有注释(除了有特殊标记的注释)。比如 @preserve 标记
     *  pure_funcs 设置想要去除的函数，比如将代码中所有 console.log 去除。
     */
    minimize: !isDev,
    minimizer: [
      // 压缩 css 代码
      !isDev && new OptimizeCssAssetsWebpackPlugin(),
      // 压缩 js 代码
      !isDev &&
        new TerserWebpackPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              pure_funcs: ['console.log']
            }
          }
        })
    ].filter(Boolean),
    /**
     * https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
     * https://www.cnblogs.com/kwzm/p/10314438.html
     */
    splitChunks: {
      chunks: 'all',
      name: false
    }
  }
}
