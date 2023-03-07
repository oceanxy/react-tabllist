import { Cascader, Form, Input, InputNumber, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'
import { verifyEmail, verifyPhoneNumber } from '@/utils/validators'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      }
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
          cancel: () => this.onCancel(null, null, this.restoreCurrentItem),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.typeId = value.natureOfTheEnterprise.typeId
              data.typeName = value.natureOfTheEnterprise.typeName
              data.provinceId = value.districtList[0].id
              data.provinceName = value.districtList[0].name
              data.cityId = value.districtList[1].id
              data.cityName = value.districtList[1].name
              data.areaId = value.districtList[2].id
              data.areaName = value.districtList[2].name

              return data
            },
            // 为其他模块调用本弹窗做适配
            ...(this.moduleName === 'developers' ? {} : {
              customApiName: 'addDevelopers',
              isFetchList: false,
              done: response => {
                this.restoreCurrentItem(response.data)
              }
            })
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
          await Promise.all([
            this.$store.dispatch('getListWithLoadingStatus', {
              moduleName: this.moduleName,
              stateName: 'natureOfTheEnterprise',
              customApiName: 'getEnumOfNatureOfTheEnterprise'
            }),
            dispatch('common', 'getAdministrativeDivision')
          ])
        }
      }
    }
  },
  methods: {
    restoreCurrentItem(developer) {
      // 为其他模块调用本弹窗做适配，关闭弹窗恢复 currentItem
      if (this.moduleName !== 'developers') {
        this.$store.commit('setState', {
          value: {
            ...this.currentItem._currentItem,
            ...(
              developer
                ? {
                  developerId: developer.id,
                  developerName: developer.fullName
                }
                : {}
            )
          },
          moduleName: this.moduleName,
          stateName: 'currentItem'
        })

        if (developer) {
          this.$store.commit('setState', {
            value: {
              loading: false,
              list: [
                {
                  id: developer.id,
                  fullName: developer.fullName
                }
              ]
            },
            moduleName: this.moduleName,
            stateName: 'enumOfDevelopers'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入开发商名称！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入开发商名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="企业性质" class={'half'}>
            {
              this.form.getFieldDecorator('natureOfTheEnterprise', {
                initialValue: this.currentItem.typeId
                  ? { typeId: this.currentItem.typeId, typeName: this.currentItem.typeName }
                  : undefined,
                getValueFromEvent: value => ({ typeId: value.key, typeName: value.label }),
                getValueProps: value => ({
                  value: value
                    ? {
                      key: value.typeId || value.key,
                      label: value.typeName || value.label
                    }
                    : undefined
                }),
                rules: [
                  {
                    required: true,
                    type: 'object',
                    message: '请选择企业性质！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请选择企业性质"
                  labelInValue
                >
                  {
                    this.natureOfTheEnterprise.list?.map(item => (
                      <Select.Option value={item.dicCode}>{item.dicName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="联系人" class={'half'}>
            {
              this.form.getFieldDecorator('leader', {
                initialValue: this.currentItem.leader,
                rules: [
                  {
                    required: true,
                    message: '请输入联系人姓名！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入联系人姓名" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" class={'half'}>
            {
              this.form.getFieldDecorator('leaderTel', {
                initialValue: this.currentItem.leaderTel,
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话！',
                    trigger: 'blur'
                  },
                  { validator: verifyPhoneNumber }
                ]
              })(
                <Input placeholder="请输入联系电话" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Form.Item label="邮箱" class={'half'}>
            {
              this.form.getFieldDecorator('email', {
                initialValue: this.currentItem.email,
                rules: [
                  {
                    required: true,
                    message: '请输入电子邮箱！',
                    trigger: 'blur'
                  },
                  { validator: verifyEmail }
                ]
              })(
                <Input placeholder="请输入电子邮箱" allowClear maxLength={30} />
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
                initialValue: this.currentItem.provinceId && this.currentItem.cityId && this.currentItem.areaId
                  ? [
                    { id: this.currentItem.provinceId, name: this.currentItem.provinceName },
                    { id: this.currentItem.cityId, name: this.currentItem.cityName },
                    { id: this.currentItem.areaId, name: this.currentItem.areaName }
                  ]
                  : [],
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
                initialValue: this.currentItem.address,
                rules: [
                  {
                    required: true,
                    message: '请输入详细地址！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入详细地址" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', { initialValue: this.currentItem.remark })(
                <Input.TextArea placeholder="请输入备注" allowClear maxLength={100} />
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
                  max={10000}
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
