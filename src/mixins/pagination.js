import { dispatch } from '@/utils/store'

/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 分页
 * @Date: 2022-03-10 周四 16:32:23
 */

export default {
  computed: {
    pagination() {
      const { pagination, total } = this.$store.state[this.moduleName]

      return {
        current: pagination.pageIndex + 1,
        total: total,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onChange: this.onPaginationChange,
        onShowSizeChange: this.onPaginationChange
      }
    }
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
