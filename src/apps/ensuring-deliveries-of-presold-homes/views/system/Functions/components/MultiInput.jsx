import { Button, Input, Table } from 'ant-design-vue'
import { debounce } from 'lodash'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: '功能地址',
          width: 400,
          scopedSlots: { customRender: 'fnUrl' }
        },
        {
          title: '描述',
          scopedSlots: { customRender: 'fnInfoDescribe' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              onClick={this.onCreateRow}
              disabled={this.disabled}
            />
          ),
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
    }
  },
  details() {
    return this.$store.state[this.moduleName].details
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = item.id || Math.random()

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
    onDelClick(id, index) {
      // const index = this.dataSource.findIndex(item => item.id === id)

      this.dataSource.splice(index, 1)
      this.emit()
    },
    onCreateRow() {
      const row = {
        fnUrl: '',
        fnInfoDescribe: '',
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    emit() {
      this.$emit('change', this.dataSource)
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        <Table
          class="multi-input-table"
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          tableLayout={'fixed'}
          size={'middle'}
          scopedSlots={{
            fnUrl: (text, record) => (
              <Input
                vModel={record.fnUrl}
                placeholder="请输入功能地址"
                disabled={this.disabled}
                onChange={debounce(this.emit, 300)}
              />
            ),
            fnInfoDescribe: (text, record) => (
              <Input
                vModel={record.fnInfoDescribe}
                placeholder="请输入描述"
                disabled={this.disabled}
                onChange={debounce(this.emit, 300)}
              />
            ),
            operation: (text, record, index) => (
              <Button
                icon="delete"
                onClick={() => this.onDelClick(record.id, index)}
                disabled={this.disabled}
              />
            )
          }}
        />
      </div>
    )
  }
}
