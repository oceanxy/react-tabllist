import { Input, Form, InputNumber, TreeSelect, Switch, Select, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      roleData: {
        id: '',
        name: ''
      }
    }
  },
  computed: {
    organTree() {
      return this.$store.state[this.moduleName].organTree?.list || []
    },
    roleTree() {
      return this.$store.state[this.moduleName].roleTree?.list || []
    },
    isPwd() {
      if (this.currentItem && this.currentItem.loginPwd) {
        return true
      } else {
        return false
      }
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

                data.roleIds = this.roleData?.id ?? this.currentItem?.roleIds ?? ''
                data.roleNames = this.roleData?.name ?? this.currentItem?.roleNames ?? ''
                data.organId = data.organ.value ?? this.currentItem?.organId ?? ''
                data.organName = data.organ.label ?? this.currentItem?.organName ?? ''

                if (this.currentItem && this.currentItem.loginPwd) {
                  delete data.loginPwd
                }

                delete data.organ
                delete data.role

                return data
              }
            }
          )


        }
      }
    }
  },
  methods: {
    onCheck(value) {
      if (value) {
        const id = []
        const name = []

        value.map(item => {
          id.push(item.value)
          name.push(item.label)
        })
        this.roleData = { id: id.join(','), name: name.join(',') }
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
            stateName: 'roleTree',
            customApiName: 'getRoleTree'
          })
        } else {
          this.role = {
            id: '',
            name: ''
          }
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="选择组织" class={'half'}>
            {
              this.form.getFieldDecorator('organ', {
                initialValue: this.currentItem.organId
                  ? { label: this.currentItem.organName, value: this.currentItem.organId }
                  : undefined,
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选选择组织',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  treeData={this.organTree}
                  labelInValue
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  placeholder={'请选择组织'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="账号" class={'half'}>
            {
              this.form.getFieldDecorator('loginName', {
                initialValue: this.currentItem.loginName,
                rules: [
                  {
                    required: true,
                    message: '请输入账号！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input maxLength={20} placeholder="请输入账号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="密码" class={'half'}>
            {
              this.form.getFieldDecorator('loginPwd', {
                initialValue: this.currentItem.loginPwd,
                rules: [
                  {
                    required: true,
                    message: '请输入6~16位字符！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  type={this.isPwd ? 'password' : 'text'}
                  maxLength={16}
                  disabled={this.isPwd}
                  placeholder="请输入密码" allowClear />
              )
            }
          </Form.Item>

          <Form.Item label="姓名" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入账号！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input maxLength={20} placeholder="请输入账号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="性别" class={'half'}>
            {
              this.form.getFieldDecorator('gender', {
                initialValue: this.currentItem.gender,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择性别！',
                    trigger: 'change'
                  }
                ]
              })(
                // <Select placeholder="请选择性别">
                //   <Select.Option value={1}>男</Select.Option>
                //   <Select.Option value={2}>女</Select.Option>
                //   <Select.Option value={0}>未知</Select.Option>
                // </Select>
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>

          <Form.Item label="是否组织管理" class={'half'}>
            {
              this.form.getFieldDecorator('isOrganLeader', {
                initialValue: this.currentItem.isOrganLeader || 1,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '是否组织管理！',
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
          <Form.Item label="选择角色">
            {
              this.form.getFieldDecorator('role', {
                initialValue: this.currentItem.roleIds
                  ? { label: this.currentItem.roleNames, value: this.currentItem.roleIds }
                  : undefined,
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选择角色',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  treeData={this.roleTree}
                  tree-checkable
                  labelInValue
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  onChange={this.onCheck}
                  placeholder={'请选择角色'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex ?? 0 })(
                <InputNumber
                  placeholder="数值越大排在越前"
                  allowClear
                  style={{ width: '100%' }}
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
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description || undefined })(
                <Input.TextArea
                  placeholder="请输入"
                  auto-size={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>

        </Form>
      </DragModal>
    )
  }
})
