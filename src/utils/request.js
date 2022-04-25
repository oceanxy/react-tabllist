import axios from 'axios'
import config from '@/config'
import message from '@/utils/message'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: config.timeout
})

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
    message.showMessage({
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

    message.showMessage({
      message: res.message,
      type: 'error'
    })

    // 登录失效，需要重新登录
    if (+res.code === 30001) {
      store.dispatch('login/clear')
    }

    return Promise.resolve({
      code: 0,
      status: false
    })
  },
  error => {
    message.showMessage({
      message: error.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  }
)

export default service
