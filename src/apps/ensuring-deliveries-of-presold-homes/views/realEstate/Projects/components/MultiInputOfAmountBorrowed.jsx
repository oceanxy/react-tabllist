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
          title: <span class={'ant-form-item-required'}>金额</span>,
          scopedSlots: { customRender: 'moneyValue' }
        },
        {
          title: <span class={'ant-form-item-required'}>开始日期</span>,
          width: 200,
          scopedSlots: { customRender: '_startDate' }
        },
        {
          title: <span class={'ant-form-item-required'}>截止日期</span>,
          width: 200,
          scopedSlots: { customRender: '_endDate' }
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
        if (this.dataSourceCache.length) {
          this.dataSource = cloneDeep(this.dataSourceCache)
          this.dataSourceCache = []
        } else {
          if (value.length) {
            this.dataSource = value.map(item => {
              item.id = item.id || Math.random()

              // ===== 注意本组件内 dataSource 的一些字段的类型：======
              /**
               * 格式化为“YYYYMMDD”的借款开始时间（用于前后端交互）
               * @type {string}
               */
              item.startDate = `${item.startDate}`
              /**
               * 格式化为“YYYYMMDD”的借款结束时间（用于前后端交互）
               * @type {string}
               */
              item.endDate = `${item.endDate}`
              /**
               * 借款开始时间（用于组件内交互）
               * @type {moment.Moment}
               * @private
               */
              item._startDate = moment(item.startDate)
              /**
               * 借款结束时间（用于组件内交互）
               * @type {moment.Moment}
               * @private
               */
              item._endDate = moment(item.endDate)

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
    disabledDate(current, index) {
      return current < moment(this.dataSource[index]._startDate).add(1, 'years').subtract(1, 'days')
    },
    onDelClick(id, index) {
      this.dataSource.splice(index, 1)
      this.validator()
    },
    onCreateRow(e) {
      const row = {
        startDate: undefined,
        endDate: undefined,
        moneyValue: 0,
        _startDate: null,
        _endDate: null,
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
        if (!item.startDate || !item.endDate || !item.moneyValue) {
          err = true
        }
      })

      this.$nextTick(() => {
        if (!err) {
          this.$emit('change', this.dataSource.map((item, index) => ({
            ...item,
            moneyPeriod: index + 1
          })))
        } else {
          this.dataSourceCache = this.dataSource
          this.$emit('change', [])
        }
      })
    },
    onCompValueChange(field, value, index) {
      if (field === '_startDate') {
        const _endDate = value
          ? moment(value).add(1, 'years').subtract(1, 'days')
          : null

        this.dataSource[index] = {
          ...this.dataSource[index],
          startDate: value?.format('YYYYMMDD'),
          endDate: _endDate?.format('YYYYMMDD'),
          _endDate
        }
      }

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
            moneyValue: (text, record, index) => (
              <InputNumber
                vModel={record.moneyValue}
                placeholder="请输入金额"
                style={'width: 100%'}
                class={record.moneyValue ? 'pass' : ''}
                allowClear
                disabled={this.disabled}
                precision={2}
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                max={1000000000000}
                min={0}
                onChange={debounce(value => this.onCompValueChange('moneyValue', value, index), 300)}
              />
            ),
            _startDate: (text, record, index) => (
              <DatePicker
                class={record._startDate ? 'pass' : ''}
                vModel={record._startDate}
                placeholder={'开始日期'}
                disabled={this.disabled}
                onChange={value => this.onCompValueChange('_startDate', value, index)}
              />
            ),
            _endDate: (text, record, index) => (
              <DatePicker
                class={record._endDate ? 'pass' : ''}
                vModel={record._endDate}
                placeholder={'截止日期'}
                disabled={this.disabled || !record._startDate}
                disabledDate={current => this.disabledDate(current, index)}
                onChange={value => this.onCompValueChange('_endDate', value, index)}
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
