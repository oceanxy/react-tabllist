/**
 * 启动/打包项目自定义配置。
 * 注意：在不清楚本项目的启动/打包逻辑时，为了避免出错，只需使用 --app-proj 即可，其他两个命令会根据改命令自动配置。
 * 命令行参数：
 *    --app-proj：格式为逗号分割的字符串，如：“appName1, appName2, ...”
 *      需要打包的子项目名称（位于 src/apps，也可以是项目别称appPrefix），当该命令携带的所有 appName 都不存在时，将自动配置 --app-pref 命令；
 *      当存在有效的 appName 时，打包模式将对每一个有效的子系统分别打包，开发模式只取第一个匹配到的值，其余值将被忽略。
 *    --app-mode：开发模式（dev）/生产模式（build）
 *    --app-pref：格式 字符串
 *      配置文件（src/config）中 appPrefix 字段对应的项目别称。当存在该值时，将按照该值启动/打包所有匹配到的子项目，打包成一个整体。
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 15:36:04
 */

const rimraf = require('rimraf')
const path = require('path')
const child_process = require('child_process')
const { getAvailableProjectNames } = require('./configs')
const { getAvailableNamesFromProjectConfig } = require('./configs')
const args = require('minimist')(process.argv.slice(2))

function start() {
  let mode = ''

  if (Object.prototype.toString.call(args['app-mode']) === '[object String]' && args['app-mode'].length) {
    mode = args['app-mode']
  }

  const availableProjectNames = getAvailableProjectNames()
  let params

  if (!availableProjectNames.length) {
    params = getAvailableNamesFromProjectConfig()
  } else {
    params = { appPrefix: null, availableProjectNames }
  }

  if (mode === 'build') {
    build(params)
  } else {
    dev(params)
  }
}

function dev({ appPrefix, availableProjectNames }) {
  if (availableProjectNames.length) {
    try {
      // 未找到有效的 appName，将采用顶级config的appPrefix指定的项目为打包项目
      // 如果有多个项目的appPrefix都为顶级config的指定值，将把这些项目同时打包
      if (appPrefix) {
        on.call('启动：', child_process.exec(
          `vue-cli-service serve --app-pref ${appPrefix} --app-proj ${availableProjectNames.join(',')}`)
        )
      } else {
        on.call('启动：', child_process.exec(`vue-cli-service serve --app-proj ${availableProjectNames[0]}`))
      }
    } catch (err) {
      throw new Error(err)
    }
  } else {
    throw new Error('未找到可以打包的文件，请确保 src/apps 下存在有效的子系统！')
  }
}

async function build({ appPrefix, availableProjectNames }) {
  if (availableProjectNames.length) {
    try {
      await rimraf(path.join(__dirname, '..', 'dist'))

      // 未找到有效的 appName，将采用顶级config的appPrefix指定的项目为打包项目
      // 如果有多个项目的appPrefix都为顶级config的指定值，将把这些项目同时打包
      if (appPrefix) {
        on.call('打包：', child_process.exec(
          `vue-cli-service build --app-pref ${appPrefix} --app-proj ${availableProjectNames.join(',')}`
        ))
      } else {
        availableProjectNames.forEach((filepath, index) => {
          console.info(`正在打包第 ${index + 1}/${availableProjectNames.length} 个APP(${filepath})...`)

          on.call('打包：', child_process.exec(`vue-cli-service build --app-proj ${filepath}`), index + 1, filepath)
        })
      }
    } catch (err) {
      throw new Error(err)
    }
  } else {
    throw new Error('未找到可以打包的文件，请确保 src/apps 下存在有效的子系统！')
  }
}

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

start()
