import forTable from '@/mixins/forTable'
import { Button, Space, Tag } from 'ant-design-vue'
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
            title: '合同编号',
            width: 150,
            dataIndex: 'contractNo'
          },
          {
            title: '合同名称',
            width: 180,
            dataIndex: 'contractName'
          },
          {
            title: <div>放款全额<span class={'unit-text'}>(元)</span></div>,
            width: 180,
            align: 'center',
            dataIndex: 'moneyValue'
          },
          // {
          //   title: '签约起止日期',
          //   width: 200,
          //   scopedSlots: { customRender: 'startEndTime' }
          // },
          {
            title: '还款计划',
            width: 100,
            scopedSlots: { customRender: 'refundPlan' }
          },
          {
            title: <div>已还款金额<span class={'unit-text'}>(元)</span></div>,
            width: 120,
            align: 'center',
            dataIndex: 'refundAmount'
          },
          {
            title: '合同',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'contract' }
          },
          {
            title: '编辑时间',
            width: 140,
            dataIndex: 'lastOperateTimeStr'
          },
          {
            title: '操作',
            fixed: 'right',
            width: 180,
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
        refundPlan: (text, record) => [
          <Button type="link" onClick={() => this._setVisibilityOfModal(record, 'visibilityOfRepaymentPlan')}>
            {record.refundPlan}
          </Button>,
          record.isOutTime === 1
            ? <Tag color={'red'} style={'margin-left: 10px'}>逾期</Tag>
            : null
        ],
        contract: (text, record) => record.contractUrl
          ? <Button type="link" onClick={() => window.open(record.contractUrl)}>预览</Button>
          : null,
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              {record.isEdit ? '编辑' : '详情'}
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this._setVisibilityOfModal(record, 'visibilityOfRepayment')}
            >
              还款
            </Button>
          </Space>
        )
      }
    }
  }
}
