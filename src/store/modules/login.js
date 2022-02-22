import apis from '@/apis'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {
      username: '',
      id: ''
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
        sessionStorage.setItem('token', payload)
      } else {
        sessionStorage.removeItem('token')
      }
    }
  },
  actions: {
    async login({ commit, state }, payload) {
      commit('setLoading', true)

      const response = await apis.login(payload)

      if (response.status) {
        commit('setUserInfo', response.data.userInfo)
        commit('setAuthentication', response.data.token)

        await router.replace({ name: 'home' })
      }

      commit('setLoading', false)
    },
    async logout({ commit }) {
      commit('setLoading', true)

      const response = await apis.logout()

      if (response.status) {
        commit('setUserInfo', {})
        commit('setAuthentication', null)

        await router.replace({ name: 'login' })
      }

      commit('setLoading', false)
    }
  }
}
