/**
 * 分页混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:32:23
 */

import { mapGetters } from 'vuex'
import { omit } from 'lodash'

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
     * 是否导入本页面路由的 query 作为请求分页数据的参数。非子模块默认true，子模块默认false。
     */
    injectQuery: {
      type: Boolean,
      default: false
    },
    /**
     * 是否在子模块的分页请求参数中注入父级模块的 store.state.search 搜索对象。仅在子模块内的分页请求生效。
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
      _injectQuery: null,
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
    },
    attributes() {
      return {
        props: omit({
          ...this.paginationProps,
          ...this.pagination
        }, ['pageIndex']),
        on: this.paginationOn
      }
    }
  },
  watch: {
    injectQuery: {
      immediate: true,
      handler(value) {
        if (typeof value !== 'boolean') {
          // 非子模块默认true，子模块默认false。
          this._injectQuery = !this.submoduleName
        } else {
          this._injectQuery = this.injectQuery
        }
      }
    }
  },
  methods: {
    async fetchList(pageIndex, pageSize) {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        customApiName: this.customApiName,
        additionalQueryParameters: {
          pageIndex,
          pageSize,
          // 读取本页面路由内 query 内的参数
          ...(this._injectQuery ? this.$route.query : {}),
          // 如果在子模块内引用了本组件，读取本页面父模块的搜索对象（store.state.search）
          ...(this.injectParentSearch && this.submoduleName ? this.$store.state[this.moduleName]?.search : {}),
          // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
          // 请根据参数的来源自行决定采用哪种方式定义，如vue 组件的 provide/inject、props、data 或 computed 等方式。
          ...(this.additionalQueryParameters || {})
        }
      })
    },
    /**
     * 翻页触发
     * @param page {number}
     * @param pageSize {number}
     */
    async onPaginationChange(page, pageSize) {
      await this.fetchList(page - 1, pageSize)
    },
    /**
     * 每页显示条数改变后触发
     * @param currentPage {number}
     * @param size {number}
     */
    async onSizeChange(currentPage, size) {
      // 改变每页显示条数后，回到第一页
      await this.fetchList(0, size)
    }
  }
}
