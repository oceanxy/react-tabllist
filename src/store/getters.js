export default {
  /**
   * 获取状态
   * @param state
   * detectPresence {boolean} 检测store模块内是否存在该参数。默认true，共用模块内建议设为false
   * @returns {function(*, *, string=, boolean=): *}
   */
  getState: state => (stateName, moduleName, submoduleName = '', detectPresence = true) => {
    const _state = (state[moduleName][submoduleName] ?? state[moduleName])[stateName]

    if (detectPresence && _state === undefined && process.env.NODE_ENV !== 'production') {
      console.warn(
        `未从store（${moduleName}${submoduleName ? `.${submoduleName}` : ''}）中找到预定义的 "${stateName}" 字段。` +
        `请确保已预定义 store.${moduleName}${submoduleName ? `.${submoduleName}` : ''}.${stateName} 字段。` +
        '如果已预定义该字段后仍然存在该警告，请检查是否在 createStoreModule 函数的参数（excludeFromState）中错误地排除了该字段。）'
      )
    }

    return _state
  },
  // ==============以下函数式getter可能会被取消，不建议使用=============
  getLoading: state => (moduleName, submoduleName = '') => {
    return (state[moduleName][submoduleName] ?? state[moduleName]).loading
  },
  getVisible: state => (moduleName, stateName) => state[moduleName][stateName],
  getCurrentItem: state => moduleName => state[moduleName].currentItem,
  getPagination: state => moduleName => state[moduleName].pagination,
  getSelectedRowKeys: state => moduleName => state[moduleName].selectedRowKeys,
  getSelectedRows: state => moduleName => state[moduleName].selectedRows,
  getList: state => moduleName => state[moduleName]?.list ?? [],
  getDetails: state => moduleName => state[moduleName]?.details ?? {},
  getSearch: state => moduleName => state[moduleName].search
  // ===================================================================
}
