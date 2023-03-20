const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // Webpack包文件分析器
// const VConsolePlugin = require('vconsole-webpack-plugin') // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const { getAvailableProjectNames } = require('./build/configs')
const webpack = require('webpack')

let config = {}

const availableProjectNames = getAvailableProjectNames()

if (availableProjectNames.length) {
  // app 独立打包
  config = {
    pages: {
      index: {
        entry: `src/apps/${availableProjectNames[0]}/main.js`,
        // title: '',
        chunks: [availableProjectNames[0], 'chunk-vendors', 'chunk-common']
      }
    },
    outputDir: `dist/${availableProjectNames[0]}`
  }
}

module.exports = {
  ...config,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后可以在 Vue 组件中使用 template 选项，但应用会额外增加 10kb 左右。
  // 默认值是false
  runtimeCompiler: true,
  devServer: {
    port: '8190',
    open: false,
    proxy: {
      '/mgapi': {
        target: 'http://10.100.1.94:44100',
        // target: 'http://10.100.1.101:44100',
        changeOrigin: true,
        secure: false
      }
    }
  },
  css: {
    // css 样式与 html 代码分离
    requireModuleExtension: true,
    loaderOptions: {
      // 引入sass全局变量文件
      sass: { sassOptions: { prependData: '@import "@/assets/styles/theme.scss"' } },
      // 启用内联JavaScript。ant-design-vue使用less编写，且使用了内联写法，所以需要开启
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#2970ff',
            'link-color': '#2970ff'
            // 'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件。设置为 false 以加速生产环境构建。
  // 默认 true
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // configureWebpack: {
  //   plugins: [
  //     // ant-design-vue中有强依赖该插件，所以在webpack的externals中配置moment会报错，现通过webpack中自带的插件减小引用文件的体积
  //     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
  //   ]
  // },
  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改
  // https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.warnings = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].terserOptions.compress.drop_console = true

        return args
      })

      // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
      config.plugin('compressionPlugin').use(CompressionPlugin, [
        {
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        }
      ])

      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      config
        .plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin)

      // 排除指定包，采用 CND 方式
      config.set('externals', {
        'vue': 'Vue', // 成功
        'vue-router': 'VueRouter', // 成功
        'vuex': 'Vuex', // 成功
        'lodash': '_', // 成功
        'axios': 'axios', // 成功
        'echarts': 'echarts', // 成功（大体积）
        'ant-design-vue': 'antd' // 未成功
      })

      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html')
        .tap(args => {
          args[0].cdn = {
            css: [
              'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css'
            ],
            js: [
              'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
              'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
              'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
              'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
              'https://cdn.jsdelivr.net/npm/axios@1.3.4/dist/axios.min.js',
              'https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js',
              'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.js'
            ]
          }

          return args
        })
    } else {
      // 移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin https://github.com/Tencent/vConsole)
      // config.plugins.push(
      //   new VConsolePlugin({
      //     filter: [], // 需要过滤的入口文件
      //     enable: true // 发布代码前记得改回 false
      //   })
      // )
    }
  }
}
