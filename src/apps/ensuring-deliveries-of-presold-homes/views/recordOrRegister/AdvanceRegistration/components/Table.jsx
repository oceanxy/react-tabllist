import forTable from '@/mixins/forTable'
import forFunction from '@/mixins/forFunction'
import { Button, Space, Tag } from 'ant-design-vue'

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
            title: '不动产名称',
            width: 160,
            dataIndex: 'estateName'
          },
          {
            title: '性质',
            align: 'center',
            width: 70,
            dataIndex: 'easteDicName'
          },
          {
            title: '租售状态',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'salesStatus' }
          },
          {
            title: <div>建面<span class={'unit-text'}>(㎡)</span></div>,
            width: 70,
            align: 'center',
            dataIndex: 'buildArea'
          },
          {
            title: <div>套内<span class={'unit-text'}>(㎡)</span></div>,
            align: 'center',
            width: 70,
            dataIndex: 'infloorArea'
          },
          {
            title: <div>备案总价<span class={'unit-text'}>(元)</span></div>,
            width: 120,
            dataIndex: 'recordTotal'
          },
          {
            title: '开发商',
            width: 120,
            dataIndex: 'developerName'
          },
          {
            title: '项目',
            width: 150,
            dataIndex: 'projectName'
          },
          {
            title: '签约日期',
            width: 120,
            dataIndex: 'contractDateStr'
          },
          {
            title: '状态',
            width: 80,
            scopedSlots: { customRender: 'rescindContractStatus' }
          },
          {
            title: '解除时间',
            width: 120,
            dataIndex: 'rescindContractDateStr'
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
        title: (text, record) => (
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
              icon="delete"
              disabled={this.tableSelectedRowKeys}
              onClick={() => this.onCustomDeleteClick()}>删除</Button>
          </Space>
        ),
        salesStatus: (text, record) => (
          <div>
            {
              this.salesStatus(record)
            }
          </div>
        ),
        rescindContractStatus: (text, record) => {
          return record.rescindContractStatus === 1 ? <Tag color="orange" >未解除</Tag> : <Tag color="green">已解除</Tag>
        },
        operation: (text, record) => (
          <Space>
            {
              record.rescindContractStatus === 1 ? <Button
                type="link"
                size="small"
                disabled={this.isFeatureDisabled}
                onClick={() => this.onEditClick(record)}
              >
                编辑
              </Button> : ''
            }
            {
              record.rescindContractStatus === 1 ? <Button
                type="link"
                size="small"
                disabled={this.isFeatureDisabled}
                onClick={() => this._setVisibilityOfModal(record, 'modalOfRemoveVisible')}
              >
                解除
              </Button> : ''
            }
            <Button
              type="link"
              size="small"
              disabled={this.isFeatureDisabled}
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>

          </Space>
        )
      }
    }
  },
  computed: {
    // 学校及学校下级禁用新增、修改或删除等一切操作
    isFeatureDisabled() {
      const { type } = this.$store.state[this.moduleName].search

      // 类型（1.区 2.职能部门 3.街道 4.学校顶级 5.学校 6.年级 7.班级）
      return [4, 5, 6, 7].includes(type)
    },
    tableSelectedRowKeys() {
      if (this.getState('selectedRowKeys', this.moduleName).length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    salesStatus(record) {
      let text = ''

      if (record.salesStatus === 1) {
        text = '已售'
      } else if (record.salesStatus === 2) {
        text = '未售'
      } else if (record.salesStatus === 3) {
        text = '已租'
      } else if (record.salesStatus === 4) {
        text = '未知'
      }

      return text ?? ''
    }
  }
}
