// const VConsolePlugin = require('vconsole-webpack-plugin') // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {resolve, join} = require('path')
const {ProvidePlugin, DefinePlugin, ContextReplacementPlugin, IgnorePlugin} = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const {getBuildConfig, getDevServer, preloadResources} = require('./build/webpackConfigs')
const {config: webpackConfig, externalProjNames} = getBuildConfig()
const EnvProductionPlugin = require('./build/env.production.plugin')
const createZip = require('./build/zip')
const {
  appConfig,
  availableProjectNames,
  subDir
} = require('./build/params')
const {
  account,
  password,
  ...devServer
} = getDevServer()

const apn = availableProjectNames[0]

module.exports = {
  ...webpackConfig,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后可以在 Vue 组件中使用 template 选项，但应用会额外增加 10kb 左右。
  // 默认值是false
  runtimeCompiler: true,
  devServer,
  css: {
    // css 样式与 html 代码分离
    requireModuleExtension: true,
    loaderOptions: {
      // 引入sass全局变量文件
      sass: {sassOptions: {prependData: '@import "~@/assets/styles/themeFromLess.scss"'}}, // 未生效
      // 启用内联JavaScript。ant-design-vue使用less编写，且使用了内联写法，所以需要开启
      less: {lessOptions: {javascriptEnabled: true, math: 'always'}}
    }
  },
  configureWebpack: {
    // externals: [
    //   {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex',
    //     'lodash': '_',
    //     'axios': 'axios',
    //     'moment': 'moment',
    //     'echarts': 'echarts', // 成功（大体积）
    //     'ant-design-vue': 'antd' // 未成功 受 babel.config.js 里按需使用antd组件配置的影响
    //   }
    // ]
  },
  // 生产环境是否生成 sourceMap 文件。设置为 false 以加速生产环境构建。
  // 默认 true
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改
  // https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    // 复制 public 内静态文件
    config.plugin('copyWebpackPlugin').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            force: true,
            from: resolve(join(__dirname, `src/apps/${apn}/public`)),
            to: resolve(join(__dirname, `dist${subDir ? `/${subDir}` : ''}`))
          }
        ]
      }
    ])

    // 替换svg loader
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    // 使用 ProvidePlugin 预加载的文件集合
    const PROVIDE_PLUGIN_PAYLOAD = {
      // 预加载子项目配置文件
      APP_CONFIG: resolve(join(__dirname, `src/apps/${apn}/config/index.js`)),
      // 预加载子项目入口组件，如果子项目内找不到则使用默认值
      APP_COMPONENT: apn
        ? resolve(join(__dirname, `src/apps/${apn}/App.jsx`))
        : resolve(join(__dirname, 'src/App.jsx')),
      // 预加载子项目路由
      APP_ROUTES: resolve(join(__dirname, `src/apps/${apn}/router/routes.js`)),
      // 预加载iconfont文件
      APP_ICON_FONT: resolve(join(__dirname, `src/apps/${apn}/assets/iconfont.js`))
    }

    const DEFINE_PLUGIN_PAYLOAD = {
      // 注入项目名称
      PROJ_APP_NAME: JSON.stringify(apn),
      // 注入开发环境账号
      DEV_DEFAULT_ACCOUNT: JSON.stringify(process.env.NODE_ENV === 'development' ? account : ''),
      // 注入开发环境密码
      DEV_DEFAULT_PASSWORD: JSON.stringify(process.env.NODE_ENV === 'development' ? password : '')
    }

    // 预加载接口映射器
    preloadResources(
      `src/apps/${apn}/config/interfaceMappings.js`,
      resource => {
        PROVIDE_PLUGIN_PAYLOAD.INTERFACE_MAPPINGS = resource

        console.info(apn, '开发环境编译信息：检测到接口映射文件(interfaceMappings)，已成功预加载。')
      },
      () => DEFINE_PLUGIN_PAYLOAD.INTERFACE_MAPPINGS = undefined
    )

    // 预加载用户信息和菜单信息映射器
    preloadResources(
      `src/apps/${apn}/config/userInfoMappings.js`,
      resource => {
        PROVIDE_PLUGIN_PAYLOAD.USER_INFO_MAPPINGS = resource

        console.info(apn, '开发环境编译信息：检测到动态菜单映射文件(menuMappings)，已成功预加载。')
      },
      () => DEFINE_PLUGIN_PAYLOAD.USER_INFO_MAPPINGS = undefined
    )

    // 预加载子项目登录组件
    // 检测子项目是否定义了 Login 组件，否则使用主框架的默认登录组件
    preloadResources(
      `src/apps/${apn}/views/Login/index.jsx`,
      resource => PROVIDE_PLUGIN_PAYLOAD.LOGIN_COMPONENT = resource,
      () => {
        preloadResources(
          'src/views/Login/index.jsx',
          resource => PROVIDE_PLUGIN_PAYLOAD.LOGIN_COMPONENT = resource,
          () => {
            DEFINE_PLUGIN_PAYLOAD.LOGIN_COMPONENT = undefined
          }
        )
      }
    )

    /**
     * 预加载 echarts.min.js。
     * - 生产环境推荐使用定制的 echarts.min.js 文件，定制地址：https://echarts.apache.org/zh/builder.html。
     * - 非生产环境先尝试寻找 echarts.min.js，如果不存在则直接引用 node_modules 下的 echarts 包。
     */
    let isExistCustomizeProdTinyEcharts = false

    preloadResources(
      `src/apps/${apn}/assets/echarts.min.js`,
      resource => {
        isExistCustomizeProdTinyEcharts = true
        PROVIDE_PLUGIN_PAYLOAD.CUSTOMIZE_PROD_TINY_ECHARTS = CUSTOMIZE_PROD_TINY_ECHARTS = resource
      },
      () => {
        PROVIDE_PLUGIN_PAYLOAD.CUSTOMIZE_PROD_TINY_ECHARTS = resolve(join(__dirname, 'node_modules/echarts'))
      }
    )

    // 预解析资源
    config.plugin('ProvidePlugin').use(ProvidePlugin, [PROVIDE_PLUGIN_PAYLOAD])

    // 预加载资源
    config.plugin('DefinePlugin').use(DefinePlugin, [DEFINE_PLUGIN_PAYLOAD])

    // 去除 moment 多余的本地化文件
    config.plugin('contextReplacementPlugin').use(ContextReplacementPlugin, [
      /moment[/\\]locale$/, /zh-cn/
    ])

    // 去掉 apps 下其他子项目的文件
    config.plugin('ignorePlugin').use(IgnorePlugin, [
      {
        checkResource(resource) {
          for (const externalProjName of externalProjNames) {
            if (resource.includes('/' + externalProjName + '/')) return true
          }

          // 不打包子项目里面的 .md 和 .ico 资源
          return /.*\.(md|ico)$/.test(resource)
        }
      }
    ])

    // 生产环境相关处理
    if (process.env.NODE_ENV === 'production') {
      /**
       * =======================================================================================
       * 删除懒加载模块的prefetch，降低带宽压力
       * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
       * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
       */
      // config.plugins.delete('preload-index')
      // config.plugins.delete('prefetch-index')

      // 默认在dist目录下生成 manifest.json（追踪所有模块到输出 bundle 之间的映射）
      config.plugin('manifest').use(WebpackAssetsManifest)

      // 配置压缩选项
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.warnings = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].terserOptions.compress.drop_console = true

        return args
      })

      // 抽取主题样式为单独的文件
      const themeGroups = {}

      appConfig[apn].header.buttons.theme.availableThemes.forEach(t => {
        themeGroups[`${t.fileName}Theme`] = {
          name: t.fileName,
          test: (module, chunk, entry = t.fileName) => {
            const reg = new RegExp('[\\\\/]src[\\\\/]assets[\\\\/]styles[\\\\/]themes[\\\\/]' + entry)

            return reg.test(module.resource)
          },
          chunks: 'all',
          enforce: true,
          priority: 0
        }
      })

      // 抽取指定 chunk 为单独的文件
      config.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity,

        cacheGroups: {
          oss: {
            name: 'chunk-ali-oss',
            priority: 100,
            test: /[\\/]node_modules[\\/]ali-oss[\\/]/
          },
          jszip: {
            name: 'chunk-jszip',
            priority: 100,
            test: /[\\/]node_modules[\\/]jszip[\\/]/
          },
          echarts: {
            name: 'chunk-echarts',
            priority: 90,
            test: isExistCustomizeProdTinyEcharts
              ? /[\\/]src[\\/]apps[\\/].+[\\/]echarts.min.js$/
              : /[\\/]node_modules[\\/]echarts[\\/]/
          },
          editor: {
            name: 'chunk-wangeditor',
            priority: 80,
            test: /[\\/]node_modules[\\/]@wangeditor[\\/]/
          },
          lodash: {
            name: 'chunk-lodash',
            priority: 60,
            test: /[\\/]node_modules[\\/]lodash[\\/]/
          },
          vue: {
            name: 'chunk-vue',
            priority: 50,
            test: /[\\/]node_modules[\\/]vue[\\/]/
          },
          '@ant-design': {
            name: 'chunk-ant-design-icons',
            priority: 30,
            test: /[\\/]node_modules[\\/]@ant-design[\\/]/
          },
          'ant-design-vue': {
            name: 'chunk-ant-design-vue',
            priority: 20,
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/
          },
          ...themeGroups,
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 缓存组权重，数字越大优先级越高
            chunks: 'all', // 只处理初始 chunk
            reuseExistingChunk: true
          },
          common: {
            name: 'chunk-commons',
            // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
            minChunks: 2,
            priority: -20,
            // 只针对同步 chunk
            chunks: 'initial',
            // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项。
            // 但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。默认 true。
            reuseExistingChunk: true
          }
        }
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

      // 在打包文件中生成可配置的环境变量文件
      if (appConfig[apn].prodEnvVar.configurable) {
        config.plugin('configurableEnvAndCreateZip').use(EnvProductionPlugin, [
          {
            appConfig: appConfig[apn],
            subDir,
            callback: () => createZip(appConfig[apn].zipName || apn)
          }
        ])
      } else {
        config.plugin('createZip').use({
          apply: compiler => {
            compiler.hooks.done.tap('createZip', compilation => {
              createZip(appConfig[apn].zipName || apn)
            })
          }
        })
      }

      // 主题样式文件处理
      const themeNames = []

      appConfig[apn].header.buttons.theme.availableThemes.forEach(t => {
        // config.plugins.delete(`preload-${t.fileName}`)
        // config.plugins.delete(`prefetch-${t.fileName}`)

        // 删除多余的 html-webpack-plugin 配置（自定义主题入口打包编译less文件时，vue-cli自动添加的冗余配置）
        config.plugins.delete(`html-${t.fileName}`)

        themeNames.push(t.fileName)
      })

      // 修改 html-webpack-plugin 插件配置
      config.plugin('html-index').tap(options => {
        // 设置网站 title
        options[0].title = appConfig[apn].systemName

        // 在index.html中排除对主题样式文件的引用，通过在程序中点击切换主题时再动态加载对应的主题文件，防止样式污染
        options[0].excludeChunks = themeNames

        /**
         * 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中，
         * 注意 CDN 部分需要配合 configureWebpack.externals 使用
         */
        options[0].cdn = {
          css: [
            // 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css'
          ],
          js: [
            // 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
            // 'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
            // 'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
            // 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
            // 'https://cdn.jsdelivr.net/npm/axios@1.3.4/dist/axios.min.js',
            // 'https://cdn.jsdelivr.net/npm/moment@2.29.3/dist/moment.min.js',
            // 'https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js',
            // 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.js'
          ]
        }

        return options
      })

      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      // config
      //   .plugin('BundleAnalyzerPlugin')
      //   .use(BundleAnalyzerPlugin)
    } else {
      // 设置网站 title
      config.plugin('html-index').tap(options => {
        options[0].title = appConfig[apn].systemName

        return options
      })

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
