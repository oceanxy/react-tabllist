import { Button, DatePicker, Input, InputNumber, message, Select, Table } from 'ant-design-vue'
import { cloneDeep, debounce } from 'lodash'
import moment from 'moment'
import forIndex from '@/mixins/forIndex'

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
          title: <span class={'ant-form-item-required'}>还款日期</span>,
          width: 130,
          scopedSlots: { customRender: 'repaymentEndDay' }
        },
        {
          title: <span class={'ant-form-item-required'}>资金类型</span>,
          width: 90,
          scopedSlots: { customRender: 'repaymentType' }
        },
        {
          title: '本金比例',
          width: 80,
          scopedSlots: { customRender: 'percent' }
        },
        {
          title: '还款金额',
          width: 150,
          scopedSlots: { customRender: 'money' }
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
      return this.dataSource.reduce((total, item) => {
        if (item.repaymentType === 1) {
          total += item.percent
        }

        return total
      }, 0)
    },
    currentItem() {
      return this.$store.state[this.moduleName].currentItem
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
        if (!ds.repaymentEndDay || !ds.repaymentType || (ds.repaymentType === 1 && !ds.percent)) {
          err = true
          break
        }
      }

      this.$nextTick(() => {
        this.interest = 0
        this.principal = 0

        if (!err) {
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

      if (field === 'percent') {
        if (this.totalPercent > 100) {
          message.warn('已填写的本金比例之和已达最大值（100%）')

          const percent = 100 - this.totalPercent + value

          this.dataSource[index][field] = percent
          this.dataSource[index]['money'] = this.amountBorrowed * (percent / 100)
        } else {
          this.dataSource[index]['money'] = this.amountBorrowed * (value / 100)
        }
      }

      this.validator()
    },
    count() {
      this.dataSource.forEach(item => {
        if (item.repaymentType === 1) {
          this.principal += +item.money.toFixed(2)
        } else {
          this.interest += +item.money.toFixed(2)
        }
      })
    },
    async getPreview() {
      await this._setVisibilityOfModal(
        {
          _currentItem: this.currentItem,
          moneyValue: this.amountBorrowed,
          projectSegmentRateList: this.projectSegmentRateList,
          repaymentPlanList: this.dataSource
        },
        'visibilityOfRepaymentPlanPreview'
      )
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
            percent: (text, record, index) => (
              <InputNumber
                vModel={record.percent}
                class={record.repaymentType === 1 && !record.percent ? '' : 'pass'}
                style={'width: 100%'}
                min={0}
                max={100}
                precision={0}
                placeholder="本金比例"
                disabled={this.disabled || record.repaymentType !== 1}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                onChange={debounce(value => this.onCompValueChange('percent', value, index), 300)}
              />
            ),
            money: (text, record, index) => (
              <InputNumber
                vModel={record.money}
                class={'pass'}
                style={'width: 100%'}
                min={0}
                max={1000000000000}
                precision={2}
                placeholder="还款金额"
                disabled
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                onChange={debounce(value => this.onCompValueChange('money', value, index), 300)}
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
        <p style={'color: #ffa191; font-weight: bolder; font-size: 14px'}>
          还款总计：利息{this.interest}元 + 本金{this.principal}元 = {this.interest + this.principal}元
          {
            this.totalPercent >= 100
              ? (
                <Button
                  type={'link'}
                  style={'margin-left: 10px'}
                  title={'预览还款计划'}
                  onClick={this.getPreview}
                >
                  预览还款计划
                </Button>
              )
              : null
          }
        </p>
      </div>
    )
  }
}
