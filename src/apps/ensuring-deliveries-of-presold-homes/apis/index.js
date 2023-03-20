import service from '@/utils/request'

const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动引入 './modules' 中的所有 api 模块
const apis = modulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const value = modulesFiles(modulePath)

  modules = {
    ...modules,
    ...value.default
  }

  return modules
}, {})

// 动态注入参数
Object.entries(apis).forEach(([apiName, api]) => {
  apis[apiName] = parameter => api(service, parameter)
})

export default apis
