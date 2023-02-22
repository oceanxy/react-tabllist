import Mock from 'mockjs'
import appConfig from '../src/config'

const URL = require('url')

Mock.setup({ timeout: appConfig.mockDelay })
const { mock } = Mock

const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动引入 './modules' 中的所有模块
// 不再需要`import app from './modules/app'`
const mockModule = modulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const value = modulesFiles(modulePath)

  let newModules = {}

  if (modulePath.includes('/manager') || modulePath.includes('/client')) {
    Object.entries(value.default).forEach(([key, value]) => {
      newModules[process.env.VUE_APP_BASE_API + key] = value
    })
  } else {
    newModules = value.default
  }

  modules = {
    ...modules,
    ...newModules
  }

  return modules
}, {})

// 注册需要被 mock js 拦截的接口
export default Object.entries(mockModule).map(([modelKey, mockModel]) => {
  // 把接口地址中的"/"替换为转义字符“\/”
  const url = modelKey.replaceAll('/', '\\/')

  mock(new RegExp(`${url}(|\\?\\S*)$`), options => {
    const printOptions = { ...options }

    if (printOptions.body?.includes('&')) {
      printOptions.body = URL.parse(`?${printOptions.body}`, true).query
    } else {
      printOptions.body = JSON.parse(printOptions.body)
    }

    let response

    if (typeof mockModel === 'function') {
      response = mock(mockModel(printOptions))
    } else {
      response = mock(mockModel)
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('request：', printOptions)
      console.log('response:', response)
    }

    return response
  })
})
