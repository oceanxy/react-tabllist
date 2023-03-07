import { Button, DatePicker, Input, InputNumber, Select, Table } from 'ant-design-vue'
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
          title: '期数',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'numberOfCycles' }
        },
        {
          title: '还款期日',
          width: 130,
          scopedSlots: { customRender: 'date' }
        },
        {
          title: '资金类型',
          width: 100,
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '金额',
          width: 120,
          scopedSlots: { customRender: 'repaymentAmount' }
        },
        {
          title: '本金比例',
          width: 100,
          scopedSlots: { customRender: 'principalRatio' }
        },
        {
          title: '备注',
          scopedSlots: { customRender: 'remark' }
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
        numberOfCycles: 1,
        date: '',
        type: 1,
        interestRate: 0,
        principalRatio: 0,
        remark: '',
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
            numberOfCycles: (text, record, index) => index + 1,
            date: (text, record) => (
              <DatePicker
                vModel={record.dateRange}
                placeholder="起止日期"
                disabled={this.disabled}
                onChange={this.emit}
              />
            ),
            type: (text, record) => (
              <Select
                vModel={record.type}
                placeholder="请选择"
                disabled={this.disabled}
                onChange={this.emit}
              >
                <Select.Option value={1}>本金</Select.Option>
                <Select.Option value={2}>利息</Select.Option>
              </Select>
            ),
            repaymentAmount: (text, record) => (
              <InputNumber
                vModel={record.interestRate}
                allowClear
                style={'width: 100%'}
                min={0}
                max={1000000000000}
                precision={2}
                placeholder="分段利率"
                disabled={this.disabled}
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                onChange={debounce(this.emit, 300)}
              />
            ),
            principalRatio: (text, record) => (
              <InputNumber
                vModel={record.principalRatio}
                allowClear
                style={'width: 100%'}
                min={0}
                max={100}
                precision={2}
                placeholder="本金比例"
                disabled={this.disabled}
                onChange={debounce(this.emit, 300)}
              />
            ),
            remark: (text, record) => (
              <Input
                vModel={record.remark}
                allowClear
                maxLength={30}
                placeholder="备注"
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
        <p>还款总计：利息xxxx元 + 本金xxxx元 = xxxx元</p>
      </div>
    )
  }
}
