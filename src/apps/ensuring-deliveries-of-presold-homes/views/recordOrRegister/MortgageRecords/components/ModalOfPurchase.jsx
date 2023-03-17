import { Form, InputNumber, Space } from 'ant-design-vue'
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
              customApiName: 'hypothecateRecordPurchase',
              customDataHandler: this.customDataHandler,
              done: this.done
            })
        }
      }
    },
    property() {
      let developerName, projectName

      if (this.currentItem.developerName) {
        developerName = this.currentItem.developerName + ' / '
      } else {
        developerName = ''
      }

      if (this.currentItem.projectName) {
        projectName = this.currentItem.projectName + ' / '
      } else {
        projectName = ''
      }

      return developerName + projectName + this.currentItem.easteName || '请编辑资产信息'
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

      data.id = this.currentItem.id

      return data
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="收购资产">{this.property}</Form.Item>
          <Form.Item label="评估价值">
            {
              this.currentItem.assessMoney
            }万
          </Form.Item>
          <Form.Item label="收购金额">
            {
              this.form.getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入单价！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  max={999999999999999}
                  min={0}
                  formatter={value => `${value}元`}
                  parser={value => value.replace('元', '')}
                  placeholder="请输入单价"
                  style={'width:60%'}
                  allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
