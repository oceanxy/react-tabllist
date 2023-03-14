import { Input, Form } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 500,
        destroyOnClose: true
      }
    }
  },
  computed: {
    organTree() {
      return this.$store.state[this.moduleName].organTree?.list || []
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit(
            {
              isFetchList: false,
              customApiName: 'resetPwd',
              customDataHandler: this.customDataHandler,
              done: this.done
            }
          )
        }
      }
    }
  },
  methods: {

    async done() {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        customApiName: this.customApiName
      })
    },
    customDataHandler(values) {
      const data = cloneDeep(values)

      data.ids = this.currentItem.id

      return data
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="新密码">
            {
              this.form.getFieldDecorator('pwd', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入6~16位字符！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input maxLength={16} placeholder="请输入新密码" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
