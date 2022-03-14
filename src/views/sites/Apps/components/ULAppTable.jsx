import { Switch, Table, Tag, Space, Button } from 'ant-design-vue'
import table from '@/mixins/table'
import './assets/styles/index.scss'

export default {
  mixins: [table],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '站点名称',
            dataIndex: 'appName',
            align: 'center'
          },
          {
            title: '平台类型',
            align: 'center',
            width: 80,
            scopedSlots: {
              customRender: 'platformType'
            }
          },
          {
            title: '协议类型',
            align: 'center',
            width: 80,
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
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 340,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref="siteAppsTable"
        class="uni-log-app-table"
        loading={this.getLoading(this.moduleName)}
        {...{ props: this.tableProps }}
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
              <Space class="operation-space">
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
