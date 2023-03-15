import { Button, Space, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
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
            title: '所属菜单',
            width: 140,
            dataIndex: 'menuName'
          },
          {
            title: '名称',
            width: 100,
            align: 'center',
            dataIndex: 'fnName'
          },
          {
            title: '描述',
            dataIndex: 'fnDescribe'
          },
          {
            title: '排序',
            width: 100,
            align: 'center',
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        serialNumber: (text, record, index) => {
          return <span>{index + 1}</span>
        },
        isShow: (text, record) => {
          return record.isShow === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        isDefault: (text, record) => {
          return record.isDefault === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        status: (text, record) => {
          return record.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">失效</Tag>
        },
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
