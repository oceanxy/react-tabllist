import config from './config'

// 读取子系统的配置文件，
// 如果子系统不存在配置文件，则取全局配置文件（src/config/config）为项目的配置文件，

// APP_CONFIG 来自 webpack 全局注入的当前子系统配置文件
export default Object.assign(config, APP_CONFIG)
