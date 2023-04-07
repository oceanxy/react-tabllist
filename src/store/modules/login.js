import apis from '@/apis'
import router from '@/router'
import JSEncrypt from 'jsencrypt'
import config from '@/config'
import { message } from 'ant-design-vue'

let encryptor

if (!encryptor) {
  encryptor = new JSEncrypt()
  encryptor.setPublicKey(config.publicKey)
}

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {},
    visibilityOfEditPassword: false,
    currentItem: {},
    codeKey: '',
    news: {
      loading: false,
      total: 0,
      userRefundMessageList: []
    }
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
        localStorage.setItem('defaultRoute', payload.defaultMenuUrl)
        localStorage.setItem('menu', JSON.stringify(payload.menuList))
      } else {
        localStorage.removeItem('defaultRoute')
        localStorage.removeItem('menu')
      }
    }
  },
  actions: {
    async login({ commit, state }, payload) {
      commit('setLoading', true)

      const response = await apis.login({
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
        localStorage.setItem('theme', userInfo.themeFileName || '')
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async logout({ commit, dispatch }) {
      message.loading('正在注销，请稍候...', 0)
      commit('setLoading', true)

      const response = await apis.logout()

      // if (response.status) {
      await dispatch('clear')
      message.destroy()
      await router.replace({ name: 'login' })
      // }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async getUserInfo({ commit }) {
      const response = await apis.getUserInfo()

      const { status, data } = response

      if (status) {
        commit('setUserInfo', data)
      }

      return Promise.resolve(true)
    },
    /**
     * 清除 store 和本地存储的信息
     * @param commit
     * @param isPassive {boolean} 是否是被动清除，除主动点击“注销”外的其他退出都是被动的
     * @returns {Promise<boolean>}
     */
    async clear({ commit }, isPassive) {
      commit('setUserInfo', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      if (!isPassive) {
        localStorage.removeItem('openKeys')
        localStorage.removeItem('selectedKey')
        localStorage.removeItem('theme')
      }

      return Promise.resolve(true)
    },
    async getCodeKey({ commit }) {
      const response = await apis.getCodeKey()

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
