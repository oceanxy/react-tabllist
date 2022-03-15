/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格功能按钮
 * @Date: 2022-03-14 周一 15:43:52
 */

import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'
import { message } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      selectedRows: {}
    }
  },
  computed: mapGetters({ getSelectedRows: 'getSelectedRows' }),
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].selectedRows,
      selectedRows => {
        this.editButtonDisabled = selectedRows.length !== 1
        this.deleteButtonDisabled = !selectedRows.length

        if (selectedRows.length === 1) {
          this.selectedRows = selectedRows[0]
        }
      }
    )
  },
  methods: {
    async onAddClick(record) {
      if (record) {
        await dispatch(this.moduleName, 'setCurrent', {
          parentId: record.parentId
        })
      } else {
        await dispatch(this.moduleName, 'setCurrent', {})
      }
      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    async onEditClick() {
      await dispatch(this.moduleName, 'setCurrent', { ...this.selectedRows })
      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    async onDeleteClick() {
      const status = await dispatch(this.moduleName, 'delete')

      if (status) {
        message.success('删除成功！')
      }
    }
  }
}
