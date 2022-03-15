import apis from '@/apis'

export default {
  /**
   * 获取所有站点应用
   * @param state {Object}
   * @param commit {Function}
   */
  async getAllSiteApps({ state, commit }) {
    const { status, data } = await apis.getAllSiteApps()

    if (status) {
      commit('setAllSiteApps', data || [])
    }
  },
  /**
   * 获取所有站点模块
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getAllFunctionalModules({ state, commit }) {
    const { status, data } = await apis.getAllFunctionalModules()

    if (status) {
      commit('setAllFunctionalModules', data || [])
    }
  }
}
