import { Button, DatePicker, Input, InputNumber, Select, Table } from 'ant-design-vue'
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
    /**
     * 可选时间范围
     */
    dateRange: {
      type: Array, // {[moment.Moment, moment.Moment] | []}
      default: () => []
    }
  },
  data() {
    return {
      dataSource: [],
      dataSourceCache: [],
      interest: 0,
      principal: 0
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '期数',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'period' }
        },
        {
          title: <span class={'ant-form-item-required'} style={'font-weight: normal'}>还款日期</span>,
          width: 130,
          scopedSlots: { customRender: 'repaymentEndDay' }
        },
        {
          title: <span class={'ant-form-item-required'} style={'font-weight: normal'}>资金类型</span>,
          width: 100,
          scopedSlots: { customRender: 'repaymentType' }
        },
        {
          title: <span class={'ant-form-item-required'} style={'font-weight: normal'}>还款金额</span>,
          width: 120,
          scopedSlots: { customRender: 'money' }
        },
        {
          title: '本金比例',
          width: 100,
          scopedSlots: { customRender: 'percent' }
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
          this.count()
        } else {
          if (value.length) {
            this.dataSource = value.map(item => {
              item.id = item.id || Math.random()

              // ===== 注意本组件内 dataSource 的一些字段的类型：======
              /**
               * 格式化为“YYYYMMDD”的还款日期（用于前后端交互）
               * @type {string}
               */
              item.repaymentEndDay = `${item.repaymentEndDay}`
              /**
               * 还款日期（用于组件内交互）
               * @type {moment.Moment}
               */
              item.date = moment(item.repaymentEndDay)

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
      if (this.dateRange.length === 2) {
        return !current.isBetween(this.dateRange[0], this.dateRange[1].endOf('day'))
      }

      return false
    },
    onDelClick(id, index) {
      // 更新期数
      for (let i = index, l = this.dataSource.length; i < l; i++) {
        this.dataSource[i].period -= 1
      }

      this.dataSource.splice(index, 1)

      this.validator()
    },
    onCreateRow(e) {
      const row = {
        period: this.dataSource.length + 1,
        repaymentEndDay: '',
        date: null,
        repaymentType: 1,
        money: 0,
        percent: 0,
        remark: '',
        id: Math.random()
      }

      this.dataSource.push(row)

      if (e) {
        this.validator()
      }
    },
    validator() {
      let err = false

      for (const ds of this.dataSource) {
        if (!ds.repaymentEndDay || !ds.repaymentType || !ds.money) {
          err = true
          break
        }
      }

      this.$nextTick(() => {
        this.interest = 0
        this.principal = 0

        if (!err) {
          this.count()
          this.$emit('change', this.dataSource)
        } else {
          this.dataSourceCache = this.dataSource
          this.$emit('change', [])
        }
      })
    },
    onCompValueChange(field, value, index) {
      if (field === 'repaymentEndDay') {
        this.dataSource[index][field] = value.format('YYYYMMDD')
      }

      this.validator()
    },
    count() {
      this.dataSource.forEach(item => {
        if (item.repaymentType === 1) {
          this.principal += item.money
        } else {
          this.interest += item.money
        }
      })
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        {
          this.disabled
            ? <span>填写分段利率后启用</span>
            : [
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
                  period: (text, record) => (
                    <Input
                      disabled
                      vModel={record.period}
                      style={{
                        textAlign: 'center',
                        background: 'none',
                        border: 'none',
                        color: '#000000a6',
                        cursor: 'text'
                      }}
                    />
                  ),
                  repaymentEndDay: (text, record, index) => (
                    <DatePicker
                      vModel={record.date}
                      class={record.repaymentEndDay ? 'pass' : ''}
                      placeholder="还款日期"
                      disabledDate={this.disabledDate}
                      disabled={this.disabled}
                      onChange={value => this.onCompValueChange('repaymentEndDay', value, index)}
                    />
                  ),
                  repaymentType: (text, record, index) => (
                    <Select
                      vModel={record.repaymentType}
                      class={record.repaymentType ? 'pass' : ''}
                      placeholder="请选择"
                      disabled={this.disabled}
                      onChange={value => this.onCompValueChange('repaymentType', value, index)}
                    >
                      <Select.Option value={1}>本金</Select.Option>
                      <Select.Option value={2}>利息</Select.Option>
                    </Select>
                  ),
                  money: (text, record, index) => (
                    <InputNumber
                      vModel={record.money}
                      class={record.money ? 'pass' : ''}
                      style={'width: 100%'}
                      min={0}
                      max={1000000000000}
                      precision={2}
                      placeholder="还款金额"
                      disabled={this.disabled}
                      formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/￥\s?|(,*)/g, '')}
                      onChange={debounce(value => this.onCompValueChange('money', value, index), 300)}
                    />
                  ),
                  percent: (text, record, index) => (
                    <InputNumber
                      vModel={record.percent}
                      class={'pass'}
                      style={'width: 100%'}
                      min={0}
                      max={100}
                      precision={0}
                      placeholder="本金比例"
                      disabled={this.disabled}
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                      onChange={debounce(value => this.onCompValueChange('percent', value, index), 300)}
                    />
                  ),
                  remark: (text, record, index) => (
                    <Input
                      vModel={record.remark}
                      class={'pass'}
                      allowClear
                      maxLength={30}
                      placeholder="备注"
                      disabled={this.disabled}
                      onChange={debounce(this.onCompValueChange, 300)}
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
              />,
              <p style={'color: #ffa191; font-weight: bolder; font-size: 14px'}>
                还款总计：利息{this.interest}元 + 本金{this.principal}元 = {this.interest + this.principal}元
              </p>
            ]
        }
      </div>
    )
  }
}
