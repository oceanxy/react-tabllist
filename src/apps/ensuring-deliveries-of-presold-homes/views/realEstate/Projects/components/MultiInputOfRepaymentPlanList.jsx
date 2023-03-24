import { Button, DatePicker, Input, InputNumber, message, Space, Table, Tabs } from 'ant-design-vue'
import { cloneDeep, debounce } from 'lodash'
import moment from 'moment'
import forIndex from '@/mixins/forIndex'
import { TabPane } from 'ant-design-vue/lib/tabs'

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
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 分段利率集合
     */
    projectSegmentRateList: {
      type: Array,
      default: () => []
    },
    /**
     * 借款金额数据
     */
    moneyValueList: {
      type: Array,
      default: () => [[]]
    },
    /**
     * 总借款金额
     */
    amountBorrowed: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dataSource: [],
      dataSourceCache: [[]],
      activeKey: 0
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
              onClick={this.onCreateRow}
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
     * 可选时间范围
     * @returns {moment.Moment[]|*[]}
     */
    dateRange() {
      const range = this.projectSegmentRateList

      if (range?.[0]?.starDate && range?.at(-1)?.endDate) {
        return [moment(range[0].starDate), moment(range.at(-1).endDate)]
      }

      return []
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
    currentItem() {
      return this.$store.state[this.moduleName].currentItem
    },
    _moneyValueList() {
      return this.moneyValueList.length > 0
        ? this.moneyValueList
        : [[]]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (this.dataSourceCache[this.activeKey]?.length) {
          this.dataSource[this.activeKey] = cloneDeep(this.dataSourceCache[this.activeKey])
          this.dataSourceCache[this.activeKey] = []
        } else {
          if (value[this.activeKey]?.length) {
            this.dataSource[this.activeKey] = value[this.activeKey].map(item => {
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
              item._repaymentEndDay = moment(item.repaymentEndDay)

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
    onCreateRow(e) {
      const row = {
        period: this.dataSource[this.activeKey].length + 1,
        repaymentEndDay: '',
        _repaymentEndDay: null,
        percent: 0,
        remark: '',
        id: Math.random()
      }

      this.dataSource[this.activeKey].push(row)

      if (e) {
        this.validator()
      }
    },
    validator() {
      const err = new Array(this.moneyValueList.length).fill(false)

      OUT:
      for (const [index, dataSourceItem] of this.dataSource.entries()) {
        for (const ds of dataSourceItem) {
          if (!ds.repaymentEndDay || !ds.percent) {
            err[index] = true
            this.activeKey = index
            break OUT
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
          message.warn('已填写的本金比例之和已达最大值（100%）')

          this.dataSource[this.activeKey][index].percent =
            100 - this.totalPercent[this.activeKey] + this.dataSource[this.activeKey][index].percent
        }
      }

      this.validator()
    },
    async getPreview() {
      await this._setVisibilityOfModal(
        {
          _currentItem: this.currentItem,
          moneyValue: this.amountBorrowed,
          projectSegmentRateList: this.projectSegmentRateList,
          repaymentPlanList: this.dataSource[this.activeKey]
        },
        'visibilityOfRepaymentPlanPreview'
      )
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        <Tabs
          activeKey={this.activeKey}
          onChange={key => this.activeKey = key}
          size={'small'}
        >
          {
            this._moneyValueList.map((item, index) => (
              <TabPane key={index} tab={`第${index + 1}笔借款`}>
                <Table
                  class="multi-input-table"
                  columns={this.columns}
                  dataSource={this.dataSource[this.activeKey]}
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
                        // disabledDate={this.disabledDate}
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
        </Tabs>
        <Space>
          {
            this.moneyValueList.length > 1 && this.activeKey > 0
              ? (
                <Button
                  type={'link'}
                  title={'带入上一笔借款的设置'}
                  onClick={this.getPreview}
                >
                  带入上一笔借款的设置
                </Button>
              )
              : null
          }
          {
            this.totalPercent[this.activeKey] >= 100
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
      </div>
    )
  }
}
