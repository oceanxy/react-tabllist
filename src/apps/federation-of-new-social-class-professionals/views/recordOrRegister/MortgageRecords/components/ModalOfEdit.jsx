import { Form, InputNumber, Select, Switch, Empty, Spin, Space } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      keywordOfSearchDevelopers: []
    }
  },
  computed: {
    estateListByName() {
      return this.$store.state[this.moduleName].estateListByName
    },
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
          ok: () => this.onSubmit()
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
    async onSearchForDeveloper(keyword) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('estateListByName')
      this.keywordOfSearchDevelopers = keyword

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'estateListByName',
        customApiName: 'getEstateListByName',
        payload: { estateName: keyword }
      })
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // 初始化表单内的模糊查询结果，编辑模式下用列表的值作为默认值
          this.setState(
            'estateListByName',
            this.currentItem.id
              ? [
                {
                  id: this.currentItem.estateId,
                  fullName: this.currentItem.estateName
                }
              ]
              : []
          )

          if (this.currentItem && this.currentItem.id) {
            this.onSearchForDeveloper()
          }
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="选择资产">
            {
              this.form.getFieldDecorator('easteId', {
                initialValue: this.currentItem.easteId,
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
                  showSearch
                  placeholder={'请选择资产（可搜索）'}
                  onSearch={debounce(this.onSearchForDeveloper, 300)}
                  filterOption={false}
                  notFoundContent={
                    this.estateListByName.loading
                      ? <Spin />
                      : this.keywordOfSearchDevelopers && !this.estateListByName.list.length
                        ? (
                          <span>查无此资产</span>
                        )
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  }
                >
                  {
                    this.estateListByName?.list.map(item => (
                      <Select.Option value={item.id}>
                        <Space size={5}>
                          <span>{item.easteName}</span>
                          <span style={'font-size:26px'}>·</span>
                          <span>{item.projectName}</span>
                        </Space>
                      </Select.Option>
                    ))
                  }
                </Select>
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
                <InputNumber
                  max={999999999999}
                  min={0}
                  placeholder="请输入总价"
                  style={'width:100%'}
                  allowClear
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
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
                <InputNumber
                  max={999999999999}
                  min={0}
                  placeholder="请输入单价"
                  style={'width:100%'}
                  allowClear
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }
          </Form.Item>

          <Form.Item label="评估价值" class={'half'}>
            {
              this.form.getFieldDecorator('assessMoney', {
                initialValue: this.currentItem.recordSingle,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入金额！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  max={999999999999}
                  min={0}
                  placeholder="请输入金额"
                  style={'width:100%'}
                  allowClear
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }
          </Form.Item>

          <Form.Item label="是否完工" class={'half'}>
            {
              this.form.getFieldDecorator('isEnd', {
                initialValue: this.currentItem.isEnd,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder="请选择">
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
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
