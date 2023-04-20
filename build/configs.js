/**
 * 编译/打包需要的配置
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 14:19:41
 */

const glob = require('glob')
const args = require('minimist')(process.argv.slice(2))

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
    const files = glob.sync('src/apps/*/main.js') // 获取所有匹配文件的文件名数组

    files.forEach(filepath => {
      // 取 /apps 下面的文件夹做包名
      const split = filepath.split('/')
      const name = split[split.length - 2]

      // 在 /apps 目录下寻找 process.argv 携带的参数是否存在
      const index = projectNames.indexOf(name)

      if (index > -1) {
        temp.push(name)
      }
    })
  }

  return temp
}

module.exports = { getAvailableProjectNames }
