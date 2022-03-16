export default {
  /**
   * 设置所有站点应用
   * @param state
   * @param payload
   */
  setAllSiteApps(state, payload) {
    state.allSiteApps = payload
  },
  /**
   * 设置所有功能模块
   * @param state
   * @param payload
   */
  setAllFunctionalModules(state, payload) {
    state.allFunctionalModules = payload
  },
  /**
   * 设置所有页面
   * @param state
   * @param payload
   */
  setAllPages(state, payload) {
    state.allPages = payload
  },
  /**
   * 设置数据列表的loading
   * @param state {Object}
   * @param payload {boolean}
   * @param moduleName {string}
   */
  setLoading(state, { payload, moduleName }) {
    state[moduleName].loading = payload
  },
  /**
   * 设置列表搜索参数对象
   * @param state {Object}
   * @param payload {Object}
   * @param moduleName {string}
   */
  setSearch(state, { payload, moduleName }) {
    state[moduleName].pagination.pageIndex = 0
    state[moduleName].search = payload
  },
  /**
   * 设置当前的临时数据对象
   * current: 当前页面正在操作的临时数据对象。如新增，编辑等需要临时保存数据的对象
   * @param state {Object}
   * @param payload {Object}
   * @param moduleName {string}
   */
  setCurrent(state, { payload, moduleName }) {
    state[moduleName].current = payload
  },
  /**
   * 设置表格选中的行数据
   * @param state {Object}
   * @param [selectedRowKeys] {string[]}
   * @param [selectedRows] {Object[]}
   * @param moduleName string
   */
  setRowSelected(state, { payload: { selectedRowKeys, selectedRows }, moduleName }) {
    state[moduleName].selectedRowKeys = selectedRowKeys || []
    state[moduleName].selectedRows = selectedRows || []
  },
  /**
   * 设置分页信息
   * @param state {Object}
   * @param payload {{
   *   pageIndex: number,
   *   pageSize: number
   * }}
   * @param moduleName {string}
   */
  setPagination(state, { payload, moduleName }) {
    state[moduleName].pagination = payload
  },
  /**
   * 设置列表数据
   * @param state {Object}
   * @param payload {Object[]}
   * @param moduleName {string}
   */
  setList(state, { payload, moduleName }) {
    state[moduleName].list = payload
  },
  /**
   *
   * @param state {Object}
   * @param payload {{
   *   modalVisibleField: string,
   *   value: any
   * }} modalVisibleField: 控制modal显示的字段 value：要设置的值
   * @param moduleName {string}
   */
  setModalVisible(state, { payload, moduleName }) {
    state[moduleName][payload.modalVisibleField] = payload.value
  }
}
