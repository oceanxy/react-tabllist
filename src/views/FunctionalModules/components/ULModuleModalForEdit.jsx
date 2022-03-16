import { Form, Input, Modal, Select } from 'ant-design-vue'
import editForm from '@/mixins/editForm'
import { mapState } from 'vuex'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [editForm],
  data() {
    return {
      modalProps: {
        width: 400
      }
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      props: this.modalProps,
      on: {
        cancel: this.onCancel,
        ok: this.onSubmit
      }
    }

    return (
      <Modal
        title={`${this.title}模块`}
        visible={this.visible}
        {...attributes}
      >
        <Form
          class="uni-log-functional-modules-edit-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          colon={false}
        >
          <Form.Item label="所属站点">
            {
              this.form.getFieldDecorator('appId', {
                initialValue: this.current.appId,
                rules: [{ required: true, message: '请选择所属站点!', trigger: 'change' }]
              })(
                <Select placeholder="请选择所属站点" allowClear>
                  {
                    this.allSiteApps.map(item => (
                      <Select.Option value={item.id}>
                        {item.appName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="父级模块">
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.current.parentId,
                rules: [{ required: true, message: '请输入域名称!', trigger: 'change' }]
              })(
                <Select placeholder="请选择所属站点" allowClear>
                  {
                    this.allFunctionalModules.map(item => (
                      <Select.Option value={item.id}>
                        {item.moduleName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="模块名称">
            {
              this.form.getFieldDecorator('moduleName', {
                initialValue: this.current.moduleName,
                rules: [{ required: true, message: '请输入模块名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入模块名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="模块描述">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.current.remark
              })(
                <Input placeholder="请输入模块描述" type="textarea" />
              )
            }
          </Form.Item>
          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.current.sortIndex || 0
              })(
                <Input placeholder="请输入排序" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
})
