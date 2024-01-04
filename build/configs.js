/**
 * 编译/打包需要的配置
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 14:19:41
 */

const glob = require('glob')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const args = require('minimist')(process.argv.slice(2))
const projConfig = require('../src/config/config')
const { merge } = require('lodash')

function on(workerProcess, ordinal, filepath) {
  workerProcess.stdout.on('data', function(data) {
    if (data.replace(/\+/g, '').replace(/[\r\n]/g, '')) {
      if (ordinal) {
        console.info(`第${ordinal}个APP(${filepath})信息: ${data}`)
      } else {
        console.info(data)
      }
    }
  })

  workerProcess.stderr.on('data', function(data) {
    if (ordinal) {
      console.info(`第${ordinal}个APP(${filepath})信息: ${data}`)
    } else {
      console.info(data)
    }
  })

  workerProcess.on('close', function(code) {
    if (ordinal) {
      console.info(`第${ordinal}个APP(${filepath})已打包完成，退出码: ${code}`)
    } else {
      console.info('退出码：' + code)
    }
  })
}

/**
 * 打包时使用“--app-proj appName1,appName2,appPrefix1,appPrefix2...”指令可对指定的 APP 分别打包，逗号分割 appName 或 appPrefix
 * 不带或 appName 或 appPrefix 全部无效时将对整体项目打包，至少有一个可用的 appName 或 appPrefix 将使用该有效值进行打包
 * @returns {*[]}
 */
function getAvailableProjectNames() {
  let projectNames = []

  if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
    projectNames = args['app-proj'].split(' ')
  }

  const availableProjectNames = []

  // 初始化所有可以打包的 apps 的打包信息
  if (projectNames?.length) {
    const byAppPrefix = {}
    const files = glob.sync('src/apps/*/config/index.js') // 获取所有匹配文件的文件名数组

    for (const filepath of files) {
      // 获取文件地址中的 appName
      const appName = filepath.split('/').at(-3)

      if (projectNames.indexOf(appName) > -1) {
        availableProjectNames.push({ availableProjectNames: [appName] })
      }

      /**
       * 读取该文件的配置信息
       */
      const data = readFileSync(resolve(filepath), 'utf-8')
      const appPrefix = data.match(/appPrefix:\s?'([a-zA-Z0-9]+)'/)[1]

      if (!(appPrefix in byAppPrefix)) {
        byAppPrefix[appPrefix] = []
      }

      byAppPrefix[appPrefix].push(appName)
    }

    /**
     * app-proj 带的参数是 src/apps/config 中配置的别名（appPrefix 的值）
     * 找出 files 中所有 appPrefix 等于 projectNames 的 app
     */
    projectNames.forEach(projectName => {
      if (projectName in byAppPrefix) {
        availableProjectNames.push({
          appPrefix: projectName,
          availableProjectNames: byAppPrefix[projectName]
        })
      }
    })
  }

  return availableProjectNames
}

function getAvailableNamesFromProjectConfig() {
  const files = glob.sync('src/apps/*/config/index.js')
  const availableProjectNames = []

  files.forEach(filepath => {
    const data = readFileSync(resolve(filepath), 'utf-8')

    if (projConfig.appPrefix === data.match(/appPrefix:\s?'([a-zA-Z0-9]+)'/)[1]) {
      availableProjectNames.push(filepath.split('/').at(-3))
    }
  })

  return [
    {
      appPrefix: projConfig.appPrefix,
      availableProjectNames: availableProjectNames
    }
  ]
}

function getDevServer(buildConfig) {
  const availableProjectNames = buildConfig.availableProjectName.split(',')
  const devServers = []

  if (availableProjectNames.length > 1 && process.env.NODE_ENV === 'development') {
    // 多个子项目一起打包，合并每个项目的 devServer
    console.info('请注意：同时启动多个子项目时，devServer 配置会被合并，相同的字段会被后面遍历到的配置覆盖！')
  }

  availableProjectNames.forEach(item => {
    devServers.push(require(`../src/apps/${item}/config/devServer.js`))
  })

  return merge({}, ...devServers)
}

function getBuildConfig() {
  const files = glob.sync('src/apps/*/config/index.js')
  let availableProjectNames = []
  let appPrefix = ''
  const appConfig = {}
  const appSeparately = args['app-separately']
  const externals = []

  if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
    availableProjectNames = args['app-proj'].split(' ')
  }

  availableProjectNames.forEach(apn => {
    appConfig[apn] = require(resolve(__dirname, `../src/apps/${apn}/config/index.js`))
  })

  if (Object.prototype.toString.call(args['app-pref']) === '[object String]') {
    appPrefix = args['app-pref']
  }

  const config = {}

  if (process.env.NODE_ENV === 'production') {
    config.pages = {
      index: {
        entry: 'src/main.js',
        title: '',
        chunks: ['chunk-vendors', 'chunk-commons', 'index']
        // chunks: ['index']
      },
      ...appConfig[availableProjectNames[0]].theme.availableThemes.reduce((themes, cur) => {
        themes[cur.fileName] = `src/assets/styles/themes/${cur.fileName}`

        return themes
      }, {})
    }
  } else {
    config.pages = {
      index: 'src/main.js'
    }
  }

  // 分别独立打包时，在“dist/”下按项目名称创建打包文件夹
  if (+appSeparately === 1) {
    config.outputDir = `dist/${appPrefix || availableProjectNames[0]}`
  }

  /**
   * 剔除其他不需要打包的子项目文件
   */
  files.forEach(filepath => {
    const name = filepath.split('/').at(-3)

    if ((appPrefix && availableProjectNames.indexOf(name) === -1) || availableProjectNames[0] !== name) {
      externals.push(name)
    }
  })

  return {
    config,
    appPrefix,
    appConfig,
    appSeparately,
    availableProjectName: availableProjectNames[0],
    externals(context, request, callback) {
      for (const external of externals) {
        if (
          typeof context === 'string' && context.includes('apps') &&
          typeof request === 'string' && request.includes(external)
        ) {
          // 重置 src/apps 下不需要打包的子仓库的文件
          // https://v4.webpack.docschina.org/configuration/externals/#externals
          if (request.includes('/config/index.js')) {
            return callback(null, 'require {}')
          } else if (request.includes('/routes.js')) {
            return callback(null, 'import []')
          } else {
            return callback(null, 'import {}')
          }
        }
      }

      // 继续下一步且不外部化引用
      callback()
    }
  }
}

module.exports = {
  on,
  getAvailableProjectNames,
  getBuildConfig,
  getAvailableNamesFromProjectConfig,
  getDevServer
}
