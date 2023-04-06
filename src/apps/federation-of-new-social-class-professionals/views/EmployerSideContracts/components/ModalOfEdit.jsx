import { Button, Form, Input, InputNumber, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, flatten, range } from 'lodash'
import { defineAsyncComponent } from 'vue'
import TGUploadFile from '@/components/TGUploadFile'
import MultiInputOfStepRateList from '../../realEstate/Projects/components/MultiInputOfStepRateList'
import MultiInputOfAmountBorrowed from '../../realEstate/Projects/components/MultiInputOfAmountBorrowed'
import MultiInputOfSettlementDate from '../../realEstate/Projects/components/MultiInputOfSettlementDate'
import MultiInputOfPrincipalRepayment from '../../realEstate/Projects/components/MultiInputOfPrincipalRepayment'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1000,
        destroyOnClose: true
      }
    }
  },
  computed: {
    loadingDetails() {
      return this.$store.state[this.moduleName].loadingDetails
    },
    attributes() {
      return {
        attrs: this.currentItem.isEdit !== 0
          ? this.modalProps
          : {
            ...this.modalProps,
            footer: <Button onClick={this.onCancel} title={'关闭'}>关闭</Button>
          },
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.contract = value.contract[0].response?.data[0] ?? value.contract[0].raw
              data.principalRepaymentPlanList = flatten(value.principalRepaymentPlanList)

              return data
            }
          })
        }
      }
    },
    modalOfRepaymentPlanPreview() {
      const ModalOfRepaymentPlanPreview = defineAsyncComponent(
        () => import('../../realEstate/Projects/components/ModalOfRepaymentPlanPreview')
      )

      return () => (
        <ModalOfRepaymentPlanPreview
          modalTitle={'预览还款计划'}
          visibilityFieldName={'visibilityOfRepaymentPlanPreview'}
        />
      )
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (this.currentItem.id) {
            // 获取详情数据
            await this.$store.dispatch('getDetails', {
              moduleName: this.moduleName,
              payload: { id: this.currentItem.id }
            })

            // 回填
            this.form.setFieldsValue({
              status: !isNaN(this.details.status) ? this.details.status === 1 : true,
              moneyValueList: this.details.moneyValueList || [],
              principalRepaymentPlanList: this.details.principalRepaymentPlanList.reduce((result, item) => {
                if (!Array.isArray(result[item.moneyPeriod - 1])) {
                  result[item.moneyPeriod - 1] = []
                }

                result[item.moneyPeriod - 1].push(item)

                return result
              }, []) ?? [],
              projectSegmentRateList: this.details.projectSegmentRateList || [],
              interestRepaymentPlanList: this.details.interestRepaymentPlanList ||
                range(0, 2).map((item, index) => ({
                  period: index + 1,
                  repaymentEndDay: ['0613', '1213'][index]
                })),
              contract: this.details.contract
                ? [
                  {
                    uid: 'contract',
                    key: this.details.contract.key,
                    url: this.details.contract.path,
                    status: 'done',
                    name: this.details.contract.fileName,
                    raw: this.details.contract
                  }
                ] : []
            })
          } else {
            this.form.setFieldsValue({
              interestRepaymentPlanList: this.details.interestRepaymentPlanList ||
                range(0, 2).map((item, index) => ({
                  period: index + 1,
                  repaymentEndDay: ['0613', '1213'][index]
                }))
            })
          }
        }
      }
    }
  },
  methods: {
    setState(stateName, value = []) {
      this.$store.commit('setState', {
        value: { loading: false, list: value },
        moduleName: this.moduleName,
        stateName
      })
    },
    async onPreview() {
      await this._setVisibilityOfModal(
        {
          _currentItem: this.currentItem,
          moneyValueList: this.form.getFieldValue('moneyValueList'),
          projectSegmentRateList: this.form.getFieldValue('projectSegmentRateList'),
          interestRepaymentPlanList: this.form.getFieldValue('interestRepaymentPlanList'),
          principalRepaymentPlanList: flatten(this.form.getFieldValue('principalRepaymentPlanList'))
        },
        'visibilityOfRepaymentPlanPreview'
      )
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.loadingDetails}>
          <Form class="tg-form-grid" colon={false}>
            <Form.Item label="合同编号" class={'half'}>
              {
                this.form.getFieldDecorator('contractNo', {
                  initialValue: this.currentItem.contractNo,
                  rules: [
                    {
                      required: true,
                      message: '请输入合同编号！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入合同编号"
                    allowClear
                    maxLength={50}
                    disabled={this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="合同名称" class={'half'}>
              {
                this.form.getFieldDecorator('contractName', {
                  initialValue: this.currentItem.contractName,
                  rules: [
                    {
                      required: true,
                      message: '请输入合同名称！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入合同名称"
                    allowClear
                    maxLength={30}
                    disabled={this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="合同" class={'half'}>
              {
                this.form.getFieldDecorator('contract', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请上传合同！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <TGUploadFile
                    form={this.form}
                    limit={1}
                    accept={'.doc,.docx,.pdf'}
                    disabled={this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>,
            <Form.Item label="放款金额">
              {
                this.form.getFieldDecorator('moneyValueList', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请输入完整的放款金额！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <MultiInputOfAmountBorrowed disabled={this.currentItem.isEdit === 0} />
                )
              }
            </Form.Item>,
            <Form.Item label="分段利率">
              {
                this.form.getFieldDecorator('projectSegmentRateList', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请输入完整的分段利率！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <MultiInputOfStepRateList
                    amountBorrowed={this.form.getFieldValue('moneyValueList')}
                    disabled={this.currentItem.isEdit === 0 || !this.form.getFieldValue('moneyValueList').length}
                  />
                )
              }
            </Form.Item>,
            <Form.Item label="结息日">
              {
                this.form.getFieldDecorator('interestRepaymentPlanList', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请输入完整的结息日信息！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <MultiInputOfSettlementDate
                    disabled={this.currentItem.isEdit === 0 || !this.form.getFieldValue('moneyValueList').length}
                  />
                )
              }
            </Form.Item>,
            <Form.Item label="本金还款日">
              {
                this.form.getFieldDecorator('principalRepaymentPlanList', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请输入完整的本金还款计划！',
                      trigger: 'change'
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (Array.isArray(value)) {
                          const _value = value.map(item => {
                            return item.reduce((total, i) => {
                              total += i.percent

                              return total
                            }, 0)
                          }).filter(item => item === 100)

                          const moneyValueListLength = this.form.getFieldValue('moneyValueList').length

                          // 校验还款本金比例是否等于100
                          if (
                            (moneyValueListLength && _value.length !== moneyValueListLength) ||
                            !_value.length
                          ) {
                            callback(new Error('每一笔借款的本金比例之和都应等于100%！'))
                          }
                        }

                        callback()
                      }
                    }
                  ]
                })(
                  <MultiInputOfPrincipalRepayment
                    disabled={this.currentItem.isEdit === 0}
                    amountBorrowed={this.form.getFieldValue('moneyValueList')}
                    isPreview={
                      !!this.form.getFieldValue('moneyValueList').length &&
                      !!this.form.getFieldValue('projectSegmentRateList').length &&
                      !!this.form.getFieldValue('interestRepaymentPlanList').length
                    }
                    onPreview={this.onPreview}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="备注">
              {
                this.form.getFieldDecorator('remark', { initialValue: this.currentItem.remark })(
                  <Input.TextArea
                    placeholder="请输入备注"
                    allowClear
                    disabled={this.currentItem.isEdit === 0}
                    maxLength={100}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="排序" class={'half'}>
              {
                this.form.getFieldDecorator('sortIndex', {
                  initialValue: this.currentItem.sortIndex || 0,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请输入排序！',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="请输入排序"
                    disabled={this.currentItem.isEdit === 0}
                    max={10000}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="状态" class={'half'}>
              {
                this.form.getFieldDecorator('status', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch disabled={this.currentItem.isEdit === 0} />
                )
              }
            </Form.Item>
          </Form>
        </Spin>
        {this.modalOfRepaymentPlanPreview()}
      </DragModal>
    )
  }
})
