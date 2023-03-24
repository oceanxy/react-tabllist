import { Button, InputNumber, Space, Table } from 'ant-design-vue'
import { cloneDeep, debounce } from 'lodash'

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
      dataSource: [],
      dataSourceCache: []
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '序号',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'serialNumber' }
        },
        {
          title: <span class={'ant-form-item-required'}>结息日期</span>,
          scopedSlots: { customRender: 'repaymentEndDay' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              title={'插入新行'}
              onClick={e => this.onCreateRow(e)}
              disabled={this.disabled}
            />
          ),
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        console.log(value)

        if (this.dataSourceCache.length) {
          this.dataSource = cloneDeep(this.dataSourceCache)
          this.dataSourceCache = []
        } else {
          if (value.length) {
            this.dataSource = value.map(item => {
              item.id = item.id || Math.random()
              item.month = +item.repaymentEndDay.substring(0, 2)
              item.date = +item.repaymentEndDay.substring(2)
              item.maxDate = this.getMaxDate(item.month)

              return item
            })
          } else {
            this.dataSource[this.activeKey] = []
            this.onCreateRow()
          }
        }
      }
    }
  },
  methods: {
    getMaxDate(month) {
      if (month === 2) {
        return 28
      } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31
      } else {
        return 30
      }
    },
    onDelClick(id, index) {
      this.dataSource.splice(index, 1)
      this.validator()
    },
    onCreateRow(e) {
      const row = {
        repaymentEndDay: '',
        month: undefined,
        date: undefined,
        maxDate: 31,
        id: Math.random()
      }

      this.dataSource.push(row)

      if (e) {
        this.validator()
      }
    },
    validator() {
      let err = false

      this.dataSource.forEach((item, index) => {
        if (!item.month || !item.date) {
          err = true
        } else {
          const monthStr = item.month > 9 ? '' : '0'
          const dateStr = item.date > 9 ? '' : '0'

          item.period = index + 1
          item.repaymentEndDay = `${monthStr}${item.month}${dateStr}${item.date}`
        }
      })

      this.$nextTick(() => {
        if (!err) {
          this.$emit('change', this.dataSource)
        } else {
          this.dataSourceCache = this.dataSource
          this.$emit('change', [])
        }
      })
    },
    onCompValueChange(field, value, index) {
      if (field === 'month') {
        this.dataSource[index].maxDate = this.getMaxDate(value)
      }

      this.validator()
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
          size={'small'}
          bordered
          scopedSlots={{
            serialNumber: (text, record, index) => index + 1,
            repaymentEndDay: (text, record, index) => {
              return (
                <Space>
                  每年
                  <InputNumber
                    vModel={record.month}
                    class={record.month ? 'pass' : ''}
                    min={1}
                    max={12}
                    precision={0}
                    disabled={this.disabled}
                    onChange={debounce(value => this.onCompValueChange('month', value, index), 300)}
                  />
                  月
                  <InputNumber
                    vModel={record.date}
                    class={record.date ? 'pass' : ''}
                    min={1}
                    max={record.maxDate}
                    precision={0}
                    disabled={this.disabled || !record.month}
                    onChange={debounce(value => this.onCompValueChange('date', value, index), 300)}
                  />
                  日
                </Space>
              )
            },
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
      </div>
    )
  }
}
