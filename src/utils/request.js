import axios from 'axios'
import { showMessage } from '@/utils/message'

export default function getService(conf, router, store) {
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

      config.data = INTERFACE_MAPPINGS?.request(config.data) ?? config.data

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
      const res = INTERFACE_MAPPINGS?.response(response.data) ?? response.data

      if (res?.status || response.config.responseType === 'blob') {
        return Promise.resolve(res)
      }

      if (!('status' in res)) {
        if (res.code !== 200) {
          showMessage({
            message: '第三方接口调用失败！',
            type: 'error'
          })
        } else {
          return Promise.resolve({
            code: 10000,
            status: true,
            data: res.data
          })
        }
      } else {
        showMessage({
          message: res.message,
          type: 'error'
        })
      }

      // 未登录或登录失效，需要重新登录
      if (+res.code === 30001) {
        if (localStorage.getItem('token')) {
          await store.dispatch('login/clear', true)
        }

        await router.replace({ name: 'login' })
      } else if (/*无权限*/+res.code === 40006) {
        await router.replace({ name: 'noAccess' })
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

  return service
}
