/**
 * 通用数据
 * 包括各种枚举、省市区数据等，项目独有的的通用状态请写到每个项目的common文件
 */

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
    },
    // 民族数据
    nations: [],
    // 政治面貌数据
    politicalStatus: [],
    // 阶级数据
    castes: [],
    // 行政级别数据
    administrativeRanks: [],
    // 学历数据
    degrees: [],
    // 省数据
    provinces: [],
    // 当前缓存的页面路由
    pageTabs: [],
    // 当前缓存的页面名称（VUE 组件实例的 name 属性）
    pageNames: []
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
    },
    setAdministrativeRanks(state, payload) {
      state.administrativeRanks = payload || []
    },
    setDegrees(state, payload) {
      state.degrees = payload || []
    },
    setProvinces(state, payload) {
      state.provinces = payload || []
    },
    setPageTabs(state, payload) {
      state.pageTabs = payload || []
    },
    setPageNames(state, payload) {
      state.pageNames = payload || []
    }
  },
  actions: {
    /**
     * 获取行政区划级联数据
     * @param commit
     * @returns {Promise<void>}
     */
    async getAdministrativeDivision({ commit }) {
      const response = await this.apis.getAdministrativeDivision()

      if (response.status) {
        commit('setAdministrativeDivision', response.data)
      }
    },
    async getNations({ commit }) {
      const response = await this.apis.getNations()

      if (response.status) {
        commit('setNations', response.data)
      }
    },
    async getPoliticalStatus({ commit }) {
      const response = await this.apis.getPoliticalStatus()

      if (response.status) {
        commit('setPoliticalStatus', response.data)
      }
    },
    async getCastes({ commit }) {
      const response = await this.apis.getCastes()

      if (response.status) {
        commit('setCastes', response.data)
      }
    },
    async getAdministrativeRanks({ commit }) {
      const response = await this.apis.getAdministrativeRanks()

      if (response.status) {
        commit('setAdministrativeRanks', response.data)
      }
    },
    async getDegrees({ commit }) {
      const response = await this.apis.getDegrees()

      if (response.status) {
        commit('setDegrees', response.data)
      }
    },
    async getProvinces({ commit }) {
      const response = await this.apis.getProvinces()

      if (response.status) {
        commit('setProvinces', response.data)
      }
    }
  }
}
