const glob = require('glob')
const files = glob.sync('src/apps/*/config/index.js') // 获取所有匹配文件的文件名数组
const { resolve } = require('path')
const { merge } = require('lodash')
const args = require('minimist')(process.argv.slice(2))
const globalConfig = require(resolve(__dirname, '../src/config/config.js'))

let projectNames = []
let subDir = ''
let appPrefix = ''
const appConfig = {}
let mode = 'build'
let env = 'production'
const availableProjectNames = []

if (Object.prototype.toString.call(args['app-mode']) === '[object String]' && args['app-mode'].length) {
  mode = args['app-mode']
}

if (Object.prototype.toString.call(args['app-env']) === '[object String]' && args['app-env'].length) {
  if (['parallel', 'integration', 'stage', 'production'].includes(args['app-env'])) {
    env = args['app-env']
  }
}

if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
  projectNames = args['app-proj'].split(' ')
}

// 若传递了 app-proj 则忽略 app-pref
// 若为传递 app-proj 则检测 app-pref，根据该值去获取符合的子项目名
if (!projectNames.length) {
  if (Object.prototype.toString.call(args['app-pref']) === '[object String]' && args['app-pref'].length) {
    appPrefix = args['app-pref']
  } else {
    appPrefix = globalConfig.appPrefix
  }

  if (appPrefix) {
    for (const filepath of files) {
      // 获取文件地址中的 appName
      const appName = filepath.split('/').at(-3)
      // 读取配置文件
      const _appConfig = require(resolve(__dirname, `../src/apps/${appName}/config/index.js`))

      if (_appConfig.appPrefix === appPrefix) {
        availableProjectNames.push(appName)
        appConfig[appName] = merge(globalConfig, _appConfig)
      }
    }
  }
} else {
  appPrefix = ''

  projectNames.forEach(projectName => {
    const _appConfig = require(resolve(__dirname, `../src/apps/${projectName}/config/index.js`))

    availableProjectNames.push(projectName)
    appConfig[projectName] = merge(globalConfig, _appConfig)
  })
}

// 合法值检测
if (!availableProjectNames.length && !appPrefix) {
  const globalConfig = require(resolve(__dirname, '../src/config/config.js'))

  if (globalConfig.appPrefix) {
    appPrefix = globalConfig.appPrefix
  } else {
    throw new Error('未检测到可以打包的项目名称或项目前缀。' +
      '如需打包项目，请使用 --app-proj 指令指定项目名称，多个项目使用逗号分割。' +
      '如果该指令无合法值，则获取 --app-pref 指令的值，' +
      '如：--app-pref app，将分别打包所有子项目配置文件中 appPrefix 值为 "app" 的项目，' +
      '默认全局配置文件中的 appPrefix 值。')
  }
} else {
  if (availableProjectNames.length > 1) {
    subDir = '{availableProjectNames}'
  } else if (Object.prototype.toString.call(args['app-sub']) === '[object String]' && args['app-sub'].length) {
    subDir = args['app-sub']
  }
}

module.exports = {
  availableProjectNames,
  appPrefix,
  appConfig,
  mode,
  env,
  subDir,
  files
}
