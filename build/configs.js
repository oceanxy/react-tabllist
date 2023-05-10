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

/**
 * 打包时使用“--app-proj appName1,appName2,...”指令可对指定的 app 分别打包，逗号分割 appName,
 * 不带或无效的 appName 将对整体项目打包
 * @returns {*[]}
 */
function getAvailableProjectNames() {
  let projectNames = []

  if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
    projectNames = args['app-proj'].split(',')
  }

  const temp = []

  // 初始化所有可以打包的 apps 的打包信息
  if (projectNames?.length) {
    const files = glob.sync('src/apps/*/config/index.js') // 获取所有匹配文件的文件名数组

    files.forEach(filepath => {
      // 取 /apps 下面的文件夹做包名
      const name = filepath.split('/').at(-3)

      if (projectNames.indexOf(name) > -1) {
        temp.push(name)
      } else {
        // app-proj 带的参数是 src/apps/config 中配置的别名（appPrefix 的值）

        const data = readFileSync(resolve(filepath), 'utf-8')

        // 读取子系统的配置文件，
        // 如果子系统不存在配置文件，则取 src/config 为项目的配置文件，
        // 如果多个子系统的config中都存在相同值的appPrefix字段，则取最先遍历到config为项目最终使用的配置文件。
        if (projectNames.indexOf(data.match(/appPrefix:\s?'([a-zA-Z0-9]+)'/)[1]) > -1) {
          temp.push(name)
        }
      }
    })
  }

  return temp
}

function getAvailableNamesFromProjectConfig() {
  const files = glob.sync('src/apps/*/config/index.js')
  const temp = []

  files.forEach(filepath => {
    const data = readFileSync(resolve(filepath), 'utf-8')

    if (projConfig.appPrefix === data.match(/appPrefix:\s?'([a-zA-Z0-9]+)'/)[1]) {
      temp.push(filepath.split('/').at(-3))
    }
  })

  return {
    appPrefix: projConfig.appPrefix,
    availableProjectNames: temp
  }
}

function getBuildConfig() {
  const files = glob.sync('src/apps/*/config/index.js')
  let availableProjectNames = []
  let appPrefix = ''
  const externals = []

  if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
    availableProjectNames = args['app-proj'].split(',')
  }

  if (Object.prototype.toString.call(args['app-pref']) === '[object String]') {
    appPrefix = args['app-pref']
  }

  let config = {}

  if (appPrefix) {
    files.forEach(filepath => {
      const name = filepath.split('/').at(-3)

      if (availableProjectNames.indexOf(name) === -1) {
        externals.push(name)
      }
    })
  } else {
    if (availableProjectNames.length) {
      files.forEach(filepath => {
        const name = filepath.split('/').at(-3)

        if (availableProjectNames[0] !== name) {
          externals.push(name)
        }
      })

      // app 独立打包
      config = {
        pages: {
          index: {
            entry: `src/apps/${availableProjectNames[0]}/main.js`
            // title: '',
            // chunks: [availableProjectNames[0], 'chunk-vendors', 'chunk-common']
          }
        },
        outputDir: `dist/${availableProjectNames[0]}`
      }
    }
  }

  return {
    config,
    appPrefix,
    availableProjectName: availableProjectNames[0],
    externals(context, request, callback) {
      for (const external of externals) {
        if (
          typeof context === 'string' && context.includes('apps') &&
          typeof request === 'string' && request.includes(external)
        ) {
          // 排除 src/apps 下不需要打包的子仓库，为了防止报错，这些被 webpack 排除打包的文件的引用全部用404页面来代替（可以理解成
          // 占位符，并无实际意义，也不会在系统中出现）
          return callback(null, 'import src/views/NotFound')
        }
      }

      // 继续下一步且不外部化引用
      callback()
    }
  }
}

module.exports = { getAvailableProjectNames, getBuildConfig, getAvailableNamesFromProjectConfig }
