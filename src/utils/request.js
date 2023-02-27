import axios from 'axios'
import config from '@/config'
import router from '@/router'
import store from '@/store'
import { showMessage } from '@/utils/message'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: config.timeout
})

// request interceptor
service.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.token = token
    }

    return config
  },
  error => {
    showMessage({
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
  async response => {
    const res = response.data

    if (res?.status || response.config.responseType === 'blob') {
      return Promise.resolve(res)
    }

    showMessage({
      message: res.message,
      type: 'error'
    })

    // 登录失效，需要重新登录
    if (+res.code === 30001) {
      await store.dispatch('login/clear')
      await router.replace({ name: 'login' })
    }

    return Promise.resolve({
      code: 0,
      status: false,
      data: res.data
    })
  },
  error => {
    showMessage({
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
