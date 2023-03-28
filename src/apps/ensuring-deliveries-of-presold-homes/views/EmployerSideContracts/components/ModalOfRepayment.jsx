import { DatePicker, Form, Input, InputNumber, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'
import TGUploadFile from '@/components/TGUploadFile'
import moment from 'moment'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        destroyOnClose: true
      }
    }
  },
  computed: {
    repaymentPlanList() {
      return this.$store.state[this.moduleName].repaymentPlanList
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({
            customApiName: 'repayment',
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.id = this.currentItem.id
              data.refundDate = moment.isMoment(data.refundDate) ? data.refundDate.format('YYYYMMDD') : data.refundDate
              data.refundCertificate = value.refundCertificate[0]?.response?.data[0]

              return data
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id },
            stateName: 'repaymentPlanList',
            customApiName: 'getListOfRepaymentPlan'
          })
        }
      }
    }
  },
  methods: {},
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="合同编号" class={'half'}>
            {this.currentItem.contractNo}
          </Form.Item>
          <Form.Item label="合同名称" class={'half'}>
            {this.currentItem.contractName}
          </Form.Item>
          <Form.Item label="还款期次">
            <Spin spinning={this.repaymentPlanList.loading}>
              {
                this.form.getFieldDecorator('planId', {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择还款期次！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Select placeholder="请选择还款期次">
                    {
                      this.repaymentPlanList.list.map(item => (
                        <Select.Option value={item.id}>{item.description}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Spin>
          </Form.Item>
          <Form.Item label="实际还款日期" class={'half'}>
            {
              this.form.getFieldDecorator('refundDate', {
                initialValue: moment(),
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选择实际还款日期！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  style={'width: 100%'}
                  placeholder="实际还款日期"
                  valueFormat={'YYYYMMDD'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="罚息金额" class={'half'}>
            {
              this.form.getFieldDecorator('interestPenalty', { initialValue: 0 })(
                <InputNumber
                  style={'width: 100%'}
                  min={0}
                  max={1000000000000}
                  precision={2}
                  placeholder="罚息金额"
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }
          </Form.Item>
          <Form.Item label="还款凭证" class={'half'}>
            {
              this.form.getFieldDecorator('refundCertificate', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请上传还款凭证！',
                    trigger: 'change'
                  }
                ]
              })(
                <TGUploadFile
                  limit={1}
                  form={this.form}
                  action={'/mgapi/system/upload/upload'}
                  accept={'.pdf,.jpg,.png,.jpeg'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', { initialValue: this.currentItem.remark })(
                <Input.TextArea placeholder="请输入备注" allowClear maxLength={10000} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
