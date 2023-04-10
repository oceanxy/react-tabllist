/**
 * 通用数据
 * 包括各种枚举、省市区数据等
 */

import apis from '@/apis'

export default {
  namespaced: true,
  state: {
    // 菜单栏折叠与展开状态切换
    collapsed: false,
    // 页面中的侧边树折叠与展开状态切换（如果有）
    treeCollapsed: false,
    // 行政区划
    administrativeDivision: [],
    // 默认行政区划
    defaultAdministrativeDivision: [],
    // header 内的站点切换数据源
    organListForHeader: {
      loading: false,
      list: []
    },
    // header 内的当前选中站点
    headerId: undefined,
    news: {
      loading: false,
      total: 0,
      userRefundMessageList: []
    }
  },
  mutations: {
    setAdministrativeDivision(state, payload) {
      state.administrativeDivision = payload || []
      state.defaultAdministrativeDivision = payload.defaultIds || []
    }
  },
  actions: {
    /**
     * 获取行政区划级联数据
     * @param commit
     * @returns {Promise<void>}
     */
    async getAdministrativeDivision({ commit }) {
      const response = await apis.getAdministrativeDivision()

      if (response.status) {
        commit('setAdministrativeDivision', response.data)
      }
    }
  }
}
