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
  }
}
