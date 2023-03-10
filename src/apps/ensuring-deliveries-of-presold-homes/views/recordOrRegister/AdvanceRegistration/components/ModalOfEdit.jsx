import { DatePicker, Form, InputNumber, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      estateListByName: []
    }
  },
  computed: {
    natureOfTheEnterprise() {
      return this.$store.state[this.moduleName].natureOfTheEnterprise
    },
    administrativeDivision() {
      return this.$store.state['common'].administrativeDivision
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit(
            {
              customDataHandler: value => {
                const data = cloneDeep(value)
                const str = data.contractDate.replaceAll('-', '')

                data.contractDate = Number(str)

                return data
              }
            }
          )


        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          const res = await apis.getEstateListByName()

          if (res.status) {
            this.estateListByName = res.data || []
          }
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="选择资产" class={'half'}>
            {
              this.form.getFieldDecorator('estateId', {
                initialValue: this.currentItem.estateId,
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选择资产！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请选择资产"
                >
                  {
                    this.estateListByName?.map(item => (
                      <Select.Option value={item.id}>{item.easteName}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="备案单价" class={'half'}>
            {
              this.form.getFieldDecorator('recordSingle', {
                initialValue: this.currentItem.recordSingle,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入单价！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber max={99999999} placeholder="请输入单价" style={'width:100%'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="备案总价" class={'half'}>
            {
              this.form.getFieldDecorator('recordTotal', {
                initialValue: this.currentItem.recordTotal,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入总价！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber max={99999999} placeholder="请输入总价" style={'width:100%'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="签约时间" class={'half'}>
            {
              this.form.getFieldDecorator('contractDate', {
                initialValue: this.currentItem.contractDate,
                rules: [
                  {
                    required: true,
                    message: '请选择签约时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  placeholder={'选择签约时间'}
                  valueFormat={'YYYY-MM-DD'}
                  style="width: 100%"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
