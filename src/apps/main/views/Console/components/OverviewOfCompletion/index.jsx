import forTable from '@/mixins/forTable'
import { Progress } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  mixins: [forTable({ isFetchList: false })],
  data() {
    return {
      tableProps: {
        rowSelection: null,
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '学校',
            dataIndex: 'schoolName'
          },
          {
            title: '完成人数',
            width: 80,
            align: 'center',
            dataIndex: 'endStudentNum'
          },
          {
            title: '完成进度',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'endPercent' }
          }
        ]
      },
      scopedSlots: {
        serialNumber: (text, record, index) => index + 1,
        endPercent: (text, record) => {
          return (
            <Progress
              style={{ padding: '0 20px 0 10px' }}
              percent={+record.endPercent.replace('%', '')}
            />
          )
        }
      }
    }
  },
  computed: {
    attributes() {
      return {
        props: {
          ...this.tableProps,
          dataSource: this.$store.state[this.moduleName].list?.endDataVO?.endSchoolVOS ?? [],
          loading: this.loading
        }
      }
    }
  }
}
