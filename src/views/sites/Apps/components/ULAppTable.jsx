import { Switch, Table, Tag, message } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import pagination from '@/mixins/pagination'
import './assets/styles/index.scss'
import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  mixins: [pagination],
  data() {
    return {
      columns: [
        {
          title: '站点名称',
          dataIndex: 'appName'
        },
        {
          title: '平台类型',
          dataIndex: '',
          scopedSlots: {
            customRender: 'platformType'
          }
        },
        {
          title: '协议类型',
          dataIndex: 'protocol',
          scopedSlots: {
            customRender: 'protocol'
          }
        },
        {
          title: '域名',
          dataIndex: 'domain'
        },
        {
          title: '首页',
          dataIndex: 'defaultUrl'
        },
        {
          title: '采集类型',
          dataIndex: 'collectType',
          scopedSlots: { customRender: 'collectType' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'row' }
        }
      ],
      rowSelection: { selections: true },
      dataSource: [],
      rowKey: 'id'
    }
  },
  computed: {
    ...mapGetters({ getLoading: 'getLoading' })
  },
  async created() {
    // 为 list 创建动态侦听器
    this.$watch(
      () => this.$store.state[this.moduleName].list,
      async list => {
        this.dataSource = list
      }
    )

    await this.fetchList()
  },
  methods: {
    async fetchList() {
      await dispatch(this.moduleName, 'getSiteApps')
    },
    async handleStatusChange(checked, record) {
      const status = await dispatch(this.moduleName, 'updateStatus', {
        id: record.id,
        status: checked ? 1 : 2
      })

      // 更新当前行受控Switch组件的值
      const index = this.dataSource.findIndex(item => item.id === record.id)
      this.$set(this.dataSource[index], 'status', checked ? 1 : 2)

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 的状态已更新！'
        ])
      } else {
        message.warning([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 的状态未更新！'
        ])
      }
    }
  },
  render() {
    return (
      <Table
        loading={this.getLoading(this.moduleName)}
        pagination={this.pagination}
        {...{ props: this.$data }}
        {...{
          scopedSlots: {
            platformType: (text, record) => ['web', 'h5', 'android', 'ios'][+record.platformType - 1],
            protocol: (text, record) => ['https', 'http'][+record.protocol - 1],
            collectType: (text, record) => (
              <Tag color="blue">
                {['全量采集', '可视化埋点'][record.collectType - 1]}
              </Tag>
            ),
            status: (text, record) => (
              <Switch
                checked={record.status === 1}
                onChange={checked => this.handleStatusChange(checked, record)}
              />
            )
          }
        }}
      />
    )
  }
}
