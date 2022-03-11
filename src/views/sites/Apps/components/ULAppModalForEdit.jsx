import { Button, Form, Input, Modal, Select, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import './assets/styles/index.scss'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  inject: ['moduleName'],
  data() {
    return {
      okText: '提交',
      maskClosable: false
    }
  },
  computed: {
    ...mapGetters({
      getEditModalVisible: 'getEditModalVisible',
      current: 'getCurrent'
    }),
    title() {
      return this.current.id ? '编辑' : '新增'
    },
    visible() {
      return this.getEditModalVisible(this.moduleName)
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // todo 修改或新增
        }
      })
    },
    async onCancel() {
      await dispatch(this.moduleName, 'setModalStateForEdit', false)
    }
  },
  render() {
    const attributes = {
      props: this.$data,
      on: {
        cancel: this.onCancel,
        ok: this.onSubmit
      }
    }

    return (
      <Modal
        title={`${this.title}站点`}
        visible={this.visible}
        // confirmLoading={}
        {...attributes}
      >
        <Form
          class="uni-log-app-edit-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="站点名称">
            {
              this.form.getFieldDecorator('appName')(
                <Input placeholder="请输入站点名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status')(
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
})
