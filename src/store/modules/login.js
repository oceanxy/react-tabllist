import JSEncrypt from 'jsencrypt'
import config from '@/config'
import { message } from 'ant-design-vue'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {},
    visibilityOfEditPassword: false,
    currentItem: {},
    codeKey: ''
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setAuthentication(state, payload) {
      if (payload) {
        localStorage.setItem('token', payload)
      } else {
        localStorage.removeItem('token')
      }
    },
    setSiteCache(state, payload) {
      if (payload) {
        localStorage.setItem('defaultRoute', payload.defaultMenuUrl || '')
        localStorage.setItem('menu', JSON.stringify(payload.menuList))
      } else {
        localStorage.removeItem('defaultRoute')
        localStorage.removeItem('menu')
      }
    }
  },
  actions: {
    async jump({ state }) {
      router.resetRoutes()

      // 检测query参数是否存在重定向
      const { redirect, ...query } = router.history.current.query
      // 检测本地存储是否存在保存的路由（意外退出的路由），如果有，则在登录成功后直接跳转到该路由
      const path = localStorage.getItem('selectedKey')

      if (redirect) {
        await router.replace({ path: `${redirect}`, query })
      } else if (path) {
        await router.replace(path)
      } else {
        await router.replace({ name: 'home' })
      }

      const userTheme = localStorage.getItem('theme') ||
        state?.login?.userInfo?.themeFileName ||
        config.theme.default

      if (userTheme !== window.themeVariables.themeFileName) {
        window.location.reload() // to switch theme
      }
    },
    async login(
      {
        commit,
        state,
        dispatch
      },
      options
    ) {
      commit('setLoading', true)

      const { payload, config } = options
      const encryptor = new JSEncrypt()

      encryptor.setPublicKey(config.publicKey)

      const response = await this.apis.login({
        up: encryptor.encrypt(
          JSON.stringify({
            u: payload.username,
            p: payload.password
          })
        ),
        vck: payload.picCode,
        verifyCodeKey: state.codeKey
      })

      const { status } = response

      if (status) {
        const {
          userInfo,
          token,
          menuList,
          defaultMenuUrl
        } = response.data

        commit('setUserInfo', userInfo)
        commit('setAuthentication', token)
        commit('setSiteCache', { menuList, defaultMenuUrl })
        localStorage.setItem('theme', userInfo.themeFileName || config.theme.default)

        dispatch('setParamsUseInHeader')
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async logout({ commit, dispatch }) {
      message.loading('正在注销，请稍候...', 0)
      commit('setLoading', true)

      const response = await this.apis.logout()

      // if (response.status) {
      dispatch('clear')
      message.destroy()
      // }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async getUserInfo({ commit, dispatch }, payload) {
      commit('setLoading', true)

      const response = await this.apis.getUserInfo(payload)
      const status = response.status

      if (status) {
        let userInfo

        if (USER_INFO_MAPPINGS) {
          // 适配非蓝桥后端框架的用户信息返回体
          const userInfoResponseData = USER_INFO_MAPPINGS.mapping(response.data)

          userInfo = userInfoResponseData.userInfo
          const menuList = userInfoResponseData.menuList
          const defaultMenuUrl = userInfoResponseData.defaultMenuUrl

          if (menuList) {
            commit('setSiteCache', { menuList, defaultMenuUrl })
          }
        } else {
          userInfo = response.data
        }

        commit('setAuthentication', payload.token)
        commit('setUserInfo', userInfo)
        localStorage.setItem('theme', userInfo.themeFileName || config.theme.default)

        dispatch('setParamsUseInHeader')
      }

      commit('setLoading', false)

      return Promise.resolve(status)
    },
    /**
     * 设置Header内需要使用的参数
     */
    setParamsUseInHeader({ state, commit }) {
      if (config.headerParams?.show) {
        localStorage.setItem('headerId', state.userInfo.organId || '')

        commit('setState', {
          value: state.userInfo.organId,
          stateName: 'headerId',
          moduleName: 'common'
        }, { root: true })

        commit('setState', {
          value: { list: state.userInfo.organList },
          stateName: 'organListForHeader',
          moduleName: 'common',
          merge: true
        }, { root: true })
      }
    },
    /**
     * 清除 store 和本地存储的信息
     * @param commit
     * @param [isPassive=false] {boolean} 是否是被动清除，除主动点击“注销”外的其他退出都是被动的
     * @returns {Promise<boolean>}
     */
    async clear({ commit }, isPassive) {
      commit('setUserInfo', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      // 主动注销
      if (!isPassive) {
        localStorage.removeItem('openKeys')
        localStorage.removeItem('selectedKey')
        localStorage.setItem('theme', config.theme.default)

        if (config.headerParams?.show) {
          localStorage.removeItem('headerId')

          commit('setState', {
            value: undefined,
            stateName: 'headerId',
            moduleName: 'common'
          }, { root: true })

          commit('setState', {
            value: { list: [] },
            stateName: 'organListForHeader',
            moduleName: 'common',
            merge: true
          }, { root: true })
        }
      }

      return Promise.resolve(true)
    },
    async getCodeKey({ commit }) {
      const response = await this.apis.getCodeKey()

      if (response.status) {
        commit('setState', {
          value: response.data,
          moduleName: 'login',
          stateName: 'codeKey'
        }, { root: true })
      } else {
        commit('setState', {
          value: '',
          moduleName: 'login',
          stateName: 'codeKey'
        }, { root: true })
      }
    }
  }
}
