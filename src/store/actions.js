import apis from '@/apis'

export default {
  /**
   * 获取所有站点应用
   * @param state {Object}
   * @param commit {Function}
   */
  async getAllSiteApps({ commit }) {
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
  async getAllFunctionalModules({ commit }) {
    const { status, data } = await apis.getAllFunctionalModules()

    if (status) {
      commit('setAllFunctionalModules', data || [])
    }
  },
  /**
   * 获取所有页面
   * @param commit
   * @returns {Promise<void>}
   */
  async getAllPages({ commit }) {
    const { status, data } = await apis.getAllPages()

    if (status) {
      commit('setAllPages', data || [])
    }
  }
}
