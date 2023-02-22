import axios from 'axios'
import config from '@/config'
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

    if (process.env.VUE_APP_PROJECT === 'development-client' || process.env.VUE_APP_PROJECT === 'production-client') {
      const companyId = localStorage.getItem('companyId')

      if (companyId) {
        config.headers.companyId = companyId
      }
    } else {
      const terminal = process.env.VUE_APP_PROJECT.match(/(?<=(-)).*/g)[0]
      const parkId = await require('@/store/' + terminal).default.state.login.userInfo.parkId

      if (parkId) {
        config.headers.parkId = parkId
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
      const terminal = process.env.VUE_APP_PROJECT.match(/(?<=(-)).*/g)[0]
      const store = await import('../store/' + terminal)
      const router = await import('../router/' + terminal)

      // if (process.env.VUE_APP_PROJECT === 'development-client' || process.env.VUE_APP_PROJECT === 'production-client') {
      //   store = await import('../store/client')
      // } else {
      //   store = await import('../store/manager')
      // }

      await store.default.dispatch('login/clear')
      await router.default.replace({ name: 'login' })
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
