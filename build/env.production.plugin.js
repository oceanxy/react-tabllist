const { writeFile } = require('fs')
const { resolve, join } = require('path')

class EnvProductionPlugin {
  constructor(options = {}) {
    this.callback = options.callback
    this.appConfig = options.appConfig
    this.subDir = options.subDir
  }

  apply(compiler) {
    compiler.hooks.done.tap('configurableGatewaysAndCreateZip', compilation => {
      let ENV_PRODUCTION = this.appConfig.prodGateways?.filename

      if (ENV_PRODUCTION?.length) {
        if (!/.+\.json$/.test(ENV_PRODUCTION)) {
          ENV_PRODUCTION += '.json'
        }
      } else {
        ENV_PRODUCTION = 'env.production.json'
      }

      // 检测子项目是否存在需要加载的第三方文件，且该文件使用了环境变量，此时需要将该环境变量一并暴露出去
      let envVariables = []
      const regex = /^\{([A-Z0-9_]+)}$/

      // 寻找要加载的第三方文件中使用了环境变量的文件
      this.appConfig.loadFiles.forEach(item => {
        if (regex.test(item.host)) {
          // 获取需要暴露的环境变量
          envVariables.push(item.host.replace(regex, '$1'))
        }
      })

      // 去重
      envVariables = [...new Set(envVariables)]

      // 定义文件默认内容
      let fileStr = `{\n\t"VUE_APP_BASE_API": "${process.env.VUE_APP_BASE_API}"\n}`

      // 组装文件
      envVariables.forEach(env => {
        fileStr = fileStr.slice(0, -2) +
          `,\n\t"${env}": "${process.env[env]}"` +
          fileStr.slice(-2)
      })

      // 根据条件生成文件
      writeFile(
        // 注意此处的相对路径是 /build
        resolve(join(__dirname, `../dist${this.subDir ? `/${this.subDir}` : ''}`, ENV_PRODUCTION)),
        fileStr,
        error => {
          if (error) {
            console.warn(`${ENV_PRODUCTION} 生成失败，错误详情：${error}`)
          } else {
            // 执行回调
            this.callback?.()
          }
        }
      )
    })
  }
}

module.exports = EnvProductionPlugin
