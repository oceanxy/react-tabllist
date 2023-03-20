import { Button, Cascader, Empty, Form, Input, InputNumber, Radio, Select, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce } from 'lodash'
import { defineAsyncComponent } from 'vue'
import TGUploadFile from '@/components/TGUploadFile'
import MultiInputOfStepRateList from './MultiInputOfStepRateList'
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
              data.ctContract = value.ctContract[0].response?.data[0] ?? value.ctContract[0].raw
              data.devContract = value.devContract[0].response?.data[0] ?? value.devContract[0].raw

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
        <ModalOfRepaymentPlanPreview modalTitle={'预览还款计划'} visibilityFieldName={'visibilityOfRepaymentPlanPreview'} />
      )
    },
    projectSegmentRateList() {
      return this.form.getFieldValue('projectSegmentRateList')
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
              repaymentPlanList: this.details.repaymentPlanList || [],
              projectSegmentRateList: this.details.projectSegmentRateList || [],
              ctContract: this.details.ctContract
                ? [
                  {
                    uid: 'ct-contract',
                    key: this.details.ctContract.key,
                    url: this.details.ctContract.path,
                    status: 'done',
                    name: this.details.ctContract.fileName,
                    raw: this.details.ctContract
                  }
                ] : [],
              devContract: this.details.devContract
                ? [
                  {
                    uid: 'dev-contract',
                    key: this.details.devContract.key,
                    url: this.details.devContract.path,
                    status: 'done',
                    name: this.details.devContract.fileName,
                    raw: this.details.devContract
                  }
                ] : []
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
                this.form.getFieldDecorator('address', {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入详细地址！',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入详细地址"
                    allowClear
                    maxLength={30}
                    disabled={this.currentItem.isEdit === 0}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="有无借款" class={this.form.getFieldValue('isBorrow') === 1 ? 'half' : ''}>
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
                  <Form.Item label="借款金额" class={'half'}>
                    {
                      this.form.getFieldDecorator('moneyValue', {
                        initialValue: this.currentItem.moneyValue,
                        rules: [
                          {
                            required: true,
                            type: 'number',
                            message: '请输入合法的借款金额（最大值一万亿）！',
                            trigger: 'blur'
                          }
                        ]
                      })(
                        <InputNumber
                          placeholder="请输入借款金额"
                          style={'width: 100%'}
                          allowClear
                          disabled={this.currentItem.isEdit === 0}
                          precision={2}
                          formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/￥\s?|(,*)/g, '')}
                          max={1000000000000}
                        />
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
                          disabled={
                            this.currentItem.isEdit === 0 ||
                            !this.form.getFieldValue('moneyValue')
                          }
                        />
                      )
                    }
                  </Form.Item>,
                  <Form.Item label="还款计划">
                    {
                      this.form.getFieldDecorator('repaymentPlanList', {
                        initialValue: [],
                        rules: [
                          {
                            required: true,
                            type: 'array',
                            message: '请输入完整的还款计划！',
                            trigger: 'change'
                          },
                          {
                            validator(rule, value, callback) {
                              if (value) {
                                const _value = value.reduce((total, item) => {
                                  if (item.repaymentType === 1) {
                                    total += item.percent
                                  }

                                  return total
                                }, 0)

                                // 校验还款本金比例是否等于100
                                if (_value < 100) {
                                  callback(new Error('本金比例之和应等于100%！'))
                                }
                              }

                              callback()
                            }
                          }
                        ]
                      })(
                        <MultiInputOfRepaymentPlanList
                          disabled={
                            this.currentItem.isEdit === 0 ||
                            !this.projectSegmentRateList.length ||
                            !this.form.getFieldValue('moneyValue')
                          }
                          projectSegmentRateList={this.projectSegmentRateList}
                          amountBorrowed={this.form.getFieldValue('moneyValue') || 0}
                        />
                      )
                    }
                  </Form.Item>
                ]
                : null
            }
            <Form.Item label="市城投合同" class={'half'}>
              {
                this.form.getFieldDecorator('ctContract', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请上传市城投合同！',
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
            </Form.Item>
            <Form.Item label="开发商合同" class={'half'}>
              {
                this.form.getFieldDecorator('devContract', {
                  initialValue: [],
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请上传开发商合同！',
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
        {this.modalOfDeveloper()}
        {this.modalOfRepaymentPlanPreview()}
      </DragModal>
    )
  }
})
