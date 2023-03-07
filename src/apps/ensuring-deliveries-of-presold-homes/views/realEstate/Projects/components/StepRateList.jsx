import { Button, DatePicker, InputNumber, Table } from 'ant-design-vue'
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
          title: '起止日期',
          width: 400,
          scopedSlots: { customRender: 'dateRange' }
        },
        {
          title: '分段利率',
          scopedSlots: { customRender: 'interestRate' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              title={'插入新行'}
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
        dateRange: [],
        interestRate: 0,
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
          size={'size'}
          bordered
          scopedSlots={{
            dateRange: (text, record) => (
              <DatePicker.RangePicker
                vModel={record.dateRange}
                placeholder="起止日期"
                disabled={this.disabled}
                onChange={this.emit}
              />
            ),
            interestRate: (text, record) => (
              <InputNumber
                vModel={record.interestRate}
                style={'width: 100%'}
                min={0}
                max={100}
                precision={2}
                placeholder="分段利率"
                disabled={this.disabled}
                onChange={debounce(this.emit, 300)}
              />
            ),
            operation: (text, record, index) => (
              <Button
                icon="delete"
                title={'移除本行'}
                onClick={() => this.onDelClick(record.id, index)}
                disabled={this.disabled}
              />
            )
          }}
        />
        <p>借款周期为：xxxx年xx月xx日 到 xxxx年xx月xx日</p>
      </div>
    )
  }
}
