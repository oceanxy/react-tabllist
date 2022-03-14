export default {
  getLoading: state => moduleName => state[moduleName].loading,
  getEditModalVisible: state => moduleName => state[moduleName].editModalVisible,
  getCurrent: state => moduleName => state[moduleName].current,
  getPagination: state => moduleName => state[moduleName].pagination,
  getSelectedRowKeys: state => moduleName => state[moduleName].selectedRowKeys,
  getSelectedRows: state => moduleName => state[moduleName].selectedRows,
  getList: state => moduleName => state[moduleName].list,
  getSearch: state => moduleName => state[moduleName].search
}
