import { Modal, Table } from 'ant-design-vue'
import '../assets/styles/index.scss'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  data() {
    return {
      modalProps: {
        width: 700,
        footer: ''
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
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      getCurrent: 'getCurrent'
    }),
    visible() {
      return this.$store.state[this.moduleName].conflictModalVisible
    }
  },
  methods: {
    async onCancel() {
      await dispatch(this.moduleName, 'setModalStateForConflict', false)
    }
  },
  render() {
    const attrs = {
      props: this.modalProps,
      on: {
        cancel: this.onCancel
      }
    }

    return (
      <Modal
        title="冲突列表"
        visible={this.visible}
        {...attrs}
      >
        <Table
          {...{ props: this.tableProps }}
          class="uni-log-pages-table-modal"
        />
      </Modal>
    )
  }
}
