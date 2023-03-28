import { Button, DatePicker, Input, InputNumber, message, Space, Table, Tabs } from 'ant-design-vue'
import { cloneDeep, debounce } from 'lodash'
import forIndex from '@/mixins/forIndex'
import { TabPane } from 'ant-design-vue/lib/tabs'
import moment from 'moment'

export default {
  mixins: [forIndex],
  inject: ['moduleName'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 总借款金额数据
     */
    amountBorrowed: {
      type: Array,
      required: true
    },
    /**
     * 预览还款的前置条件：借款金额、分段利率、结息日皆有合法数据
     */
    isPreview: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dataSource: [],
      dataSourceCache: [],
      activeKey: 0
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '序号',
          width: 80,
          align: 'center',
          scopedSlots: { customRender: 'period' }
        },
        {
          title: <span class={'ant-form-item-required'}>还款日期</span>,
          width: 150,
          scopedSlots: { customRender: '_repaymentEndDay' }
        },
        {
          title: <span class={'ant-form-item-required'}>本金比例</span>,
          width: 150,
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
              onClick={e => this.onCreateRow(e, this.activeKey, this.amountBorrowed[this.activeKey])}
              disabled={this.disabled}
            />
          ),
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    },
    /**
     * 当前已输入的本金比例之和
     * @returns {*}
     */
    totalPercent() {
      return this.dataSource.map(item => {
        return item.reduce((total, i) => {
          total += i.percent

          return total
        }, 0)
      })
    },
    /**
     * 当前是否可预览（要求每一笔借款的比例都达到100%即可预览）
     * @returns {boolean}
     */
    _isPreview() {
      const totalPercent = this.totalPercent.reduce((total, i) => {
        total += i

        return total
      }, 0)

      return totalPercent && totalPercent === this.dataSource.length * 100 && this.isPreview
    },
    _isCopySettings() {
      return this.activeKey > 0 &&
        this.dataSource[this.activeKey - 1].length &&
        this.totalPercent[this.activeKey - 1] === 100
    }
  },
  watch: {
    amountBorrowed(value) {
      value.forEach((item, index) => {
        if (Array.isArray(this.dataSource[index])) {
          this.dataSource[index].forEach(d => {
            d.money = item.moneyValue
            d.moneyPeriod = item.moneyPeriod
          })
        } else {
          this.onCreateRow(null, index, item)
        }
      })
    },
    value: {
      immediate: true,
      handler(value) {
        if (this.dataSourceCache?.length) {
          this.dataSource = [...this.dataSourceCache]
          this.dataSourceCache = []
        } else {
          if (!value.length) {
            this.onCreateRow(null, 0, this.amountBorrowed?.[0] ?? {})
          } else {
            this.dataSource = value.map(item => item.map(i => {
              i.id = i.id || Math.random()

              // ===== 注意本组件内 dataSource 的一些字段的类型：======
              /**
               * 格式化为“YYYYMMDD”的还款日期（用于前后端交互）
               * @type {string}
               */
              i.repaymentEndDay = `${i.repaymentEndDay}`
              /**
               * 还款日期（用于组件内交互）
               * @type {moment.Moment}
               */
              i._repaymentEndDay = moment(i.repaymentEndDay)

              return i
            }))
          }
        }
      }
    }
  },
  methods: {
    onCreateRow(e, index = 0, amountBorrowed) {
      const row = {
        period: e ? (this.dataSource[index].length + 1) : 1,
        money: amountBorrowed.moneyValue,
        moneyPeriod: amountBorrowed.moneyPeriod,
        repaymentEndDay: '',
        _repaymentEndDay: null,
        percent: 0,
        remark: '',
        id: Math.random()
      }

      this.$set(
        this.dataSource,
        index,
        e ? [...this.dataSource[index], row] : [row]
      )

      if (e) {
        this.validator()
      }
    },
    disabledDate(current) {
      if (this.dateRange.length === 2) {
        return !current.isBetween(this.dateRange[0], this.dateRange[1].endOf('day'))
      }

      return false
    },
    onDelClick(id, index) {
      // 更新期数
      for (let i = index, l = this.dataSource[this.activeKey].length; i < l; i++) {
        this.dataSource[this.activeKey][i].period -= 1
      }

      this.dataSource[this.activeKey].splice(index, 1)

      this.validator()
    },
    validator() {
      const err = new Array(this.amountBorrowed.length).fill(false)

      OUT: {
        for (const [index, dataSourceItem] of this.dataSource.entries()) {
          for (const ds of dataSourceItem) {
            if (!ds.repaymentEndDay || !ds.percent) {
              err[index] = true
              break OUT
            }
          }
        }
      }

      this.$nextTick(() => {
        if (!err.includes(true)) {
          this.$emit('change', this.dataSource)
        } else {
          this.dataSourceCache = [...this.dataSource]
          this.$emit('change', [])
        }
      })
    },
    async onCompValueChange(field, value, index) {
      if (field === '_repaymentEndDay') {
        this.dataSource[this.activeKey][index].repaymentEndDay = value.format('YYYYMMDD')
      }

      if (field === 'percent') {
        if (this.totalPercent[this.activeKey] > 100) {
          message.warn(`第${this.activeKey + 1}笔借款的本金比例之和已达最大值（100%）`)

          this.dataSource[this.activeKey][index].percent =
            100 - this.totalPercent[this.activeKey] + this.dataSource[this.activeKey][index].percent
        }
      }

      this.validator()
    },
    async getPreview() {
      this.$emit('preview')
    },
    copySettings() {
      this.$set(this.dataSource, this.activeKey, cloneDeep(this.dataSource[this.activeKey - 1]).map(item => ({
        ...item,
        money: this.amountBorrowed[this.activeKey].moneyValue,
        moneyPeriod: this.amountBorrowed[this.activeKey].moneyPeriod,
        id: Math.random()
      })))

      this.validator()
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        {
          this.amountBorrowed.length
            ? [
              <Tabs
                activeKey={this.activeKey}
                onChange={key => this.activeKey = key}
                size={'small'}
              >
                {
                  this.dataSource.map((item, _index) => (
                    <TabPane
                      key={this.amountBorrowed[_index].moneyPeriod - 1}
                      tab={`第${this.amountBorrowed[_index].moneyPeriod}笔借款`}
                    >
                      <Table
                        class="multi-input-table"
                        columns={this.columns}
                        dataSource={item}
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
                          _repaymentEndDay: (text, record, index) => (
                            <DatePicker
                              vModel={record._repaymentEndDay}
                              class={record._repaymentEndDay ? 'pass' : ''}
                              placeholder="还款日期"
                              disabledDate={current => !current.isBetween(
                                this.amountBorrowed[_index]?._startDate ?? null,
                                this.amountBorrowed[_index]?._endDate.endOf('day') ?? null,
                                null, '[]'
                              )}
                              disabled={this.disabled}
                              onChange={value => this.onCompValueChange('_repaymentEndDay', value, index)}
                            />
                          ),
                          percent: (text, record, index) => (
                            <InputNumber
                              vModel={record.percent}
                              class={!record.percent ? '' : 'pass'}
                              style={'width: 100%'}
                              min={0}
                              max={100}
                              precision={0}
                              placeholder="本金比例"
                              disabled={this.disabled || !record._repaymentEndDay}
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
                      />
                    </TabPane>
                  ))
                }
              </Tabs>,
              <Space>
                {
                  this._isCopySettings
                    ? (
                      <Button
                        type={'link'}
                        title={'带入上一笔借款的设置'}
                        onClick={this.copySettings}
                      >
                        带入上一笔设置
                      </Button>
                    )
                    : null
                }
                {
                  this._isPreview
                    ? (
                      <Button
                        type={'link'}
                        title={'预览还款计划'}
                        onClick={this.getPreview}
                      >
                        预览还款计划
                      </Button>
                    )
                    : null
                }
              </Space>
            ]
            : '正确填写借款金额后显示'
        }
      </div>
    )
  }
}
