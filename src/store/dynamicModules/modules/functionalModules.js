import apis from '@/apis'
import { cloneDeep } from 'lodash'

export default (store, commitRootInModule) => {
  // 搜索模型
  const searchModel = {
    moduleName: undefined,
    appId: undefined
  }

  store.registerModule('functionalModules', {
    namespaced: true,
    state: {
      loading: false,
      search: { ...searchModel },
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 0
      },
      current: {},
      list: [],
      editModalVisible: false,
      selectedRowKeys: [],
      selectedRows: []
    },
    mutations: {},
    actions: {
      /**
       * 获取列表数据
       * @param state
       * @param pagination
       * @returns {Promise<void>}
       */
      async getList({ state }, pagination) {
        commitRootInModule('setLoading', true)

        const response = await apis.getFunctionalModules({
          ...state.pagination,
          ...state.search,
          ...pagination
        })

        if (response.status) {
          commitRootInModule('setPagination', {
            ...state.pagination,
            pageIndex: response.data.pageIndex,
            pageSize: response.data.pageSize,
            total: response.data.totalNum
          })

          commitRootInModule('setList', response.data.rows)
        }

        commitRootInModule('setLoading', false)
      },
      /**
       * 更新状态
       * @param state
       * @param payload
       * @return {Promise<*>}
       */
      async updateStatus({ state }, payload) {
        commitRootInModule('setLoading', true)

        const { status } = await apis.updateFunctionalModulesStatus(payload)

        commitRootInModule('setLoading', false)

        return status
      },
      /**
       * 删除站点应用
       * @param state
       * @param dispatch
       * @param ids {Array}
       * @returns {Promise<void>}
       */
      async delete({ state, dispatch }, ids) {
        commitRootInModule('setLoading', true)

        if (!ids) {
          ids = state.selectedRowKeys
        }

        const response = await apis.deleteFunctionalModules({ ids })

        if (response.status) {
          dispatch('getList', {
            pageIndex: 0
          })
        } else {
          commitRootInModule('setLoading', false)
        }

        return response.status
      },
      /**
       * 新增站点应用
       * @param state
       * @param dispatch
       * @param payload
       * @return {Promise<*>}
       */
      async add({ state, dispatch }, payload) {
        const response = await apis.addFunctionalModules(payload)

        if (response.status) {
          dispatch('setModalStateForEdit', false)
          dispatch('getList', {
            pageIndex: 0
          })
        }

        return response.status
      },
      /**
       * 更新站点应用
       * @param state
       * @param dispatch
       * @param payload
       * @return {Promise<*>}
       */
      async update({ state, dispatch }, payload) {
        const response = await apis.updateFunctionalModules(payload)

        if (response.status) {
          dispatch('getList')
        }

        return response.status
      },
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
      /**
       * 设置新增/编辑弹窗可见状态
       * @param state
       * @param payload
       */
      setModalStateForEdit({ state }, payload) {
        commitRootInModule('setModalVisible', {
          modalVisibleField: 'editModalVisible',
          value: payload
        })
      },
      /**
       * 设置当前正在操作的对象为一个新的副本
       * @param state
       * @param payload
       */
      setCurrent({ state }, payload) {
        commitRootInModule('setCurrent', cloneDeep(payload || {}))
      },
      /**
       * 设置选择的行
       * @param state
       * @param payload
       */
      setRowSelected({ state }, payload) {
        commitRootInModule('setRowSelected', payload)
      }
    }
  })
}
