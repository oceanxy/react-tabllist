import { Switch, Table, Tag, Space, Button } from 'ant-design-vue'
import table from '@/mixins/table'
import '../assets/styles/index.scss'

export default {
  mixins: [table],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '模块名称',
            dataIndex: 'moduleName',
            align: 'center'
          },
          {
            title: '所属站点',
            align: 'center',
            dataIndex: 'appName'
          },
          {
            title: '模块描述',
            align: 'center',
            dataIndex: 'remark'
          },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTimeStr'
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
            width: 250,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        class="uni-log-table uni-log-functional-modules-table"
        loading={this.getLoading(this.moduleName)}
        {...{ props: this.tableProps }}
        {...{
          scopedSlots: {
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
                  icon="plus"
                  size="small"
                  onClick={() => this.onAddClick(record)}
                >
                  新增
                </Button>
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
              </Space>
            )
          }
        }}
      />
    )
  }
}
