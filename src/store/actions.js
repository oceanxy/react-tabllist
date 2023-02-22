import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'
import { downFile, firstLetterToUppercase } from '@/utils/utilityFunction'
import config from '@/config'

export default {
  /**
   * 设置搜索参数（合并设置）
   * @param state
   * @param commit
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param payload {Object} 数据列表的常驻查询对象，一般定义在Inquiry组件中
   * @param [isFetchList=true] {boolean} 是否触发页面列表数据更新的请求，默认true
   * @param [isResetSelectedRows] {boolean} 是否在成功执行后重置对应 store 内 selectedRows，默认false。一般在批量操作时使用。依赖 isFetchList
   * @param [fetchListParams] {...fetchListParams} 传递给获取列表数据(actions.getList)的参数，详情见 actions.getList 参数。依赖 isFetchList
   *
   */
  async setSearch({
    state,
    commit,
    dispatch
  }, {
    moduleName,
    submoduleName,
    payload,
    isFetchList = true,
    isResetSelectedRows,
    ...fetchListParams
  }) {
    commit('setSearch', {
      payload,
      moduleName,
      submoduleName
    })

    if (isFetchList) {
      const targetModule = submoduleName ? state[moduleName][submoduleName] : state[moduleName]
      const getListParams = {
        ...fetchListParams,
        additionalQueryParameters: {
          ...fetchListParams.additionalQueryParameters,
          ...('pagination' in targetModule ? { pageIndex: 0 } : {})
        }
      }

      if (isResetSelectedRows && 'selectedRowKeys' in targetModule && 'selectedRows' in targetModule) {
        commit('setRowSelected', {
          moduleName,
          submoduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
      }

      await dispatch('getList', {
        moduleName,
        submoduleName,
        ...getListParams
      })
    }
  },
  /**
   * 获取列表/表格数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param [submoduleName] {string} 子模块名
   * @param [additionalQueryParameters] {Object} 附加查询参数。例如分页相关参数、其他页面跳转过来时携带的参数 ID 等非 state.search 固有的查询参数。
   * @param [stateName] {string} 需要设置的字段，默认 state.list
   * @param [customApiName] {string} 自定义请求api的名字
   * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, {
    moduleName,
    submoduleName,
    additionalQueryParameters = {},
    stateName,
    customApiName,
    merge
  }) {
    const targetModuleName = state[moduleName][submoduleName] ?? state[moduleName]

    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName
    })

    let api = 'getList'
    let response = {}

    if (!config.mock) {
      if (customApiName) {
        api = customApiName
      } else {
        api = `get${
          submoduleName
            ? `${firstLetterToUppercase(submoduleName)}Of`
            : ''
        }${firstLetterToUppercase(moduleName)}`
      }
    }

    if (apis[api]) {
      response = await apis[api]?.(
        omit(
          {
            ...targetModuleName.pagination,
            ...targetModuleName.search,
            ...additionalQueryParameters
          },
          'total'
        )
      )
    } else {
      console.error(
        `接口未定义：${moduleName} 页面${submoduleName
          ? ` ${submoduleName} 模块`
          : ''}的 ${api} 接口未定义！`
      )
    }

    if (response.status) {
      const data = response.data.paginationObj || response.data
      const sortFieldList = response.data.sortFieldList || []
      let rows = data.rows || data

      if ('pagination' in targetModuleName) {
        commit('setPagination', {
          moduleName,
          submoduleName,
          value: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            total: data.totalNum
          }
        })
      }

      if (merge) {
        rows = [...targetModuleName[stateName || 'list'], ...rows]
      }

      if (sortFieldList?.length) {
        commit('setState', {
          value: sortFieldList,
          moduleName,
          submoduleName,
          stateName: 'sortFieldList'
        })
      }

      commit('setList', {
        value: rows,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName
    })

    return response.status
  },
  /**
   * 获取详情数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param [submoduleName] {string} 子模块名
   * @param [payload] {Object} 查询参数
   * @param [stateName='details'] {string} 需要设置的字段，默认 store.state.details
   * @returns {Promise<void>}
   */
  async getDetails({ state, commit }, {
    moduleName,
    submoduleName,
    payload = {},
    stateName = 'details'
  }) {
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      stateName: 'loadingDetails'
    })

    let api = 'getDetails'

    if (!config.mock) {
      api = `getDetailsOf${firstLetterToUppercase(moduleName)}${
        submoduleName ? firstLetterToUppercase(submoduleName) : ''
      }`
    }

    const res = await apis[api](payload)

    if (res.status) {
      commit('setState', {
        value: res.data,
        moduleName,
        submoduleName,
        stateName: stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      stateName: 'loadingDetails'
    })

    return res
  },
  /**
   * 新增数据
   * @param state
   * @param dispatch
   * @param moduleName {string} 模块名
   * @param payload {Object} 参数
   * @param visibilityFieldName {string} 控制弹窗显示的字段名
   * @param parametersOfGetListAction {...{
   *  moduleName: string;
   *  submoduleName: string;
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数
   * @returns {Promise<*>}
   */
  async add({ state, dispatch }, {
    moduleName,
    payload,
    visibilityFieldName,
    ...parametersOfGetListAction
  }) {
    const response = await apis[`add${firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName
      })

      dispatch('getList', {
        moduleName,
        ...parametersOfGetListAction,
        additionalQueryParameters: {
          ...parametersOfGetListAction?.additionalQueryParameters,
          pageIndex: 0
        }
      })
    }

    return response.status
  },
  /**
   * 更新数据（仅做数据更新及刷新列表使用，如果需要保存返回的数据请使用 custom）
   * @param state
   * @param dispatch
   * @param moduleName {string} 模块名
   * @param [payload={}] {Object} 参数
   * @param [visibilityFieldName='visibilityOfEdit'] {string} 控制弹窗显示的字段名
   * @param customApiName {string} 自定义请求API
   * @param [isFetchList=false] {boolean} 默认 false。当为 true 时，请特别注意参数问题（parametersOfOtherAction）
   * @param parametersOfGetListAction {...{
   *  moduleName: string;
   *  submoduleName: string;
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数，依赖 isFetchList
   * @returns {Promise<*>}
   */
  async update({ state, dispatch }, {
    moduleName,
    payload = {},
    visibilityFieldName,
    customApiName,
    isFetchList,
    ...parametersOfGetListAction
  }) {
    const response = await apis[customApiName || `update${firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName
      })

      if (isFetchList) {
        dispatch('getList', {
          moduleName,
          ...parametersOfGetListAction
        })
      }
    }

    return response.status
  },
  /**
   * 兼顾 add 和 update 的功能，通常仅用于除“新增”和“更新”外的表单提交类数据接口。
   * “新增”和“更新”请优先使用对应的 add 或 update 专用 action。
   * 如有不适用于其他 action 的场景时，再考虑使用本 action。
   * @param state
   * @param dispatch
   * @param commit
   * @param moduleName {string} 模块名
   * @param customApiName {string} 自定义请求API
   * @param [payload={}] {Object} 参数
   * @param [isFetchList] {boolean} 是否在成功提交后刷新本模块列表，默认false
   * @param [isResetSelectedRows] {Boolean} 是否在成功执行后重置对应 store 内 selectedRows，默认false。一般在批量操作时使用
   * @param [stateName] {string} 用于接收接口返回值的 state 字段名称，在相应模块的 store.state 内定义
   * @param [submoduleName] {string} 子级模块名
   * @param [visibilityFieldName] {string} 成功执行操作后要关闭的弹窗的控制字段（定义在对应模块的 store.state 内）
   * @param parametersOfGetListAction {...{
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数，依赖 isFetchList
   * @returns {Promise<*>}
   */
  async custom({
    state,
    dispatch,
    commit
  }, {
    customApiName,
    moduleName,
    payload = {},
    isFetchList,
    visibilityFieldName,
    submoduleName,
    isResetSelectedRows,
    stateName,
    ...parametersOfGetListAction
  }) {
    const response = await apis[customApiName](payload)

    if (response.status) {
      if (visibilityFieldName) {
        dispatch('setModalVisible', {
          statusField: visibilityFieldName,
          statusValue: false,
          moduleName,
          submoduleName
        })
      }

      if (isFetchList) {
        dispatch('getList', {
          moduleName,
          submoduleName,
          ...parametersOfGetListAction
        })
      }

      if (stateName) {
        commit('setState', {
          value: response.data,
          moduleName,
          submoduleName,
          stateName
        })
      }

      if (isResetSelectedRows) {
        commit('setRowSelected', {
          moduleName,
          submoduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
      }
    }

    return response.status
  },
  /**
   * 获取带有加载状态的列表、表格、树、下拉菜单或相似结构的资源。
   * 专用于 store 内定义为类似如下数据结构的 state 请求数据：
   *   {
   *     [stateName]: {
   *       list?: Array,
   *       data?: Object,
   *       loading: Boolean
   *     }
   *   }
   * @param state
   * @param dispatch
   * @param commit
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param stateName {string} 自定义 state 的名称
   * @param payload {Object} 请求参数
   * @param customApiName {string} 自定义请求数据 api 的名称
   * @returns {Promise<*>}
   */
  async getListWithLoadingStatus(
    {
      state,
      dispatch,
      commit
    },
    {
      moduleName,
      submoduleName,
      stateName,
      payload,
      customApiName
    }
  ) {
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      stateName: stateName
    })

    const response = await apis[customApiName](payload)

    if (response.status) {
      const data = response.data
      let result

      if (Array.isArray(data)) {
        result = data
      } else {
        if (data && 'rows' in data) {
          result = data.rows || []
        } else {
          result = data
        }
      }

      commit('setList', {
        value: result,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      stateName: stateName
    })

    return response.status
  },
  /**
   * 更新状态
   * @param commit
   * @param moduleName {string}
   * @param payload {Object}
   * @param [customFieldName='status'] {string} 自定义字段名，默认 status
   * @param [customApiName] {string} 自定义接口名
   * @param [stateName] {string} 需要设置状态的数据源。
   * （默认store.state.list保存列表数据；默认store.state.loading保存列表加载状态；
   * 除这二者之外的需要传递字段名，以告之具体需要修改的对象）
   * @returns {Promise<*>}
   */
  async updateStatus({ commit }, {
    moduleName,
    payload,
    customFieldName,
    customApiName,
    stateName
  }) {
    // stateName并不是子模块名，但是可以看做子模块来传递参数，可以达到相同目的，例如：
    // 在 vuex 暴露出来的 store.state 的数据结构中，
    // store.state[moduleName][submoduleName] 与 store.state[moduleName][stateName] 的数据结构是完全一致的
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName: stateName
    })

    const api = customApiName || `update${
      firstLetterToUppercase(moduleName)
    }${
      firstLetterToUppercase(customFieldName)
    }`
    const { status } = await apis[api](payload)

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName: stateName
    })

    return status
  },
  /**
   * 删除站点应用
   * @param state
   * @param dispatch
   * @param commit
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param [stateName='list'] {string} store中用于存放列表数据的字段名，默认 'list'
   * @param payload {Object} 调用删除接口的参数
   * @param additionalQueryParameters {Object} 删除成功后刷新列表的参数（注意此参数非调用删除接口的参数）
   * @returns {Promise<*>}
   */
  async delete({
    state,
    dispatch,
    commit
  }, {
    moduleName,
    submoduleName,
    stateName = 'list',
    payload = {},
    additionalQueryParameters = {}
  }) {
    let isBatchDeletion = false
    const module = state[moduleName][submoduleName] ?? state[moduleName]
    const selectedRows = module.selectedRows
    const selectedRowKeys = module.selectedRowKeys
    const newSelectedRows = []
    const newSelectedRowKeys = []

    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName
    })
    // 子模块内的列表操作后，除了要刷新当前列表，还要刷新父级模块的列表
    // （TODO 目前不支持不刷新父级模块内列表的操作，后期如有需求再来适配）
    submoduleName && commit('setLoading', { value: true, moduleName })

    // 通过 forFunction 混合调用时，一般为批量操作，即勾选了行选择框的操作，
    // 需要更新对应 store 模块内的 selectedRowKeys 和 selectedRows。
    if (!payload.ids?.length) {
      payload.ids = selectedRowKeys
      isBatchDeletion = true
    }

    const response = await apis[`delete${
      submoduleName
        ? `${firstLetterToUppercase(submoduleName)}Of`
        : ''
    }${firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      // 非批量操作时，只从选中行数组中移除被删除的行的key，
      // 批量操作时，直接清空选中行数组
      if (selectedRows?.length && !isBatchDeletion) {
        const index = newSelectedRowKeys.findIndex(key => key === payload.ids[0])

        if (index > 0) {
          newSelectedRowKeys.splice(index, 1)
          selectedRows.splice(index, 1)
        }
      }

      commit('setRowSelected', {
        moduleName,
        submoduleName,
        payload: {
          selectedRowKeys: newSelectedRowKeys,
          selectedRows: newSelectedRows
        }
      })

      // 删除数据后，刷新分页数据，避免请求不存在的页码
      if (module[stateName].length <= payload.ids.length && module.pagination?.pageIndex) {
        const { pageIndex, pageSize } = module.pagination

        commit('setPagination', {
          value: {
            pageIndex: pageIndex - (
              payload.ids.length % pageSize > module[stateName].length
                ? Math.ceil(payload.ids.length / pageSize)
                : Math.floor(payload.ids.length / pageSize)
            )
          },
          moduleName,
          submoduleName
        })
      }

      // 重新请求数据
      dispatch('getList', {
        moduleName,
        submoduleName,
        stateName,
        additionalQueryParameters
      })

      submoduleName && dispatch('getList', {
        moduleName,
        stateName,
        additionalQueryParameters
      })
    } else {
      commit('setLoading', {
        value: false,
        moduleName,
        submoduleName
      })
      submoduleName && commit('setLoading', { value: false, moduleName })
    }

    return response.status
  },
  /**
   * 导出
   * @param state
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param payload {Object} 参数。不从 store.state.search 直接获取，因为 store.state.search 对象在未点击搜索按钮之前是没有值的
   * @param additionalQueryParameters {Object} 附加参数。例如其他页面跳转带过来的参数
   * @param fileName {string} 不包含后缀名
   * @param [customApiName] {string} 自定义请求api的名字
   * @param [visibilityFieldName] {string} 成功导出后要关闭的弹窗的控制字段（定义在对应模块的 store.state 内）
   * @returns {Promise<*>}
   */
  async export({ state, dispatch }, {
    moduleName,
    submoduleName,
    payload,
    additionalQueryParameters,
    fileName,
    customApiName,
    visibilityFieldName
  }) {
    let api = 'export'
    const targetModuleName = state[moduleName][submoduleName] ?? state[moduleName]

    if (!config.mock) {
      if (customApiName) {
        api = customApiName
      } else {
        api = `export${submoduleName ? `${
          firstLetterToUppercase(submoduleName)}Of` : ''
        }${
          firstLetterToUppercase(moduleName)
        }`
      }
    }

    const params = cloneDeep({ ...additionalQueryParameters, ...payload })
    const buffer = await apis[api]({ ...targetModuleName.search, ...params })
    const blob = new Blob([buffer])

    downFile(blob, `${fileName}.xlsx`)

    if (visibilityFieldName) {
      dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName,
        submoduleName
      })
    }

    return buffer
  },
  /**
   * 设置新增/编辑弹窗可见状态
   * @param commit
   * @param [statusField] {string} store里要设置的状态字段名称
   * @param statusValue {*} store里要设置的状态字段对应的值
   * @param moduleName {string} 要设置的状态所在的store模块的名称
   * @param submoduleName {string} 要设置的状态所在的store子模块的名称，依赖 moduleName
   */
  setModalVisible({ commit }, {
    statusField,
    statusValue,
    moduleName,
    submoduleName
  }) {
    commit('setModalVisible', {
      field: statusField || 'visibilityOfEdit',
      value: statusValue,
      moduleName,
      submoduleName
    })
  },
  /**
   * 设置当前正在操作的对象为一个新的副本
   * @param state
   * @param commit
   * @param moduleName {string}
   * @param value {Object}
   * @param merge {boolean} 是否是合并操作
   */
  setCurrentItem({ state, commit }, {
    moduleName,
    value,
    merge = false
  }) {
    if (!merge) {
      commit('setCurrentItem', {
        moduleName,
        value: cloneDeep(value) || {}
      })
    } else {
      commit('setCurrentItem', {
        moduleName,
        value: {
          ...state[moduleName].currentItem,
          ...cloneDeep(value)
        } || {}
      })
    }
  },
  /**
   * 设置选中的行（主要用于批量操作）
   * @param commit
   * @param state
   * @param payload {{selectedRowKeys: string[], selectedRows: Object[]}}
   * @param moduleName {string}
   * @param [submoduleName] {string}
   */
  setRowSelected({ commit, state }, {
    moduleName,
    submoduleName,
    payload
  }) {
    commit('setRowSelected', {
      moduleName,
      submoduleName,
      payload
    })
  }
}
