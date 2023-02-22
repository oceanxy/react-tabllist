import apis from '@/apis'
import router from '@/router/manager'
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
    parkList: [],
    visibilityOfEditPassword: false,
    currentItem: {}
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setParkList(state, payload) {
      state.parkList = payload || []
    },
    setParkInfo(state, payload) {
      state.userInfo = {
        ...state.userInfo,
        parkId: payload.id,
        parkName: payload.fullName
      }
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
        localStorage.setItem('parkList', JSON.stringify(payload.parkList))
      } else {
        localStorage.removeItem('defaultRoute')
        localStorage.removeItem('menu')
        localStorage.removeItem('parkList')
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
        vck: payload.picCode
      })

      const { status } = response

      if (status) {
        const {
          userInfo, token, menuList, defaultMenuUrl, parkList
        } = response.data

        commit('setUserInfo', userInfo)
        commit('setParkList', parkList)
        commit('setAuthentication', token)
        commit('setSiteCache', {
          menuList,
          defaultMenuUrl,
          parkList
        })
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
      commit('setParkList', [])
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      return Promise.resolve(true)
    },
    async switchEnt({
      dispatch, commit, state
    }, payload) {
      commit('setParkInfo', payload)
      window.location.reload()
    }
  }
}
