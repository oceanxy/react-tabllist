import { Card, Radio, Select, Space, Spin } from 'ant-design-vue'
import BarChart from '../BarChart/index'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  data() {
    return {
      dateType: 1
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    countDate() {
      return this.getState('countDate', this.moduleName)
    },
    columnarChatList() {
      return this.getState('columnarChatList', this.moduleName)
    },
    isCountDate() {
      let data = []

      if (this.dateType === 1) {
        data = this.countDate?.yearList || []
      } else {
        data = this.countDate?.monthList || []
      }

      return data
    }
  },
  created() {
    this.getCountDate()
    this.getColumnarChatList()
  },
  methods: {
    async getCountDate() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'countDate',
        customApiName: 'getCountDate'
      })
    },
    async getColumnarChatList(date) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'columnarChatList',
        customApiName: 'getColumnarChatList',
        payload: { date: date }
      })
    },
    onChange(val) {
      this.getColumnarChatList(val)
    },
    tabRadioOnChange() {
      const data = this.$refs['onSelect']

      console.log(data)
    }
  },
  render() {
    return (
      <Spin spinning={this.columnarChatList.loading}>
        <Card>
          <Space size={20}>
            <Radio.Group v-model={this.dateType} onChange={this.tabRadioOnChange}>
              <Radio.Button value={1}>按年统计</Radio.Button>
              <Radio.Button value={2}>按月统计</Radio.Button>
            </Radio.Group>
            <Select
              ref={'onSelect'}
              placeholder={this.dateType === 1 ? '选择年' : '选择月'}
              style={'width:160px'} onChange={this.onChange}
              allowClear>
              {
                this.isCountDate?.map(item => (
                  <Select.Option value={item.value}>{item.name}</Select.Option>
                ))
              }
            </Select>
          </Space>
          <BarChart />
        </Card>
      </Spin>
    )
  }
}
