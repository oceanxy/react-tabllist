import forTable from '@/mixins/forTable'
import { Button, Tag } from 'ant-design-vue'

export default {
  mixins: [forTable({ injectQuery: false })],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '期数',
            width: 60,
            align: 'center',
            dataIndex: 'period'
          },
          {
            title: '还款日期',
            width: 100,
            dataIndex: 'repaymentEndDayStr'
          },
          {
            title: '资金类型',
            width: 80,
            align: 'center',
            dataIndex: 'repaymentTypeStr'
          },
          {
            title: '计划还款',
            width: 100,
            align: 'center',
            dataIndex: 'money'
          },
          {
            title: '罚息',
            width: 100,
            align: 'center',
            dataIndex: 'interestPenalty'
          },
          {
            title: '经办人',
            width: 80,
            align: 'center',
            dataIndex: 'lastOperatorName'
          },
          {
            title: '是否逾期',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'isOutTime' }
          },
          {
            title: '状态',
            width: 70,
            align: 'center',
            dataIndex: 'repaymentStatusStr'
          },
          {
            title: '凭证',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'refundCertificate' }
          },
          {
            title: '操作时间',
            width: 120,
            dataIndex: 'lastOperateTimeStr'
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        isOutTime: (text, record) => (
          <Tag color={record.isOutTime === 1 ? 'red' : ''}>
            {record.isOutTimeStr}
          </Tag>
        ),
        refundCertificate: (text, record) => record.refundCertificate?.path
          ? (
            <Button
              type={'link'}
              onClick={() => window.open(record.refundCertificate.path)}
            >
              预览
            </Button>
          )
          : null
      }
    }
  }
}
