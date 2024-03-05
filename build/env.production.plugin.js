const {writeFile} = require('fs')
const {resolve, join} = require('path')

/**
 * 生成 .env.production 文件
 */
class EnvProductionPlugin {
  /**
   * 构造函数
   * @param options
   */
  constructor(options = {}) {
    this.callback = options.callback
    this.appConfig = options.appConfig
    this.subDir = options.subDir
  }

  /**
   * 环境变量值中包含“#”号时，需要将变量值加上引号来将其转义。“#”号会导致环境变量值被截断
   * @param envVar
   * @return {string}
   */
  hasHashtag(envVar) {
    return envVar.includes('#') ? `'${envVar}'` : envVar
  }

  /**
   * 生成文件内容
   * @return {string}
   */
  generateFileContent() {
    // 检测子项目是否存在需要加载的第三方文件，如果该文件使用了环境变量，此时需要将该环境变量一并暴露出去
    let envVariables = this.appConfig.prodEnvVar?.envVars ?? []
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
    let fileStr = `VUE_APP_ENV=${this.hasHashtag(process.env.VUE_APP_ENV)}\r\n`

    // 组装文件
    envVariables.forEach(env => {
      fileStr += `${env}=${this.hasHashtag(process.env[env])}\r\n`
    })

    return fileStr
  }

  /**
   * 获取文件名
   * @return {string}
   */
  getFileName() {
    let ENV_PRODUCTION = this.appConfig.prodEnvVar?.filename

    if (ENV_PRODUCTION?.length) {
      if (!/^\.env(\.[a-z0-9]+)*$/.test(ENV_PRODUCTION)) {
        ENV_PRODUCTION = '.env.' + ENV_PRODUCTION
      }
    } else {
      ENV_PRODUCTION = '.env.production'
    }

    return ENV_PRODUCTION
  }

  /**
   * 写文件
   * @param filename
   * @param fileStr
   * @private
   */
  _writeFile(filename, fileStr) {
    // 根据条件生成文件
    writeFile(
      // 注意此处的相对路径是 /build
      resolve(join(__dirname, `../dist${this.subDir ? `/${this.subDir}` : ''}`, filename)),
      fileStr,
      error => {
        if (error) {
          console.warn(`${filename} 生成失败，错误详情：${error}`)
        } else {
          // 执行回调
          this.callback?.()
        }
      }
    )
  }

  /**
   * 插件应用
   * @param compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap('configurableGatewaysAndCreateZip', compilation => {
      const filename = this.getFileName()
      const fileStr = this.generateFileContent()

      this._writeFile(filename, fileStr)
    })
  }
}

module.exports = EnvProductionPlugin
