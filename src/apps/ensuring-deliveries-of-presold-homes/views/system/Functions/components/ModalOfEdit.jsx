import { Form, Input, InputNumber, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from './MultiInput'
import { cloneDeep, omit } from 'lodash'

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
    details() {
      return this.$store.state[this.moduleName].details
    },
    menuTree() {
      return this.$store.state['menus'].menuTree?.list || []
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    },
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value && this.currentItem.id) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
        }

        if (this.details && this.details.length > 0) {
          this.form.setFieldsValue({ functionInfoList: this.details })
        } else {
          this.form.setFieldsValue({ functionInfoList: [] })
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = cloneDeep(values)

      return {
        function: {
          fnName: data.fnName,
          fnDescribe: data.fnDescribe,
          id: data.id,
          menuId: data.menuId,
          sortIndex: data.sortIndex
        },
        functionInfoList: values.functionInfoList.map(item => {
          if (!isNaN(item.id)) {
            return omit(item, 'id')
          }

          return item
        })
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属菜单">
            {
              this.form.getFieldDecorator('menuId', {
                initialValue: this.currentItem.menuId || this.search.treeId,
                rules: [
                  {
                    required: true,
                    message: '请选择所属菜单!',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  allowClear
                  treeData={this.menuTree}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择所属菜单'}
                  treeDefaultExpandedKeys={[
                    this.menuTree?.[0]?.id,
                    this.currentItem.parentId,
                    this.currentItem.id
                  ]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="功能名称" class={'half'}>
            {
              this.form.getFieldDecorator('fnName', {
                initialValue: this.currentItem.fnName,
                rules: [
                  {
                    required: true,
                    message: '请输入功能名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input maxLength={32} placeholder="请输入功能名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex ?? 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  max={999}
                  placeholder="数值越大排在越前"
                  allowClear
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="功能描述">
            {
              this.form.getFieldDecorator('fnDescribe', { initialValue: this.currentItem.fnDescribe })(
                <Input.TextArea placeholder="请输入描述内容" allowClear />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('functionInfoList', {
                initialValue: this.currentItem.functionInfoList || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请补全功能信息!',
                    trigger: 'change'
                  }
                ]
              })(
                <MultiInput />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
