import { cloneDeep, omit } from 'lodash'
import { downloadFile, firstLetterToUppercase as FLTU } from '@/utils/utilityFunction'
import Vue from 'vue'

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

      const getListParams = {
        ...fetchListParams,
        additionalQueryParameters: {
          ...fetchListParams.additionalQueryParameters,
          ...('pagination' in targetModule ? { pageIndex: 0 } : {})
        }
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
   * @param [additionalQueryParameters] {Object} 附加查询参数。例如自定义分页相关参数、其他页面跳转过来时携带的参数(如：ID)等非 state.search 固有的查询参数。
   * @param [stateName] {string} 需要设置的字段，默认 state.list
   * @param [customApiName] {string} 自定义请求api的名字
   * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
   * @param [raw] {boolean} 原样输出接口返回的数据结构到页面对应的store中。（专用于非增删改查的非列表页面，比如首页、控制台和统计等定制化页面）
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, {
    moduleName,
    submoduleName,
    additionalQueryParameters = {},
    stateName,
    customApiName,
    merge,
    raw
  }) {
    const targetModuleName = state[moduleName][submoduleName] ?? state[moduleName]

    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      stateName
    })

    let api = 'getList'
    let response = {}

    if (customApiName) {
      api = customApiName
    } else {
      api = `get${submoduleName ? `${FLTU(submoduleName)}Of` : ''}${FLTU(moduleName)}`
    }

    if (this.apis[api]) {
      response = await this.apis[api]?.(
        omit(
          {
            ...targetModuleName.pagination,
            ...targetModuleName.search,
            ...additionalQueryParameters // 带有自定义的参数以及路由query内的参数
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
      if (raw) {
        Object.entries(response.data).forEach(([key, value]) => {
          Vue.set(targetModuleName, key, value)
        })
      } else {
        const data = response.data?.paginationObj ?? response.data
        const sortFieldList = response.data?.sortFieldList ?? []
        let rows = data?.rows ?? data

        // 若指定字段不是可用的数据数组，则在 rows 对象内寻找数组作为结果返回，其他字段注入到该模块的 store 中
        if (Object.prototype.toString.call(rows) === '[object Object]') {
          Object.entries(rows).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              rows = value
            } else {
              Vue.set(targetModuleName, key, value)
            }
          })
        }

        if (!rows) {
          rows = []
        }

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
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      stateName
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
   * @param [loadingStateName] {string} 加载详情的 loading 状态字段，默认当前 store 模块的 loadingDetails
   * @param [customApiName='loadingDetails'] {string} 自定义接口名称，默认根据 moduleName 和 submoduleName 生成
   * @param [merge] {boolean} 如果 stateName 指定的字段存在旧数据，是否使用新值对其进行合并
   * @returns {Promise<void>}
   */
  async getDetails({ state, commit }, {
    moduleName,
    submoduleName,
    payload = {},
    stateName = 'details',
    loadingStateName = 'loadingDetails',
    customApiName,
    merge = false
  }) {
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      stateName: loadingStateName
    })

    let api = 'getDetails'
    let res = {}

    api = customApiName || `getDetailsOf${FLTU(moduleName)}${submoduleName ? FLTU(submoduleName) : ''}`

    if (this.apis[api]) {
      res = await this.apis[api](payload)
    } else {
      console.error(
        `接口未定义：${moduleName} 页面${submoduleName
          ? ` ${submoduleName} 模块`
          : ''}的 ${api} 接口未定义！`
      )
    }

    if (res.status) {
      commit('setState', {
        value: res.data,
        moduleName,
        submoduleName,
        stateName,
        merge
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      stateName: loadingStateName
    })

    return res
  },
  /**
   * 新增数据
   * @param state
   * @param dispatch
   * @param moduleName {string} 模块名
   * @param payload {Object} 参数
   * @param [customApiName] {string} 自定义请求API
   * @param [visibilityFieldName] {string} 控制弹窗显示的字段名
   * @param [inModal=true] {boolean} 是否处于对话框中，默认 true。
   *  处于对话框中的新增功能需要在操作成功后关闭对话框以及刷新列表。如果不处于对话框，请设置为false，避免执行无用逻辑。
   * @param parametersOfGetListAction {{
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
    customApiName,
    visibilityFieldName,
    inModal = true,
    parametersOfGetListAction
  }) {
    const response = await this.apis[customApiName || `add${FLTU(moduleName)}`](payload)

    if (inModal && response.status) {
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
   * @param commit
   * @param moduleName {string} 模块名
   * @param [payload={}] {Object} 参数
   * @param [visibilityFieldName='visibilityOfEdit'] {string} 控制弹窗显示的字段名
   * @param [inModal=true] {boolean} 是否处于对话框中，默认 true。
   *  处于对话框中的编辑功能需要在操作成功后关闭对话框以及刷新列表。如果不处于对话框，请设置为false，避免执行无用逻辑。
   * @param [customApiName] {string} 自定义请求API
   * @param [isFetchList] {boolean} 默认 false。当为 true 时，请特别注意参数问题（parametersOfOtherAction）
   * @param [isResetSelectedRows] {boolean} 默认false（批量操作默认true），是都在成功执行后清空已选中行（批量更新时很重要）
   * @param parametersOfGetListAction {{
   *  moduleName: string;
   *  submoduleName: string;
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数，依赖 isFetchList。parametersOfGetListAction.moduleName 默认为 moduleName
   * @returns {Promise<*>}
   */
  async update(
    {
      state,
      dispatch,
      commit
    },
    {
      moduleName,
      payload = {},
      visibilityFieldName,
      inModal = true,
      customApiName,
      isFetchList,
      isResetSelectedRows,
      parametersOfGetListAction
    }
  ) {
    const response = await this.apis[customApiName || `update${FLTU(moduleName)}`](payload)

    if (inModal && response.status) {
      dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName
      })

      if (isResetSelectedRows) {
        commit('setRowSelected', {
          moduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
      }

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
   * @param moduleName {string} - 模块名
   * @param customApiName {string} - 自定义请求API
   * @param [payload={}] {Object} - 请求接口的参数
   * @param [isFetchList=false] {boolean} - 是否在成功提交后刷新本模块列表，默认false
   * @param [isFetchDetails=false] {boolean} - 是否在成功提交后刷新本模块详情数据，默认false
   * @param [isResetSelectedRows=false] {Boolean} - 是否在成功执行后重置对应 store 内 selectedRows，默认false。一般在批量操作时使用
   * @param [stateName=null] {string} - 用于接收接口返回值的 state 字段名称，该字段需要提前在相应模块的 store.state 内定义好
   * @param [submoduleName=null] {string} - 子级模块名
   * @param [visibilityFieldName=null] {string} - 成功执行操作后要关闭的弹窗的控制字段（定义在对应模块的 store.state 内）
   * @param [parametersOfGetListAction] {Object} - 用于操作后刷新列表的参数，依赖 isFetchList
   * @config [additionalQueryParameters] {Object} - 附加查询参数。例如自定义分页相关参数、其他页面跳转过来时携带的参数(如：ID)等非 state.search 固有的查询参数。
   * @config [stateName] {string} - 用于接收列表数据的字段，默认 store.state.list
   * @config [customApiName] {string} - 自定义请求api的名字
   * @param [parametersOfGetDetailsAction] {Object} - 用于操作后刷新详情的参数，依赖 isFetchDetails
   * @config [payload] {Object} - 查询参数
   * @config [stateName] {string} - 用于接收详情数据的字段，默认 store.state.details
   * @config [customApiName] {string} - 自定义请求api的名字
   * @config [merge] {boolean} - 如果 stateName 指定的字段存在旧数据，是否使用新值对其进行合并
   * @returns {Promise<*>}
   */
  async custom({
    state,
    dispatch,
    commit
  }, {
    customApiName,
    payload = {},
    moduleName,
    isFetchList,
    isFetchDetails,
    visibilityFieldName,
    submoduleName,
    isResetSelectedRows,
    stateName,
    parametersOfGetListAction,
    parametersOfGetDetailsAction
  }) {
    const response = await this.apis[customApiName](payload)

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

      if (isFetchDetails) {
        dispatch('getDetails', {
          moduleName,
          submoduleName,
          ...parametersOfGetDetailsAction
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

    return response
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
      stateName
    })

    const response = await this.apis[customApiName](payload)

    if (response.status) {
      const data = response.data
      let result

      if (Array.isArray(data)) {
        result = data
      } else {
        if (Object.prototype.toString.call(data) === '[object Object]' && 'rows' in data) {
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
      stateName
    })

    return response.status
  },
  /**
   * 更新状态
   * @param commit
   * @param moduleName {string} 模块名
   * @param [submoduleName] {string} 子模块名
   * @param [loadingFieldName] {string} 请求接口时的 loading 状态值的字段名。该值有如下几种情况：
   * - 该值指向一个对象时，`loading`状态值的取值为`[loadingFieldName].loading`，其结构一般为`{ loading: boolean, list: Array }`;
   * - 该值指向一个数组时，`loading`状态值的取值为`store.state`中`loadingFieldName`字段所在对象中的`loading`字段，
   *   其结构一般为`{ ..., loading: boolean, [loadingFieldName]: Array }`;
   * - 非以上两种情况时，`loading`状态值的取值为`loadingFieldName`。
   * <br>
   * 该值更详细逻辑请参考全局 mutations 中的 setLoading 函数。
   * @param [customApiName] {string} 自定义接口名。传递该值后，不会再动态生成接口函数名称，所以该值与`customFieldName`互斥。优先使用该值。
   * @param [customFieldName='status'] {string} 自定义变更的字段名，默认 'status'。
   *  该参数在`customApiName`未传递的情况下用于动态生成接口函数名称，请确保与`api`文件内的接口函数名称对应。
   * @param payload {Object} 参数
   * @returns {Promise<*>}
   */
  async updateStatus({ commit }, {
    moduleName,
    submoduleName,
    loadingFieldName,
    payload,
    customFieldName,
    customApiName
  }) {
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      stateName: loadingFieldName
    })

    let api = customApiName

    if (!api) {
      if (submoduleName) {
        api = `update${FLTU(moduleName)}${FLTU(customFieldName)}`
      } else {
        api = `update${FLTU(moduleName)}${FLTU(submoduleName)}${FLTU(customFieldName)}`
      }
    }

    let res = {}

    if (this.apis[api]) {
      res = await this.apis[api](payload)
    } else {
      console.error(
        `接口未定义：${moduleName} 页面${submoduleName
          ? ` ${submoduleName} 模块`
          : ''}的 ${api} 接口未定义！`
      )
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      stateName: loadingFieldName
    })

    return res.status
  },
  /**
   * 删除站点应用
   * @param state
   * @param dispatch
   * @param commit
   * @param payload {Object} 调用删除接口的参数
   * @param moduleName {string}
   * @param [submoduleName] {string}
   * @param [idFieldName='ids'] {string} 删除接口用于接收删除ID的字段名，默认 'ids'
   * @param [isBulkOperation] {boolean} 是否批量操作，默认 true。
   * @param [stateName='list'] {string} store中用于存放列表数据的字段名，默认 'list'
   * @param [additionalQueryParameters] {Object} 删除成功后刷新列表的参数（注意此参数非调用删除接口的参数）
   * @returns {Promise<*>}
   */
  async delete({
    state,
    dispatch,
    commit
  }, {
    idFieldName = 'ids',
    isBulkOperation = true,
    moduleName,
    submoduleName,
    stateName = 'list',
    payload = {},
    additionalQueryParameters = {}
  }) {
    debugger

    const module = state[moduleName][submoduleName] ?? state[moduleName]
    const selectedRows = [...module.selectedRows]
    const selectedRowKeys = [...module.selectedRowKeys]

    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName
    })
    // 子模块内的列表操作后，除了要刷新当前列表，还要刷新父级模块的列表
    // （TODO 目前不支持不刷新父级模块内列表的操作，后期如有需求再来适配）
    submoduleName && commit('setLoading', { value: true, moduleName })

    const apiName = `delete${submoduleName ? `${FLTU(submoduleName)}Of` : ''}${FLTU(moduleName)}`

    if (!this.apis[apiName]) {
      console.error(`接口未定义：${moduleName} 页面${submoduleName
        ? ` ${submoduleName} 模块`
        : ''}的 ${apiName} 接口未定义！`)

      return false
    }

    const params = { ...payload }

    // 通过 forFunction 混合调用时，一般为批量操作，即勾选了行选择框的操作，
    // 需要更新对应 store 模块内的 selectedRowKeys 和 selectedRows。
    if (isBulkOperation && !payload[idFieldName]?.length) {
      params[idFieldName] = selectedRowKeys
    }

    const response = await this.apis[apiName](params)

    if (response.status) {
      // 通过列表内的删除按钮删除数据时，只从 store 内的选中行数组中移除被删除的行数据，
      if (selectedRowKeys?.length) {
        const index = selectedRowKeys.findIndex(key => {
          if (Array.isArray(payload[idFieldName])) {
            return key === payload[idFieldName][0]
          }

          return key === payload[idFieldName]
        })

        if (index >= 0) {
          selectedRowKeys.splice(index, 1)
          selectedRows.splice(index, 1)

          commit('setRowSelected', {
            moduleName,
            submoduleName,
            payload: {
              selectedRowKeys,
              selectedRows
            }
          })
        }
      }

      // // 通过列表外的删除按钮删除数据时，直接清空 store 内的选中行数组
      if (isBulkOperation && !payload[idFieldName]?.length) {
        commit('setRowSelected', {
          moduleName,
          submoduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
      }

      const length = Array.isArray(payload[idFieldName]) ? payload[idFieldName].length : 1

      // 删除数据后，刷新分页数据，避免请求不存在的页码
      if (module[stateName].length <= length && module.pagination?.pageIndex) {
        const { pageIndex, pageSize } = module.pagination

        commit('setPagination', {
          value: {
            pageIndex: pageIndex - (
              length % pageSize > module[stateName].length
                ? Math.ceil(payload[idFieldName].length / pageSize)
                : Math.floor(payload[idFieldName].length / pageSize)
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
   * @param [submoduleName] {string}
   * @param [payload] {Object} 参数，默认为 store.state.search 的值。
   * 因为版本更迭原因，目前 payload 和 additionalQueryParameters 参数的功能基本一致了。
   * @param [additionalQueryParameters] {Object} 附加参数。例如其他页面跳转带过来的参数。
   * 因为版本更迭原因，目前 payload 和 additionalQueryParameters 参数的功能基本一致了。
   * @param [fileName] {string} 不包含后缀名
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

    if (customApiName) {
      api = customApiName
    } else {
      api = `export${submoduleName ? `${FLTU(submoduleName)}Of` : ''}${FLTU(moduleName)}`
    }

    const params = cloneDeep({ ...additionalQueryParameters, ...payload })
    let buffer

    if (this.apis[api]) {
      buffer = await this.apis[api]?.({ ...targetModuleName.search, ...params })
    } else {
      console.error(`接口未定义：${moduleName} 页面${submoduleName
        ? ` ${submoduleName} 模块`
        : ''}的 ${api} 接口未定义！`)
    }

    if (buffer) {
      const blob = new Blob([buffer])

      downloadFile(blob, `${fileName}.xlsx`)

      if (visibilityFieldName) {
        dispatch('setModalVisible', {
          statusField: visibilityFieldName,
          statusValue: false,
          moduleName,
          submoduleName
        })
      }
    }

    return buffer
  },
  /**
   * 设置新增/编辑弹窗可见状态
   * @param commit
   * @param [statusField] {string} 弹窗显示字段名称。需预先在对应的store模块中定义，默认 visibilityOfEdit（新增/编辑弹窗）
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
        value: value || {}
      })
    } else {
      commit('setCurrentItem', {
        moduleName,
        value: {
          ...state[moduleName].currentItem,
          value
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
