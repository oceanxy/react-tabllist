/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 分页
 * @Date: 2022-03-10 周四 16:32:23
 */

import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  data() {
    return {
      current: 1,
      total: 0,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      on: {
        change: this.onPaginationChange,
        showSizeChange: this.onSizeChange
      }
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].pagination,
      pagination => {
        this.current = pagination.pageIndex + 1
        this.total = pagination.total
        this.pageSize = pagination.pageSize
      })
  },
  methods: {
    /**
     * 翻页触发
     * @param page
     * @param pageSize
     */
    onPaginationChange(page, pageSize) {
      dispatch(this.moduleName, 'getList', {
        pageIndex: page - 1,
        pageSize
      })
    },
    /**
     * 每页显示条数改变后触发
     * @param current
     * @param size
     */
    onSizeChange(current, size) {
      // 改变每页显示条数后，回到第一页
      dispatch({
        pageIndex: 0,
        pageSize: size
      })
    }
  }
}
