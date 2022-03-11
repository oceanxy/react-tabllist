import { Switch, Table, Tag, message, Space, Button } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import pagination from '@/mixins/pagination'
import { dispatch } from '@/utils/store'
import './assets/styles/index.scss'
import { cloneDeep } from 'lodash'

export default {
  inject: ['moduleName'],
  mixins: [pagination],
  data() {
    return {
      columns: [
        {
          title: '站点名称',
          dataIndex: 'appName',
          align: 'center'
        },
        {
          title: '平台类型',
          align: 'center',
          scopedSlots: {
            customRender: 'platformType'
          }
        },
        {
          title: '协议类型',
          align: 'center',
          scopedSlots: {
            customRender: 'protocol'
          }
        },
        {
          title: '域名',
          dataIndex: 'domain',
          align: 'center'
        },
        {
          title: '首页',
          dataIndex: 'defaultUrl',
          align: 'center'
        },
        {
          title: '采集类型',
          align: 'center',
          scopedSlots: { customRender: 'collectType' }
        },
        {
          title: '状态',
          align: 'center',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          fixed: 'right',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      rowSelection: {
        selections: true,
        fixed: true,
        columnWidth: 50
      },
      rowKey: 'id',
      tableLayout: 'fixed',
      // scroll: { x: true },
      dataSource: []
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
    async onStatusChange(checked, record) {
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
    },
    async onEditClick(record) {
      await dispatch(this.moduleName, 'setCurrent', cloneDeep(record))
      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    async onDeleteClick(record) {
      const status = await dispatch(this.moduleName, 'delete', [record.id])

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 已成功删除！'
        ])
      } else {
        message.warning([
          <span style={{ color: 'blue' }}>{record.appName}</span>,
          ' 删除失败！'
        ])
      }
    }
  },
  render() {
    return (
      <Table
        class="uni-log-app-table"
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
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  icon="edit"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  修改
                </Button>
                <Button
                  type="link"
                  icon="delete"
                  size="small"
                  onClick={() => this.onDeleteClick(record)}
                >
                  删除
                </Button>
                <Button
                  type="link"
                  icon="control"
                  size="small"
                >
                  配置页面
                </Button>
                <Button
                  type="link"
                  icon="appstore"
                  size="small"
                >
                  功能模块
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
