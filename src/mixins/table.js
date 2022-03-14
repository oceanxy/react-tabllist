/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格
 * @Date: 2022-03-14 周一 16:08:37
 */

import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash'

export default {
  inject: ['moduleName'],
  data() {
    return {
      tableProps: {
        columns: [],
        rowSelection: {
          selections: true,
          // fixed: true,
          columnWidth: 50,
          onChange: this.onRowSelectionChange
        },
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'small'
      }
    }
  },
  computed: {
    ...mapGetters({ getLoading: 'getLoading' })
  },
  async created() {
    // 为 list 创建动态侦听器
    this.$watch(
      () => this.$store.state[this.moduleName].list,
      async list => {
        this.tableProps.dataSource = list

        this.resize()
      }
    )

    await this.fetchList()
  },
  mounted() {
    window.addEventListener('resize', this.resize)

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize)
    })
  },
  methods: {
    async fetchList() {
      await dispatch(this.moduleName, 'getList')
    },
    async onStatusChange(checked, record) {
      const status = await dispatch(this.moduleName, 'updateStatus', {
        id: record.id,
        status: checked ? 1 : 2
      })

      // 更新当前行受控Switch组件的值
      const index = this.tableProps.dataSource.findIndex(item => item.id === record.id)
      this.$set(this.tableProps.dataSource[index], 'status', checked ? 1 : 2)

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 的状态已更新！'
        ])
      } else {
        message.warning([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 的状态未更新！'
        ])
      }
    },
    async onEditClick(record) {
      await dispatch(this.moduleName, 'setCurrent', cloneDeep(record))
      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    async onDeleteClick(record) {
      const status = await dispatch(this.moduleName, 'delete', [record.id])

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 已成功删除！'
        ])
      } else {
        message.warning([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 删除失败！'
        ])
      }
    },
    async onRowSelectionChange(selectedRowKeys, selectedRows) {
      await dispatch(this.moduleName, 'setRowSelected', {
        selectedRowKeys,
        selectedRows
      })
    },
    resize() {
      this.$nextTick(() => {
        this.tableProps.scroll = {
          // x: this.$refs['siteAppsTable'].$el.clientWidth - 17,
          // x: this.$refs['siteAppsTable'].$el.clientWidth,
          y: this.$refs['siteAppsTable'].$el.clientHeight - 54,
          scrollToFirstRowOnChange: true
        }
      })
    }
  }
}
