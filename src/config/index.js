import { merge } from 'lodash'
import _conf from './config'

const appConfigFiles = require.context('../apps', true, /config\/index.js$/) // 获取所有子系统的配置文件
let config = {}

for (const item of appConfigFiles.keys()) {
  // 读取子系统的配置文件，
  // 如果子系统不存在配置文件，则取 src/config 为项目的配置文件，
  // 如果多个子系统的config中都存在相同值的appPrefix字段，则取最先遍历到config为项目最终使用的配置文件。
  if (_conf.appPrefix === appConfigFiles(item).appPrefix) {
    config = appConfigFiles(item)
    break
  }
}

export default merge(_conf, config)
