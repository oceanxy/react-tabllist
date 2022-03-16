/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 新增/编辑弹窗
 * @Date: 2022-03-14 周一 15:43:52
 */

import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { message } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  data() {
    return {
      title: '新增',
      modalProps: {
        okText: '提交',
        maskClosable: false,
        confirmLoading: false,
        width: 600
      },
      current: {}
    }
  },
  computed: {
    ...mapGetters({
      getEditModalVisible: 'getEditModalVisible',
      getCurrent: 'getCurrent'
    }),
    visible() {
      return this.getEditModalVisible(this.moduleName)
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.current = this.getCurrent(this.moduleName)
        this.title = this.current.id ? '编辑' : '新增'
      } else {
        this.form.resetFields()
      }
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields(async(err, values) => {
        if (!err) {
          this.modalProps.confirmLoading = true

          let status
          const data = {
            ...values,
            status: values.status ? 1 : 2
          }

          // 存在ID，目前为编辑模式
          if (this.current?.id) {
            data.id = this.current.id
            status = await dispatch(this.moduleName, 'update', data)
          } else /* 新增模式 */ {
            status = await dispatch(this.moduleName, 'add', data)
          }

          if (status) {
            message.success('操作成功！')
          }

          this.modalProps.confirmLoading = false
        }
      })
    },
    async onCancel() {
      await dispatch(this.moduleName, 'setModalStateForEdit', false)
    }
  }
}
