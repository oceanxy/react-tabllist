export default {
  getLoading: state => moduleName => state[moduleName].loading,
  getEditModalVisible: state => moduleName => state[moduleName].editModalVisible,
  getCurrent: state => moduleName => state[moduleName].current,
  getPagination: state => moduleName => state[moduleName].pagination
}
