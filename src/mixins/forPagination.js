/**
 * 分页混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:32:23
 */

import { mapGetters } from 'vuex'

export default {
  inject: {
    moduleName: { default: undefined },
    submoduleName: { default: undefined }
  },
  props: {
    /**
     * 请求数据的自定义接口
     */
    customApiName: {
      type: String,
      default: ''
    },
    /**
     * 是否注入父级模块的 state.search 搜索参数。依赖 submoduleName，默认 false
     * 一般用于子模块请求数据的接口需要附带父模块参数的情况
     */
    injectParentSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },
      paginationOn: {
        change: this.onPaginationChange,
        showSizeChange: this.onSizeChange
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    pagination() {
      let pagination = this.getState('pagination', this.moduleName, this.submoduleName)

      pagination = {
        ...pagination,
        current: pagination.pageIndex + 1
      }

      return pagination
    }
  },
  methods: {
    /**
     * 翻页触发
     * @param page {number}
     * @param pageSize {number}
     */
    async onPaginationChange(page, pageSize) {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        customApiName: this.customApiName,
        additionalQueryParameters: {
          pageIndex: page - 1,
          pageSize,
          ...this.submoduleName
            ? this.$store.state[this.moduleName].search
            : {}
        }
      })
    },
    /**
     * 每页显示条数改变后触发
     * @param currentPage {number}
     * @param size {number}
     */
    async onSizeChange(currentPage, size) {
      // 改变每页显示条数后，回到第一页
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: {
          pageIndex: 0,
          pageSize: size
        }
      })
    }
  }
}
