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
            title: '类型',
            width: 60,
            align: 'center',
            dataIndex: 'repaymentTypeStr'
          },
          {
            title: <div>还款金额<span class={'unit-text'}>(元)</span></div>,
            width: 100,
            dataIndex: 'money'
          },
          {
            title: <div>本金比例<span class={'unit-text'}>(%)</span></div>,
            width: 100,
            dataIndex: 'percent'
          },
          {
            title: '金额描述',
            dataIndex: 'description'
          },
          {
            title: '备注',
            width: 150,
            dataIndex: 'remark'
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
