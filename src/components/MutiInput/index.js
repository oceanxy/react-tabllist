import { Col, Form, Input, Row } from 'ant-design-vue'
import { omit } from 'lodash'
import './index.scss'

export default Form.create({})({
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      bindValue: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    /**
     * 从value获取的每一行需要展示的字段
     * 只有单个字段时直接传递字段名，多个时用数组传递
     */
    valueTypeDefinition: {
      type: [Array, String],
      default: 'value'
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!value.length) {
          this.bindValue = [
            this.valueTypeDefinition.reduce((obj, field) => {
              obj[field] = ''
              return obj
            }, {})
          ]
        } else {
          this.bindValue = value
        }
      }
    }
  },
  render() {
    // const attr = {
    //   props: {
    //     ...omit(this.$props, 'value'),
    //     ...this.$attrs
    //   },
    //   on: this.$listeners
    // }

    return (
      <Form class="muti-input">
        {
          this.bindValue.map(item => (
            <Row gutter={10}>
              {
                Object.entries(item).map(([key, value]) => (
                  <Col span={Math.floor(24 / this.valueTypeDefinition.length)}>
                    <Form.Item>
                      {
                        this.form.getFieldDecorator(key, {
                          // rules: [{ required: true, message: '请选择页面类型!', trigger: 'change' }],
                          initialValue: value || ''
                        })(
                          <Input />
                        )
                      }
                    </Form.Item>
                  </Col>
                ))
              }
            </Row>
          ))
        }
      </Form>
    )
  }
})
