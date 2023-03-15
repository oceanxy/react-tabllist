import { Form, Input, InputNumber } from 'ant-design-vue'
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
    details: {
      deep: true,
      handler(value) {
        this.form.setFieldsValue({ functionInfoList: value || [] })
      }
    },
    visible: {
      immediate: true,
      async handler(value) {
        if (value && this.currentItem.id && !this.currentItem.functionInfoList?.length) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
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
          menuId: this.currentItem.menuId || this.search.parentId,
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
                <Input placeholder="请输入功能名称" allowClear />
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
