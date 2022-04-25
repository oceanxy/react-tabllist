import router from '@/router'

export default {
  namespaced: true,
  actions: {
    async clear({ commit }) {
      await router.replace({ name: 'login' })

      return Promise.resolve()
    }
  }
}
