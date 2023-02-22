export default {
  getState: state => (stateName, moduleName, submoduleName = '') => {
    return (state[moduleName][submoduleName] ?? state[moduleName])[stateName]
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
