import { Input, Form, InputNumber, TreeSelect, Switch } from 'ant-design-vue'
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
      }
    }
  },
  computed: {
    roleTree() {
      return this.$store.state[this.moduleName].roleTree?.list || []
    },
    menuTree() {
      return this.$store.state[this.moduleName].menuTree
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

                data.parentId = data.parent.value ?? this.currentItem?.parentId ?? ''
                data.parentName = data.parent.label ?? this.currentItem?.parentName ?? ''
                delete data.parent

                return data
              },

              done: async () => {
                // 更新左侧菜单树
                await this.$store.dispatch('getListWithLoadingStatus', {
                  moduleName: this.moduleName,
                  stateName: 'roleTree',
                  customApiName: 'getRoleTree'
                })
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
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'menuTree',
            customApiName: 'getMenuTree'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属角色" class={'half'}>
            {
              this.form.getFieldDecorator('parent', {
                initialValue: this.currentItem.parentId
                  ? { label: this.currentItem.parentName, value: this.currentItem.parentId }
                  : undefined,
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选所属角色',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  treeData={this.roleTree}
                  labelInValue
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  placeholder={'请选择所属角色'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="角色名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入角色名称！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input maxLength={16} placeholder="请输入角色名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="默认菜单" class={'half'}>
            {
              this.form.getFieldDecorator('indexMenuId', { initialValue: this.currentItem.indexMenuId })(
                <TreeSelect
                  allowClear
                  dropdownClassName={'tg-select-dropdown'}
                  dropdownStyle={{ maxHeight: '300px' }}
                  treeData={this.menuTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择父级菜单'}
                  treeDefaultExpandedKeys={[this.currentItem.indexMenuId || this.menuTree.list?.[0]?.id]}
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
          <Form.Item label="状态">
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
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
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
