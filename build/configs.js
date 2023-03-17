/**
 * 编译/打包需要的配置
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-24 周五 14:19:41
 */

const glob = require('glob')

function getAvailableProjectNames() {
  let projectNames = []

  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i].includes('--')) {
      if (process.argv[i] === '--proj') {
        projectNames = process.argv.slice(i + 1)
      } else {
        projectNames = projectNames.slice(0, i)
      }
    }
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
