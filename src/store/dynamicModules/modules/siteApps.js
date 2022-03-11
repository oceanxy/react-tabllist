import apis from '@/apis'
import { cloneDeep } from 'lodash'

export default (store, commitRootInModule) => {
  // 搜索模型
  const searchModel = {
    appName: undefined,
    status: undefined
  }

  store.registerModule('siteApps', {
    namespaced: true,
    state: {
      loading: false,
      search: { ...searchModel },
      pagination: {
        pageIndex: 0,
        pageSize: 10
      },
      total: 0,
      current: {},
      list: [],
      editModalVisible: false
    },
    mutations: {},
    actions: {
      /**
       * 设置搜索参数
       * @param state
       * @param [payload]
       */
      setSearch({ state }, payload) {
        commitRootInModule('setSearch', { ...(payload ?? searchModel) })
      },
      /**
       * 设置分页参数
       * @param state
       * @param [payload]
       */
      setPagination({ state }, payload) {
        commitRootInModule('setPagination', { ...state.pagination, ...payload })
      },
      async updateStatus({ state }, payload) {
        commitRootInModule('setLoading', true)

        const { status } = await apis.updateSiteAppsStatus(payload)

        commitRootInModule('setLoading', false)

        return status
      },
      /**
       * 获取列表数据
       * @param state
       * @param pagination
       * @returns {Promise<void>}
       */
      async getSiteApps({ state }, pagination) {
        commitRootInModule('setLoading', true)

        const response = await apis.getSiteApps({
          ...state.pagination,
          ...state.search,
          ...pagination
        })

        if (response.status) {
          commitRootInModule('setPagination', {
            ...state.pagination,
            pageIndex: response.data.pageIndex,
            pageSize: response.data.pageSize
          })

          commitRootInModule('setTotal', response.data.totalNum)

          commitRootInModule('setList', response.data.rows)
        }

        commitRootInModule('setLoading', false)
      },
      setModalStateForEdit({ state }, payload) {
        commitRootInModule('setModalVisible', {
          modalVisibleField: 'editModalVisible',
          value: payload
        })
      },
      setCurrent({ state }, payload) {
        commitRootInModule('setCurrent', cloneDeep(payload || {}))
      },
      /**
       * 删除站点
       * @param state
       * @param dispatch
       * @param ids {Array}
       * @returns {Promise<void>}
       */
      async delete({ state, dispatch }, ids) {
        const response = await apis.deleteSiteApp({ ids })

        if (response.status) {
          dispatch('getSiteApps')
        }

        return response.status
      }
    }
  })
}
