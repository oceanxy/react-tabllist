import { Modal, Table } from 'ant-design-vue'
import tableModal from '@/mixins/tableModal'
import '../assets/styles/index.scss'

export default {
  mixins: [tableModal],
  data() {
    return {
      modalProps: {
        width: 700
      },
      tableProps: {
        columns: [
          {
            title: '页面名称',
            dataIndex: 'pageName'
          },
          {
            title: '页面路径',
            width: '20%',
            scopedSlots: { customRender: 'pagePathList' }
          },
          {
            title: '同组路径',
            scopedSlots: { customRender: 'isSameGroup' }
          },
          {
            title: '匹配权重',
            align: 'center',
            dataIndex: ''
          },
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
  render() {
    return (
      <Modal
        title={`${this.title}页面`}
        visible={this.visible}
        {...{ props: this.modalProps }}
      >
        <Table
          {...{ props: this.tableProps }}
          class="uni-log-pages-table-modal"
        />
      </Modal>
    )
  }
}
