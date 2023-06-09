/**
 * 启动/打包项目自定义配置。
 * 注意：在不清楚本项目的启动/打包逻辑时，为了避免出错，只需使用 --app-proj 即可，其他命令会根据改命令自动配置。
 * 命令行参数：
 *    --app-proj：格式为逗号分割的字符串，如：“appName1, appName2, ...”
 *      需要启动/打包的子项目名称（位于 src/apps，也可以是配置文件中的项目别称 appPrefix），
 *      当该命令携带的所有 appName 都不存在时，将自动配置全局配置文件中的 appPrefix 为 --app-pref 命令的值；
 *      当存在有效的 appName 时，打包模式将对每一个有效的子系统分别打包，开发模式只取第一个匹配到的值，其余值将被忽略。
 *    --app-mode：开发模式（dev）/生产模式（build）
 *    --app-pref：格式 字符串
 *      配置文件（src/config 或 apps/config）中 appPrefix 字段对应的项目别称。
 *      当存在该值时，将按照该值启动/打包所有匹配到的子项目，打包成一个整体。
 *    --app-separately： '1'：每个 appName/appPrefix 分别打包；'0'或其他值：统一打包。
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 15:36:04
 */

const rimraf = require('rimraf')
const path = require('path')
const child_process = require('child_process')
const { on, getAvailableProjectNames, getAvailableNamesFromProjectConfig } = require('./configs')
const args = require('minimist')(process.argv.slice(2))
const dotenv = require('dotenv')

function start() {
  let mode = ''

  if (Object.prototype.toString.call(args['app-mode']) === '[object String]' && args['app-mode'].length) {
    mode = args['app-mode']
  }

  const availableProjectNames = getAvailableProjectNames()

  let params

  // 没有带 --app-proj 参数时，自动根据全局配置文件读取所有可用项目
  if (!availableProjectNames.length) {
    params = getAvailableNamesFromProjectConfig()
  } else {
    params = availableProjectNames
  }

  if (mode === 'build') {
    build(params)
  } else {
    dev(params)
  }
}

function dev(params) {
  const { appPrefix, availableProjectNames } = params?.[0] ?? {}

  if (availableProjectNames?.length) {
    try {
      // 如果有多个子项目的appPrefix值都为顶级config的指定值，将将这些项目同时启动
      if (appPrefix) {
        on(
          child_process.exec(
            `vue-cli-service serve --app-pref ${appPrefix} --app-proj ${availableProjectNames.join(',')}`)
        )
      } else {
        dotenv.config({ path: `src/apps/${availableProjectNames[0]}/config/.env.development` })

        // 未找到有效的 appName，将采用顶级config的appPrefix指定的项目为启动项目
        on(child_process.exec(`vue-cli-service serve --app-proj ${availableProjectNames[0]}`))
      }
    } catch (err) {
      throw new Error(err)
    }
  } else {
    throw new Error(`请确保 src/apps 下存在有效的子系统（${availableProjectNames[0]}），appPrefix：${appPrefix}！`)
  }
}

function build(params) {
  const separately = params.length > 1 ? '1' : '0'

  try {
    rimraf(path.join(__dirname, '..', 'dist')).then(() => {
      params.forEach(async (p, i) => {
        const { appPrefix, availableProjectNames } = p || {}

        if (availableProjectNames.length) {
          // 存在 appPrefix ，则将 availableProjectNames 的所有 app 同时打包
          if (appPrefix) {
            on(
              child_process.exec(
                // eslint-disable-next-line max-len
                `vue-cli-service build --app-pref ${appPrefix} --app-proj ${availableProjectNames.join(',')} --app-separately ${separately}`
              ),
              i + 1,
              appPrefix
            )
          } else {
            dotenv.config({ path: `src/apps/${availableProjectNames[0]}/config/.env.development` })

            // 不存在 appPrefix，则取 availableProjectNames[0] 打包
            on(
              child_process.exec(
                `vue-cli-service build --app-proj ${availableProjectNames[0]} --app-separately ${separately}`
              ),
              i + 1,
              availableProjectNames[0]
            )
          }
        } else {
          throw new Error(`请确保 src/apps 下存在有效的子系统（${availableProjectNames[0]}），appPrefix：${appPrefix}！`)
        }
      })
    })
  } catch (err) {
    throw new Error(err)
  }
}

start()
