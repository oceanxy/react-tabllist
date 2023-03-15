import forTable from '@/mixins/forTable'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forTable(), forFunction()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '开发商',
            width: 200,
            dataIndex: 'developerName'
          },
          {
            title: '项目',
            width: 200,
            dataIndex: 'projectName'
          },
          {
            title: '资产名称',
            width: 200,
            dataIndex: 'easteName'
          },
          {
            title: '资产性质',
            width: 80,
            align: 'center',
            dataIndex: 'easteDicName'
          },
          {
            title: '所在楼层',
            width: 80,
            align: 'center',
            dataIndex: 'floorNum'
          },
          {
            title: '用途',
            width: 80,
            align: 'center',
            dataIndex: 'useType'
          },
          {
            title: '租售状态',
            width: 80,
            align: 'center',
            dataIndex: 'salesStatusStr'
          },
          {
            title: '建面(㎡)',
            width: 80,
            align: 'center',
            dataIndex: 'buildArea'
          },
          {
            title: '套内(㎡)',
            width: 80,
            align: 'center',
            dataIndex: 'indoorArea'
          },
          {
            title: '编辑时间',
            width: 120,
            dataIndex: 'lastOperateTimeStr'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        title: () => (
          <Space>
            <Button
              type="primary"
              disabled={this.editButtonDisabled}
              onClick={() => this.onCustomEditClick()}
              icon="edit"
            >
              编辑
            </Button>
            <Button
              type="danger"
              disabled={this.deleteButtonDisabled}
              onClick={() => this.onCustomDeleteClick()}
              icon="delete"
            >
              删除
            </Button>
          </Space>
        ),
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  }
}
