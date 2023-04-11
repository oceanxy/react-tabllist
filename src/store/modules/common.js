/**
 * 通用数据
 * 包括各种枚举、省市区数据等
 */

import apis from '@/apis'

export default {
  namespaced: true,
  state: {
    // 主题颜色变量
    variables: {},
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
    },
    // 民族数据
    nations: [],
    // 政治面貌数据
    politicalStatus: [],
    // 阶级数据
    castes: []
  },
  mutations: {
    setAdministrativeDivision(state, payload) {
      state.administrativeDivision = payload || []
      state.defaultAdministrativeDivision = payload.defaultIds || []
    },
    setNations(state, payload) {
      state.nations = payload || []
    },
    setPoliticalStatus(state, payload) {
      state.politicalStatus = payload || []
    },
    setCastes(state, payload) {
      state.castes = payload || []
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
    },
    async getNations({ commit }) {
      const response = await apis.getNations()

      if (response.status) {
        commit('setNations', response.data)
      }
    },
    async getPoliticalStatus({ commit }) {
      const response = await apis.getPoliticalStatus()

      if (response.status) {
        commit('setPoliticalStatus', response.data)
      }
    },
    async getCastes({ commit }) {
      const response = await apis.getCastes()

      if (response.status) {
        commit('setCastes', response.data)
      }
    }
  }
}
