const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name
const isDev = process.env.NODE_ENV !== 'production'
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

module.exports = {
  // 开发环境
  isDev,
  // 项目根目录
  PROJECT_PATH,
  // 项目名
  PROJECT_NAME,
  // host，默认localhost
  SERVER_HOST,
  // 端口，默认8080
  SERVER_PORT
}
