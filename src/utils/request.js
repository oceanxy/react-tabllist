import axios from 'axios'
import conf from '@/config'
import router from '@/router'
import store from '@/store'
import { showMessage } from '@/utils/message'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: conf.timeout
})

// request interceptor
service.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.token = token
    }

    if (conf.headerParams?.show) {
      if (conf.headerParams.fieldName) {
        config.headers[conf.headerParams.fieldName] = localStorage.getItem('headerId')
      } else {
        throw new Error('未在 src/config/index.js 中配置 headerParams.fieldName 字段。')
      }
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
      // 检测是否已经跳转到login页面，避免多个接口同时报 30001，导致重复跳转到登录页
      if (localStorage.getItem('token')) {
        await store.dispatch('login/clear', true)
        await router.replace({ name: 'login' })
      }
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
