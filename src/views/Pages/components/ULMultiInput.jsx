import { Button, Input, Table } from 'ant-design-vue'
import '../assets/styles/index.scss'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '完整路径',
          scopedSlots: { customRender: 'allPath' }
        },
        {
          title: '备注',
          width: '30%',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '操作',
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = Math.random()
            return item
          })
        } else {
          this.dataSource = []
          this.onCreateRow()
        }
      }
    }
  },
  methods: {
    onDelClick(id) {
      const index = this.dataSource.findIndex(item => item.id === id)
      this.dataSource.splice(index, 1)
    },
    onCreateRow() {
      const row = {
        allPath: '',
        remark: '',
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
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
      <div class="multi-input">
        <Button icon="plus" onClick={this.onCreateRow} />
        <Table
          class="multi-input-table"
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          {...{
            scopedSlots: {
              allPath: (text, record) => (
                <Input
                  vModel={record.allPath}
                  placeholder="请输入完整路径"
                  onBlur={this.onChange}
                />
              ),
              remark: (text, record) => (
                <Input
                  vModel={record.remark}
                  placeholder="请输入备注"
                  onBlur={this.onChange}
                />
              ),
              operation: (text, record) => (
                <Button icon="delete" onClick={() => this.onDelClick(record.id)} />
              )
            }
          }}
        />
      </div>
    )
  }
}

/*
*
* <Row>
          <Col>
            <Button style={{ marginBottom: '20px' }} icon="plus" onClick={this.onPlusClick} />
          </Col>
        </Row>
        {
          this.driveForm.map((item, index) => (
            <Row gutter={10} {...{ props: { id: item.key } }}>
              {
                Object.entries(item).map(([key, value]) => key === 'key' ? null : (
                  <Col {...{ props: this.layouts[key] }}>
                    <Form.Item>
                      {
                        this.form.getFieldDecorator(`${key}_${index}`, {
                          rules: this.rules[key] || [],
                          initialValue: value || ''
                        })(
                          <Input placeholder={this.placeholders[key] || ''} />
                        )
                      }
                    </Form.Item>
                  </Col>
                ))
              }
              <Col span={2}>
                <Button icon="delete" onClick={() => this.onDelClick(index)} />
              </Col>
            </Row>
          ))
        } */
