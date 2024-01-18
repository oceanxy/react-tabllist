/**
 * 编译/打包需要的配置
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 14:19:41
 */

const args = require('minimist')(process.argv.slice(2))

let done = 0
const {
  availableProjectNames: apns,
  appConfig,
  subDir,
  files
} = require('./params.js')

/**
 * 监听子进程
 * @param workerProcess 子进程
 * @param [ordinal] {number} 子项目索引
 * @param [total] {number} - 子项目总数
 */
function on(workerProcess, ordinal, total) {
  const _subDir = subDir.replace('{availableProjectNames}', apns[ordinal - 1])

  workerProcess.stdout.on('data', function(data) {
    if (data.replace(/\+/g, '').replace(/[\r\n]/g, '')) {
      if (ordinal) {
        console.info(`${_subDir} ${data}`)
      } else {
        console.info(data)
      }
    }
  })

  workerProcess.stderr.on('data', function(data) {
    if (ordinal) {
      console.info(`${_subDir} ${data}`)
    } else {
      console.info(data)
    }
  })

  workerProcess.on('close', function(code) {
    done += 1

    if (ordinal) {
      if (total > 1) {
        console.info(`${_subDir} 已打包完成 (${done}/${total})`)
      } else {
        console.info(`${_subDir} 已打包完成，退出码：${code}`)
      }
    }
  })
}

function getDevServer() {
  return require(`../src/apps/${apns}/config/devServer.js`)
}

function getBuildConfig() {
  const externals = []
  let projectNames = ''

  if (Object.prototype.toString.call(args['app-proj']) === '[object String]' && args['app-proj'].length) {
    projectNames = args['app-proj'].split(' ')
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
      ...appConfig[projectNames].theme.availableThemes.reduce((themes, cur) => {
        themes[cur.fileName] = `src/assets/styles/themes/${cur.fileName}`

        return themes
      }, {})
    }
  } else {
    config.pages = { index: 'src/main.js' }
  }

  if (subDir) {
    // 多个项目同时打包时，在“dist/”下按项目名称创建打包文件夹
    config.outputDir = `dist/${subDir}`
  }

  /**
   * 剔除其他不需要打包的子项目文件
   */
  files.forEach(filepath => {
    const name = filepath.split('/').at(-3)

    if (projectNames[0].indexOf(name) === -1 || projectNames[0] !== name) {
      externals.push(name)
    }
  })

  return {
    config,
    projectNames,
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
  getBuildConfig,
  getDevServer
}
