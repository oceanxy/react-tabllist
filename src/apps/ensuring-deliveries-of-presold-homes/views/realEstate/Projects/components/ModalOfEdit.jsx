import { Button, Cascader, Empty, Form, Input, InputNumber, Radio, Select, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce, range } from 'lodash'
import { defineAsyncComponent } from 'vue'
import TGUploadFile from '@/components/TGUploadFile'
import MultiInputOfStepRateList from './MultiInputOfStepRateList'
import MultiInputOfAmountBorrowed from './MultiInputOfAmountBorrowed'
import MultiInputOfSettlementDate from './MultiInputOfSettlementDate'
import MultiInputOfRepaymentPlanList from './MultiInputOfRepaymentPlanList'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1000,
        destroyOnClose: true
      },
      keywordOfSearchDevelopers: ''
    }
  },
  computed: {
    loadingDetails() {
      return this.$store.state[this.moduleName].loadingDetails
    },
    natureOfAssets() {
      return this.$store.state[this.moduleName].natureOfAssets
    },
    enumOfDevelopers() {
      return this.$store.state[this.moduleName].enumOfDevelopers
    },
    administrativeDivision() {
      return this.$store.state['common'].administrativeDivision
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

              data.provinceId = value.districtList[0].id
              data.provinceName = value.districtList[0].name
              data.cityId = value.districtList[1].id
              data.cityName = value.districtList[1].name
              data.areaId = value.districtList[2].id
              data.areaName = value.districtList[2].name
              data.contract = value.contract[0].response?.data[0] ?? value.contract[0].raw

              debugger

              return data
            },
            // 为其他模块调用本弹窗做适配
            ...(this.moduleName === 'projects' ? {} : {
              customApiName: 'addProjects',
              isFetchList: false,
              done: response => {
                this.restoreCurrentItem(response.data)
              }
            })
          })
        }
      }
    },
    /**
     * 获取异步组件
     * 注意该计算属性在 render 内的调用（计算属性的调用使用了括号，是因为这里返回了一个函数）
     * @returns {function(): *}
     */
    modalOfDeveloper() {
      const ModalOfDeveloper = defineAsyncComponent(() => import('../../Developers/components/ModalOfEdit'))

      return () => (
        <ModalOfDeveloper modalTitle={'{action}开发商'} visibilityFieldName={'visibilityOfDeveloper'} />
      )
    },
    modalOfRepaymentPlanPreview() {
      const ModalOfRepaymentPlanPreview = defineAsyncComponent(() => import('./ModalOfRepaymentPlanPreview'))

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
          if (!this.administrativeDivision.length) {
            await this.$store.dispatch('common/getAdministrativeDivision')
          }

          if (this.currentItem.id) {
            // 初始化表单内的模糊查询结果，编辑模式下用列表的值作为默认值
            this.setState(
              'enumOfDevelopers',
              this.currentItem.id
                ? [
                  {
                    id: this.currentItem.developerId,
                    fullName: this.currentItem.developerName
                  }
                ]
                : []
            )

            // 获取详情数据
            await this.$store.dispatch('getDetails', {
              moduleName: this.moduleName,
              payload: { id: this.currentItem.id }
            })

            // 回填
            this.form.setFieldsValue({
              districtList: [
                { id: this.details.provinceId, name: this.details.provinceName },
                { id: this.details.cityId, name: this.details.cityName },
                { id: this.details.areaId, name: this.details.areaName }
              ],
              address: this.details.address,
              status: !isNaN(this.details.status) ? this.details.status === 1 : true,
              moneyValueList: this.details.moneyValueList || [],
              principalRepaymentPlanList: this.details.principalRepaymentPlanList || [],
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
    restoreCurrentItem(project) {
      // 为其他模块调用本弹窗做适配，关闭弹窗恢复 currentItem
      if (this.moduleName !== 'projects') {
        this.$store.commit('setState', {
          value: {
            ...this.currentItem._currentItem,
            ...(
              project
                ? {
                  projectId: project.id,
                  projectName: project.projectName
                }
                : {}
            )
          },
          moduleName: this.moduleName,
          stateName: 'currentItem'
        })

        if (project) {
          this.$store.commit('setState', {
            value: {
              loading: false,
              list: [
                {
                  id: project.id,
                  projectName: project.projectName
                }
              ]
            },
            moduleName: this.moduleName,
            stateName: 'enumOfProjects'
          })
        }
      }
    },
    setState(stateName, value = []) {
      this.$store.commit('setState', {
        value: { loading: false, list: value },
        moduleName: this.moduleName,
        stateName
      })
    },
    async onSearchForDeveloper(keyword) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('enumOfDevelopers')

      this.keywordOfSearchDevelopers = keyword

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'enumOfDevelopers',
        customApiName: 'getEnumOfDevelopers',
        payload: { fullName: keyword }
      })
    },
    async onAddDeveloper() {
      await this._setVisibilityOfModal({
        fullName: this.keywordOfSearchDevelopers,
        _currentItem: this.currentItem
      }, 'visibilityOfDeveloper')
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.loadingDetails}>
          <Form class="tg-form-grid" colon={false}>
            <Form.Item label="开发商" class={'half'}>
              {
                this.form.getFieldDecorator('developerId', {
                  initialValue: this.currentItem.developerId,
                  rules: [
                    {
                      required: true,
                      message: '请输入开发商名称！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder={'请选择开发商（可搜索）'}
                    onSearch={debounce(this.onSearchForDeveloper, 300)}
                    filterOption={false}
                    disabled={this.currentItem.isEdit === 0}
                    notFoundContent={
                      this.enumOfDevelopers.loading
                        ? <Spin />
                        : this.keywordOfSearchDevelopers && !this.enumOfDevelopers.list.length
                          ? (
                            <span>查无此开发商，<Button
                              type={'link'}
                              onClick={this.onAddDeveloper}
                            >
                              新增开发商
                            </Button>。</span>
                          )
                          : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                  >
                    {
                      this.enumOfDevelopers.list.map(item => (
                        <Select.Option value={item.id}>{item.fullName}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="项目名称" class={'half'}>
              {
                this.form.getFieldDecorator('projectName', {
                  initialValue: this.currentItem.projectName,
                  rules: [
                    {
                      required: true,
                      message: '请输入项目名称！',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入项目名称"
                    allowClear
                    maxLength={30}
                    disabled={!this.form.getFieldValue('developerId') || this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="地址" class={'half'}>
              {
                this.form.getFieldDecorator('districtList', {
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请选择地址！',
                      trigger: 'change'
                    }
                  ],
                  initialValue: [],
                  getValueFromEvent: (value, selectedOptions) => (selectedOptions || []).map(item => ({
                    id: item.id,
                    name: item.name
                  })),
                  getValueProps: val => ({ value: val.map(i => i.id) })
                })(
                  <Cascader
                    placeholder="请选择省、市和区"
                    expandTrigger={'hover'}
                    allowClear
                    disabled={this.currentItem.isEdit === 0}
                    fieldNames={{
                      label: 'name',
                      value: 'id',
                      children: 'children'
                    }}
                    options={this.administrativeDivision}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="详细地址">
              {
                this.form.getFieldDecorator('address', { initialValue: undefined })(
                  <Input
                    placeholder="请输入详细地址"
                    allowClear
                    maxLength={30}
                    disabled={this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="有无借款" class={'half'}>
              {
                this.form.getFieldDecorator(
                  'isBorrow',
                  {
                    initialValue: this.currentItem.isBorrow ?? 1,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请选择有无借款!',
                        trigger: 'change'
                      }
                    ]
                  }
                )(
                  <Radio.Group disabled={this.currentItem.isEdit === 0}>
                    <Radio value={1}>有</Radio>
                    <Radio value={0}>无</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            {
              this.form.getFieldValue('isBorrow') === 1
                ? [
                  <Form.Item label="借款合同" class={'half'}>
                    {
                      this.form.getFieldDecorator('contract', {
                        initialValue: [],
                        rules: [
                          {
                            required: true,
                            type: 'array',
                            message: '请上传借款合同！',
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
                  <Form.Item label="借款金额">
                    {
                      this.form.getFieldDecorator('moneyValueList', {
                        initialValue: [],
                        rules: [
                          {
                            required: true,
                            type: 'array',
                            message: '请输入完整的借款金额！',
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
                          disabled={this.currentItem.isEdit === 0}
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
                          disabled={this.currentItem.isEdit === 0}
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
                            message: '请输入完整的还款计划！',
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
                                  callback(new Error('每一笔借款的本金比例之和应等于100%！'))
                                }
                              }

                              callback()
                            }
                          }
                        ]
                      })(
                        <MultiInputOfRepaymentPlanList
                          disabled={this.currentItem.isEdit === 0}
                          projectSegmentRateList={this.form.getFieldValue('projectSegmentRateList')}
                          moneyValueList={this.form.getFieldValue('moneyValueList')}
                        />
                      )
                    }
                  </Form.Item>
                ]
                : null
            }
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
        {this.modalOfDeveloper()}
        {this.modalOfRepaymentPlanPreview()}
      </DragModal>
    )
  }
})
