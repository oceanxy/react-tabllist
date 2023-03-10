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
      columns: [
        {
          title: '序号',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'serialNumber' }
        },
        {
          title: <span class={'ant-form-item-required'} style={'font-weight: normal'}>起止日期</span>,
          width: 400,
          scopedSlots: { customRender: 'dateRange' }
        },
        {
          title: <span class={'ant-form-item-required'} style={'font-weight: normal'}>利率</span>,
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
      ],
      dataSource: [],
      dataSourceCache: [],
      date: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (this.dataSourceCache.length) {
          this.dataSource = cloneDeep(this.dataSourceCache)
          this.dataSourceCache = []
          this.count()
        } else {
          if (value.length) {
            this.dataSource = value.map(item => {
              item.id = item.id || Math.random()

              // ===== 注意本组件内 dataSource 的一些字段的类型：======
              /**
               * 格式化为“YYYYMMDD”的分段利率开始时间（用于前后端交互）
               * @type {string}
               */
              item.starDate = `${item.starDate}`
              /**
               * 格式化为“YYYYMMDD”的分段利率结束时间（用于前后端交互）
               * @type {string}
               */
              item.endDate = `${item.endDate}`
              /**
               * 分段利率起止时间（用于组件内交互）
               * @type {[moment.Moment, moment.Moment]|[]}
               */
              item.dateRange = item.starDate && item.endDate ? [moment(item.starDate), moment(item.endDate)] : []

              return item
            })

            this.count()
          } else {
            this.dataSource = []
            this.onCreateRow()
          }
        }
      }
    }
  },
  methods: {
    disabledDate(current) {
      for (let i = this.dataSource.length - 1; i >= 0; i--) {
        if (this.dataSource[i].dateRange[1] && current <= moment(this.dataSource[i].endDate).endOf('day')) {
          return true
        }

        if (!i) {
          return false
        }
      }
    },
    onDelClick(id, index) {
      this.dataSource.splice(index, 1)
      this.validator()
    },
    onCreateRow(e) {
      // 根据上一行设置下一行的默认开始时间
      const dateRange = this.dataSource.length && this.dataSource.at(-1).endDate
        ? [
          moment(this.dataSource.at(-1).endDate).add(1, 'days')
            .format('YYYYMMDD')
        ]
        : []

      const row = {
        dateRange,
        rateValue: 0,
        starDate: dateRange[0],
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
        if (!item.dateRange[0] || !item.dateRange[1] || !item.rateValue) {
          err = true
        }
      })

      this.$nextTick(() => {
        if (!err) {
          this.count()
          this.$emit('change', this.dataSource)
        } else {
          this.date = []
          this.dataSourceCache = this.dataSource
          this.$emit('change', [])
        }
      })
    },
    onCompValueChange(field, value, index) {
      if (field === 'dateRange') {
        if (this.dataSource[index].starDate && value[1]) {
          this.dataSource[index].dateRange[0] = moment(this.dataSource[index].starDate)
          this.dataSource[index].endDate = value[1].format('YYYYMMDD')
        } else {
          this.dataSource[index].starDate = value[0].format('YYYYMMDD')
          this.dataSource[index].endDate = value[1].format('YYYYMMDD')
        }
      }

      this.validator()
    },
    count() {
      this.date = [
        this.dataSource[0].dateRange[0].format('yyyy年M月D日'),
        this.dataSource.at(-1).dateRange[1].format('yyyy年M月D日')
      ]
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
            dateRange: (text, record, index) => (
              <DatePicker.RangePicker
                class={record.dateRange.length === 2 ? 'pass' : ''}
                vModel={record.dateRange}
                placeholder={['开始日期', '结束日期']}
                disabled={this.disabled}
                disabledDate={this.disabledDate}
                onChange={value => this.onCompValueChange('dateRange', value, index)}
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
        <p>借款周期为：{
          this.date.length === 2
            ? this.date.join(' 到 ')
            : '补全必填项后显示'
        }</p>
      </div>
    )
  }
}
