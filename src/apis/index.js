import service from '@/utils/request'

// 加载框架内的apis
const modulesFiles = require.context('./modules', true, /\.js$/)
// 加载app内的apis
const dynamicModulesFiles = require.context('../apps', true, /apis\/modules\/[a-zA-Z0-9-]+\.js/)

const apis = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)

  modules = {
    ...modules,
    ...value.default
  }

  return modules
}, {})

const appApis = dynamicModulesFiles.keys().reduce((modules, modulePath) => {
  const value = dynamicModulesFiles(modulePath)

  modules = {
    ...modules,
    ...value.default
  }

  return modules
}, {})

// 动态注入参数
Object.entries({ ...apis, ...appApis }).forEach(([apiName, api]) => {
  apis[apiName] = parameter => api(service, parameter)
})

export default apis
