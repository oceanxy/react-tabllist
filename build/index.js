/**
 * 开发/打包项目自定义配置。
 * 注意：在不清楚本项目的启动/打包逻辑时，为了避免出错，只需使用 --app-proj 即可，其他命令会根据该命令自动配置。
 * 命令行参数：
 *    --app-proj：格式为逗号分割的字符串，如：“appName1, appName2, ...”
 *      需要执行的子项目名称（位于 src/apps，也可以是配置文件中的项目别称 appPrefix），
 *      当该命令携带的所有 appName 都不存在时，将自动配置全局配置文件中的 appPrefix 为 --app-pref 命令的值；
 *      当存在有效的 appName 时，打包模式将对每一个有效的子系统分别打包，开发模式只取第一个匹配到的值，其余值将被忽略。
 *    --app-pref：格式 字符串
 *      配置文件（src/config 或 apps/config）中 appPrefix 字段对应的项目别称。
 *      当存在该值时，将按照该值执行所有匹配到的子项目。
 *    --app-sub：打包文件路径，默认dist。传递值时，将在 dist 下创建该文件夹，用于存放打包文件。
 *      当 app-proj 传递了多个值时，该值将被项目名称替换。
 *    --app-mode：开发模式（dev）/生产模式（build），默认 build。
 *    --app-env: 生产模式（build）对应的不同环境，默认 production（生产环境）。可选值：
 *      -  developmentProd（用于部署到开发环境以供测试等人员访问，非本地开发环境）
 *      -  parallel（并行环境）
 *      -  integration（集成环境）
 *      -  stage（生产模拟环境）
 *      -  production（生产环境）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 15:36:04
 */

const rimraf = require('rimraf')
const path = require('path')
const child_process = require('child_process')
const dotenv = require('dotenv')
const { on } = require('./webpackConfigs.js')
const {
  mode,
  availableProjectNames: apns,
  env,
  subDir
} = require('./params.js')

if (mode === 'build') {
  build()
} else {
  dev()
}

function dev() {
  try {
    // 如果有多个子项目，则取数组第一个值
    dotenv.config({ path: `src/apps/${apns[0]}/config/.env.development` })

    // 未找到有效的 appName，将采用顶级config的appPrefix指定的项目为启动项目
    on(child_process.exec(`vue-cli-service serve --app-proj ${apns[0]}`))
  } catch (err) {
    throw new Error(err)
  }
}

function build() {
  let _apns = apns

  if (!Array.isArray(_apns)) {
    _apns = [apns]
  }

  try {
    rimraf(path.join(__dirname, '..', 'dist')).then(() => {
      _apns.forEach(async (apn, index) => {
        const _env = dotenv.config({ path: `src/apps/${apn}/config/.env.${env}` })
        const _subDir = subDir.replace('{availableProjectNames}', apns[index])

        on(
          child_process.exec(`vue-cli-service build --app-proj ${apn} --app-sub ${_subDir}`, { env: _env.parsed }),
          index + 1,
          apns.length
        )
      })
    })
  } catch (err) {
    throw new Error(err)
  }
}
