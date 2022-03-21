import { Switch, Table, Space, Button, message } from 'ant-design-vue'
import table from '@/mixins/table'
import '../assets/styles/index.scss'
import { dispatch } from '@/utils/store'

export default {
  mixins: [table],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '页面名称',
            dataIndex: 'pageName'
          },
          {
            title: '所属站点',
            dataIndex: 'appName'
          },
          {
            title: '页面路径',
            width: '20%',
            scopedSlots: { customRender: 'pagePathList' }
          },
          {
            title: '监控状态',
            align: 'center',
            scopedSlots: { customRender: 'isMonitor' }
          },
          {
            title: '页面类型',
            align: 'center',
            scopedSlots: { customRender: 'classify' }
          },
          {
            title: '同组页面',
            align: 'center',
            scopedSlots: { customRender: 'isSameGroup' }
          },
          {
            title: '元素埋点数量',
            align: 'center',
            dataIndex: ''
          },
          {
            title: '冲突页面数量',
            align: 'center',
            dataIndex: ''
          },
          {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createTimeStr'
          },
          // {
          //   title: '状态',
          //   align: 'center',
          //   width: 80,
          //   scopedSlots: { customRender: 'status' }
          // },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 400,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onMonitorStatusChange(checked, record) {
      const status = await dispatch(this.moduleName, 'updateMonitorStatus', {
        id: record.id,
        status: +checked
      })

      const index = this.tableProps.dataSource.findIndex(item => item.id === record.id)

      if (status) {
        message.success([
          <span style={{ color: 'blue' }}>{record.pageName}</span>,
          ' 的监控状态已更新！'
        ])

        // 更新当前行受控Switch组件的值
        this.$set(this.tableProps.dataSource[index], 'isMonitor', checked ? 1 : 2)
      } else {
        // 调用接口失败时，还原值
        this.$set(this.tableProps.dataSource[index], 'isMonitor', checked ? 2 : 1)
      }
    },
    onBuriedClick(record) {
      //
    },
    onShowChartClick(record) {
      //
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        class="uni-log-table uni-log-pages-table"
        loading={this.getLoading(this.moduleName)}
        {...{ props: this.tableProps }}
        {...{
          scopedSlots: {
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
            isMonitor: (text, record) => (
              <Switch
                checked={record.isMonitor === 1}
                onChange={checked => this.onMonitorStatusChange(checked, record)}
              />
            ),
            classify: (text, record) => (
              ['综合页面', '资源页面-公共', '资源页面-专有', '专题应用页面'][+record.classify - 1]
            ),
            pagePathList: (text, record) => {
              return record.pagePathList.map(path => (
                <span>{path.allPath}</span>
              ))
            },
            isSameGroup: (text, record) => (
              ['否', '是'][+record.isSameGroup]
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
                <Button
                  type="link"
                  icon="environment"
                  size="small"
                  onClick={() => this.onBuriedClick(record)}
                >
                  埋点
                </Button>
                <Button
                  type="link"
                  icon="eye"
                  size="small"
                  onClick={() => this.onShowChartClick(record)}
                >
                  查看热点图
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
