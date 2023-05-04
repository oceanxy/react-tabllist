import { merge } from 'lodash'
import _conf from './config'

// 获取所有子系统的配置文件
const appConfigFiles = require.context('../apps', true, /config\/index.js$/)
// 读取子系统的配置文件，
// 如果子系统不存在配置文件，则取 src/config 为项目的配置文件，
// 如果多个子系统的config中都存在相同值的appPrefix字段，则取最先遍历到config为项目最终使用的配置文件。
// todo 后面可能改成把所有查找到的带有相同appPrefix值的配置文件合并。
let config = {}
// 如果子系统不存在配置文件，则 appName 取 ''，
// 如果多个子系统的config中都存在相同值的appPrefix字段，则取最先遍历到的项
// todo 后期可能改成将具有相同值appPrefix值的路由合并
let appName = ''

for (const item of appConfigFiles.keys()) {
  if (_conf.appPrefix === appConfigFiles(item).appPrefix) {
    config = appConfigFiles(item)
    appName = item.split('/')[1]
    break
  }
}

export default merge(_conf, config, { appName })
