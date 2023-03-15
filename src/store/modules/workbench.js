/**
 * 工作台
 */

export default {
  namespaced: true,
  state: {
    userConcern: {
      list: [],
      loading: false
    },
    usedFunctionsFrequently: {
      list: [],
      loading: false
    },
    visibilityOfSetUpUsedFunctionsFrequently: false,
    treeOfSetUpUsedFunctionsFrequently: {
      list: [],
      loading: false
    }
  },
  modules: {
    todo: {
      state: {
        loading: false,
        list: [],
        search: {},
        pagination: {
          pageIndex: 0,
          pageSize: 15,
          total: 0
        }
      }
    },
    news: {
      state: {
        loading: false,
        list: [],
        search: {},
        pagination: {
          pageIndex: 0,
          pageSize: 15,
          total: 0
        }
      }
    }
  }
}
