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
            width: 120,
            dataIndex: 'fullName'
          },
          {
            title: '企业性质',
            width: 100,
            align: 'center',
            dataIndex: 'typeName'
          },
          {
            title: '负责人',
            width: 100,
            align: 'center',
            dataIndex: 'leader'
          },
          {
            title: '联系电话',
            width: 120,
            dataIndex: 'leaderTel'
          },
          {
            title: '邮箱',
            width: 150,
            dataIndex: 'email'
          },
          {
            title: '办公地址',
            width: 200,
            dataIndex: 'address'
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
