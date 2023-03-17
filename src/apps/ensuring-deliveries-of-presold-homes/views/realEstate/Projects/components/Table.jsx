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
            title: <div>借款金额<span class={'unit-text'}>(元)</span></div>,
            width: 100,
            align: 'center',
            dataIndex: 'moneyValue'
          },
          {
            title: '还款计划',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'refundPlan' }
          },
          {
            title: '下期还款时间',
            width: 100,
            align: 'center',
            dataIndex: 'nextTime'
          },
          {
            title: <div>已还金额<span class={'unit-text'}>(元)</span></div>,
            width: 100,
            align: 'center',
            dataIndex: 'refundAmount'
          },
          {
            title: '资产收购',
            width: 80,
            align: 'center',
            dataIndex: 'acquisition'
          },
          {
            title: '市城投合同',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'ctContract' }
          },
          {
            title: '开发商合同',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'devContract' }
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
        refundPlan: (text, record) => (
          <Button type="link" onClick={() => this._setVisibilityOfModal(record, 'visibilityOfRepaymentPlan')}>
            {record.refundPlan}
          </Button>
        ),
        ctContract: (text, record) => record.ctContractUrl
          ? <Button type="link" onClick={() => window.open(record.ctContractUrl)}>预览</Button>
          : null,
        devContract: (text, record) => record.devContractUrl
          ? <Button type="link" onClick={() => window.open(record.devContractUrl)}>预览</Button>
          : null,
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
