import { Button, DatePicker, InputNumber, Table } from 'ant-design-vue'
import { cloneDeep, debounce } from 'lodash'
import moment from 'moment'

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
    },
    amountBorrowed: {
      type: Array,
      required: true
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
          title: <span class={'ant-form-item-required'}>截止日期</span>,
          width: 400,
          scopedSlots: { customRender: '_endDate' }
        },
        {
          title: <span class={'ant-form-item-required'}>利率(%)</span>,
          scopedSlots: { customRender: 'rateValue' }
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
    },
    _amountBorrowed() {
      return [this.amountBorrowed[0]?._startDate ?? null, this.amountBorrowed.at(-1)?._endDate.endOf('day') ?? null]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (this.dataSourceCache.length) {
          this.dataSource = cloneDeep(this.dataSourceCache)
          this.dataSourceCache = []
        } else {
          if (value.length) {
            this.dataSource = value.map(item => {
              item.id = item.id || Math.random()

              // ===== 注意本组件内 dataSource 的一些字段的类型：======
              /**
               * 格式化为“YYYYMMDD”的分段利率结束时间（用于前后端交互）
               * @type {string}
               */
              item.endDate = `${item.endDate}`
              /**
               * 分段利率截止时间（用于组件内交互）
               * @type {moment.Moment | null}
               */
              item._endDate = item.endDate ? moment(item.endDate) : null

              return item
            })
          } else {
            this.dataSource = []
            this.onCreateRow()
          }
        }
      }
    }
  },
  methods: {
    onDelClick(id, index) {
      this.dataSource.splice(index, 1)
      this.validator()
    },
    onCreateRow(e) {
      const row = {
        rateValue: 0,
        _endDate: null,
        endDate: '',
        id: Math.random()
      }

      this.dataSource.push(row)

      if (e) {
        this.validator()
      }
    },
    validator() {
      let err = false

      this.dataSource.forEach(item => {
        if (!item._endDate || !item.rateValue) {
          err = true
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
      if (field === '_endDate') {
        this.dataSource[index].endDate = value?.format('YYYYMMDD')
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
            _endDate: (text, record, index) => (
              <DatePicker
                class={record._endDate ? 'pass' : ''}
                style={'width: 100%'}
                vModel={record._endDate}
                placeholder={'截止日期'}
                disabledDate={current => !current.isBetween(...this._amountBorrowed, null, '[]')}
                disabled={this.disabled}
                onChange={value => this.onCompValueChange('_endDate', value, index)}
              />
            ),
            rateValue: (text, record, index) => (
              <InputNumber
                vModel={record.rateValue}
                class={record.rateValue ? 'pass' : ''}
                style={'width: 100%'}
                min={0}
                max={100}
                precision={2}
                placeholder="利率"
                disabled={this.disabled}
                onChange={debounce(value => this.onCompValueChange('rateValue', value, index), 300)}
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
      </div>
    )
  }
}
