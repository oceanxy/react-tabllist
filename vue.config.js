// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // Webpack包文件分析器
// const VConsolePlugin = require('vconsole-webpack-plugin') // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolve, join } = require('path')
const { getBuildConfig, getDevServer } = require('./build/configs')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const { accessSync, constants } = require('fs')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const buildConfig = getBuildConfig()
const {
  account,
  password,
  ...devServer
} = getDevServer(buildConfig)

module.exports = {
  ...buildConfig.config,
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
      sass: { sassOptions: { prependData: '@import "~@/assets/styles/themeFromLess.scss"' } }, // 未生效
      // 启用内联JavaScript。ant-design-vue使用less编写，且使用了内联写法，所以需要开启
      less: { lessOptions: { javascriptEnabled: true, math: 'always' } }
    }
  },
  configureWebpack: {
    externals: [
      {
        //   'vue': 'Vue',
        //   'vue-router': 'VueRouter',
        //   'vuex': 'Vuex',
        //   'lodash': '_',
        //   'axios': 'axios',
        //   'moment': 'moment',
        //   'echarts': 'echarts', // 成功（大体积）
        //   'ant-design-vue': 'antd' // 未成功 受 babel.config.js 里按需使用antd组件配置的影响
      },
      buildConfig.externals
    ]
  },
  // 生产环境是否生成 sourceMap 文件。设置为 false 以加速生产环境构建。
  // 默认 true
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改
  // https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    const themeNames = []

    /**
     * =======================================================================================
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    // config.plugins.delete('preload-index')
    // config.plugins.delete('prefetch-index')

    if (process.env.NODE_ENV === 'production') {
      buildConfig.appConfig[buildConfig.availableProjectName].theme.availableThemes.forEach(t => {
        // config.plugins.delete(`preload-${t.fileName}`)
        // config.plugins.delete(`prefetch-${t.fileName}`)

        // 删除多余的 html-webpack-plugin 配置，（自定义主题入口来打包编译less文件，vue-cli自动添加的冗余配置）
        config.plugins.delete(`html-${t.fileName}`)

        themeNames.push(t.fileName)
      })

      // 在index.html中排除对主题样式文件的引用
      config.plugin('html-index').tap(config => {
        config[0].excludeChunks = themeNames
        config[0].title = buildConfig.appConfig[buildConfig.availableProjectName].systemName

        return config
      })
    } else {
      // 在index.html中排除对主题样式文件的引用
      config.plugin('html-index').tap(config => {
        config[0].title = buildConfig.appConfig[buildConfig.availableProjectName].systemName

        return config
      })
    }

    // 替换svg loader
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    /* ========================   复制 favicon.ico 图标    ===================================== */
    // 复制 icon 图标
    config.plugin('copyWebpackPlugin').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            force: true,
            from: resolve(__dirname, `src/apps/${buildConfig.availableProjectName}/assets/images/favicon.ico`),
            to: resolve(__dirname, `dist/${
              +buildConfig.appSeparately === 1
                ? buildConfig.appPrefix || buildConfig.availableProjectName
                : 'favicon.ico'
            }`)
          }
        ]
      }
    ])

    /* ======================================================================================== */

    /* ==================================   定义全局变量    ===================================== */
    // 检测子项目是否定义了 Login 组件，否则使用主框架的默认登录组件
    let LOGIN_COMPONENT = ''

    try {
      accessSync(
        join(__dirname, `src/apps/${buildConfig.availableProjectName}/views/Login/index.jsx`),
        constants.F_OK
      )

      LOGIN_COMPONENT = resolve(join(__dirname, `src/apps/${buildConfig.availableProjectName}/views/Login/index.jsx`))
    } catch (e) {
      LOGIN_COMPONENT = resolve(join(__dirname, 'src/views/Login/index.jsx'))
    }

    // 加载子项目的 store 模块
    // const storeModules = {}
    //
    // readdirSync(
    //   join(__dirname, `src/apps/${buildConfig.availableProjectName}/store`),
    //   { withFileTypes: true }
    // ).forEach(Dirent => {
    //   if (Dirent.isDirectory()) {
    //     let files
    //
    //     if (Dirent.name === 'modules') {
    //       const alias = buildConfig.availableProjectName.split('-').map(i => i[0]).join('')
    //
    //       files = readdirSync(join(__dirname, `src/apps/${buildConfig.availableProjectName}/store`, Dirent.name))
    //       files.forEach(file => {
    //         storeModules[`${alias}/${file.substring(0, file.length - 3)}`] =
    //           `@/apps/${buildConfig.availableProjectName}/store/${Dirent.name}/${file}`
    //       })
    //     } else {
    //       files = readdirSync(join(
    //         __dirname,
    //         `src/apps/${buildConfig.availableProjectName}/store`,
    //         Dirent.name,
    //         'modules'
    //       ))
    //
    //       files.forEach(file => {
    //         storeModules[file.substring(0, file.length - 3)] =
    //           `@/apps/${buildConfig.availableProjectName}/store/${Dirent.name}/modules/${file}`
    //       })
    //     }
    //   }
    // })

    // 欲使用 ProvidePlugin 预加载的文件集合
    const PROVIDE_PLUGIN_PAYLOAD = {
      // 预加载子项目配置文件
      APP_CONFIG: resolve(join(__dirname, `src/apps/${buildConfig.availableProjectName}/config/index.js`)),
      // 预加载子项目入口组件
      APP_COMPONENT: buildConfig.availableProjectName
        ? resolve(join(__dirname, `src/apps/${buildConfig.availableProjectName}/App.jsx`))
        : resolve(join(__dirname, 'src/App.jsx')),
      // 预加载子项目路由
      APP_ROUTES: resolve(join(__dirname, `src/apps/${buildConfig.availableProjectName}/router/routes.js`)),
      // 预加载子项目登录组件
      LOGIN_COMPONENT,
      // 预加载iconfont文件
      APP_ICON_FONT: resolve(join(__dirname, `src/apps/${buildConfig.availableProjectName}/assets/iconfont.js`))
    }

    /***************** 预加载接口映射器，判断文件是否存在 ***********************/
    const INTERFACE_MAPPINGS = resolve(join(
      __dirname,
      `src/apps/${buildConfig.availableProjectName}/config/interfaceMappings.js`
    ))

    try {
      accessSync(INTERFACE_MAPPINGS, constants.F_OK)
      PROVIDE_PLUGIN_PAYLOAD.INTERFACE_MAPPINGS = INTERFACE_MAPPINGS
    } catch (e) {
      console.info('未找到项目对应的接口字段映射（interfaceMappings）。')
    }
    /**********************************************************************/

    /***************** 预加载用户信息映射器，判断文件是否存在 ***********************/
    const USER_INFO_MAPPINGS = resolve(join(
      __dirname,
      `src/apps/${buildConfig.availableProjectName}/config/userInfoMappings.js`
    ))

    try {
      accessSync(USER_INFO_MAPPINGS, constants.F_OK)
      PROVIDE_PLUGIN_PAYLOAD.USER_INFO_MAPPINGS = USER_INFO_MAPPINGS
    } catch (e) {
      console.info('未找到项目对应的动态菜单映射（menuMappings）。')
    }
    /**********************************************************************/

    config.plugin('ProvidePlugin').use(ProvidePlugin, [PROVIDE_PLUGIN_PAYLOAD])

    config.plugin('DefinePlugin').use(DefinePlugin, [
      {
        // 注入项目名称
        PROJ_APP_NAME: JSON.stringify(buildConfig.availableProjectName),
        DEV_DEFAULT_ACCOUNT: JSON.stringify(process.env.NODE_ENV === 'development' ? account : ''),
        DEV_DEFAULT_PASSWORD: JSON.stringify(process.env.NODE_ENV === 'development' ? password : '')
      }
    ])

    /* ======================================================================================== */

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.warnings = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].terserOptions.compress.drop_console = true

        return args
      })

      /* ===============================   抽取主题样式为单独的文件    ================================== */
      const themeGroups = {}

      buildConfig.appConfig[buildConfig.availableProjectName].theme.availableThemes.forEach(t => {
        themeGroups[`${t.fileName}Theme`] = {
          name: t.fileName,
          test: (module, chunk, entry = t.fileName) => {
            const reg = new RegExp('[\\\\/]src[\\\\/]assets[\\\\/]styles[\\\\/]themes[\\\\/]' + entry)

            return reg.test(module.resource)
          },
          chunks: 'all',
          enforce: true,
          priority: 50
        }
      })

      config.optimization.splitChunks({
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10, // 缓存组权重，数字越大优先级越高
            chunks: 'initial' // 只处理初始 chunk
          },
          common: {
            name: 'chunk-commons',
            minChunks: 2, // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
            priority: -20,
            chunks: 'initial', // 只针对同步 chunk
            reuseExistingChunk: true // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
          },
          ...themeGroups
        }
      })
      /* ======================================================================================== */

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

      // 默认在dist目录下生成 manifest.json（追踪所有模块到输出 bundle 之间的映射）
      config.plugin('manifest').use(WebpackAssetsManifest)

      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      // config
      //   .plugin('BundleAnalyzerPlugin')
      //   .use(BundleAnalyzerPlugin)

      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中，配合 configureWebpack.externals 使用
      // config.plugin('html')
      //   .tap(args => {
      //     args[0].cdn = {
      //       css: [
      //         'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css'
      //       ],
      //       js: [
      //         'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
      //         'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      //         'https://cdn.jsdelivr.net/npm/vue-router@3.6.5/dist/vue-router.min.js',
      //         'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
      //         'https://cdn.jsdelivr.net/npm/axios@1.3.4/dist/axios.min.js',
      //         'https://cdn.jsdelivr.net/npm/moment@2.29.3/dist/moment.min.js',
      //         'https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js',
      //         'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.js'
      //       ]
      //     }
      //
      //     return args
      //   })
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
