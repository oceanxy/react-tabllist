/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 分页
 * @Date: 2022-03-10 周四 16:32:23
 */

import { dispatch } from '@/utils/store'

export default {
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
        showSizeChange: this.onPaginationChange
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
    onPaginationChange(current, pageSize) {
      dispatch(this.moduleName, 'getSiteApps', {
        pageIndex: current - 1,
        pageSize
      })
    }
  }
}
