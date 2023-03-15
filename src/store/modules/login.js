import apis from '@/apis'
import router from '@/router'
import JSEncrypt from 'jsencrypt'
import config from '@/config'

let encryptor

if (!encryptor) {
  encryptor = new JSEncrypt()
  encryptor.setPublicKey(config.publicKey)
}

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {
      parkId: '',
      parkName: '',
      fullName: '',
      id: ''
    },
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
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async logout({ commit, dispatch }) {
      commit('setLoading', true)

      const response = await apis.logout()

      // if (response.status) {
      await dispatch('clear')
      await router.replace({ name: 'login' })
      // }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async clear({ commit }) {
      commit('setUserInfo', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

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
