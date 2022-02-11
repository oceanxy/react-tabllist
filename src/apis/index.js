import service from '@/utils/request'
// import { Message } from 'element-ui'

const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动引入 './modules' 中的所有 api 模块
// 不再需要`import app from './modules/app'`
const apis = modulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const value = modulesFiles(modulePath)

  modules = {
    ...modules,
    ...value.default
  }

  return modules
}, {})

let messageOptions = []

const message = async option => {
  option.oldMessage = option.message

  if (!option.message) {
    option.message = '发生未知错误，清稍后再试！'
  } else if (
    option.message.includes('Network Error') ||
    option.message.includes('500')
  ) {
    option.message = '请检查网络或服务是否异常，或稍后再试！'
  } else if (option.message.includes('403')) {
    option.message = '没有权限进入系统！'
  } else if (option.message.includes('404')) {
    option.message = '请检查服务是否异常，或联系管理员处理！'
  } else if (option.message.includes('timeout')) {
    option.message = '连接超时，请稍后再试！'
  }

  messageOptions = messageOptions.filter(messageOption => !messageOption.closed)
  const unClosed = messageOptions.filter(messageOption => {
    return (
      !messageOption.closed && messageOption.oldMessage === option.oldMessage
    )
  })

  if (!unClosed.length) {
    messageOptions.push(option)
    // Message(option)
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')

    if (token) {
      config.headers.token = token
    }

    return config
  },
  error => {
    message({
      message: error.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res?.status) {
      return Promise.resolve(res)
    }

    message({
      message: res.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  },
  error => {
    message({
      message: error.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  }
)

// 动态注入参数
Object.entries(apis).forEach(([apiName, api]) => {
  apis[apiName] = parameter => api(service, parameter)
})

export default apis
