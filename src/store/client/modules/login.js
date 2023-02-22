import apis from '@/apis'
import router from '@/router/client'
import JSEncrypt from 'jsencrypt'
import config from '@/config'

let encryptor

if (!encryptor) {
  encryptor = new JSEncrypt()
  encryptor.setPublicKey(config.publicKeyClient)
}

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {
      fullName: '',
      id: ''
    },
    companyList: []
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
    setCompanyId(state, payload) {
      if (payload) {
        localStorage.setItem('companyId', payload)
      } else {
        localStorage.removeItem('companyId')
      }
    },
    setCompanyList(state, payload) {
      if (payload) {
        state.companyList = payload
        localStorage.setItem('companyList', JSON.stringify(payload))
      } else {
        localStorage.removeItem('companyList')
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
  getters: {
    getCompanyList(state) {
      if (state.companyList) {
        return state.companyList
      }

      const companyList = window.localStorage.getItem('companyList')

      if (companyList) {
        const list = JSON.parse(companyList)

        state.companyList = list
      }

      return state.companyList
    }
  },
  actions: {
    async login({
      commit, state, dispatch
    }, payload) {
      commit('setLoading', true)
      const response = await apis.login({
        up: encryptor.encrypt(
          JSON.stringify({
            u: payload.username,
            p: payload.password
          })
        ),
        vc: payload.picCode
      })

      const { status } = response

      commit('setLoading', false)

      if (status) {
        const {
          userInfo, token, companyList
        } = response.data

        commit('setUserInfo', userInfo)
        commit('setAuthentication', token)
        commit('setCompanyList', companyList)
        // commit('setSiteCache', {
        //   menuList: menuList,
        //   defaultMenuUrl: defaultMenuUrl
        // })
        dispatch('getDetailInfo')

        await router.replace({ name: 'loginAfter' })
      }

      return Promise.resolve(response)
    },
    async bbsLogin({ commit, dispatch }, payload) {
      commit('setLoading', true)
      const response = await apis.bbsLogin({token: payload})

      commit('setLoading', false)

      if (response.status) {
        const {
          userInfo, token, companyList
        } = response.data

        commit('setUserInfo', userInfo)
        commit('setAuthentication', token)
        commit('setCompanyList', companyList)
        // commit('setSiteCache', {
        //   menuList: menuList,
        //   defaultMenuUrl: defaultMenuUrl
        // })
        dispatch('getDetailInfo')
      }

      return response
    },
    //切换企业
    async switchEnt({
      dispatch, commit, state
    }, id) {
      if (id === state.userInfo.companyId) return

      commit('setCompanyId', id)
      await dispatch('getDetailInfo')
      window.location.reload()
    },
    async getDetailInfo({ commit }) {
      const { status, data } = await apis.getDetailInfo()

      if (status) {
        commit('setUserInfo', data)
        commit('setCompanyId', data.companyId)
      }
    },
    async logout({ commit, dispatch }) {
      apis.logout()
      dispatch('clear')

      return Promise.resolve()
    },
    async clear({ commit }) {
      commit('setUserInfo', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      await router.replace({ name: 'loginBefore' })

      return Promise.resolve()
    }
  }
}
