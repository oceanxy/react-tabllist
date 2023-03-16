import { Form, DatePicker } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 610 } }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit(
            {
              isFetchList: false,
              customApiName: 'rescindContract',
              customDataHandler: this.customDataHandler,
              done: this.done
            })
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
      const str = data.rescindContract.replaceAll('-', '')

      data.id = this.currentItem.id
      data.rescindContract = Number(str)

      return data
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="解除资产">
            {
              this.currentItem.estateName
            }
          </Form.Item>
          <Form.Item label="解除时间">
            {
              this.form.getFieldDecorator('rescindContract', {
                rules: [
                  {
                    required: true,
                    message: '请选择解除时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  placeholder={'选择解除时间'}
                  valueFormat={'YYYY-MM-DD'}
                  style="width: 100%"
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
