import DragModal from '@/components/DragModal'
import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import Table from './Table'

export default {
  name: 'RepaymentPlan',
  mixins: [forTableModal(), forModuleName(true)],
  data() {
    return {
      modalProps: {
        width: 940,
        destroyOnClose: true
      }
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: () => this.onCancel(this.visibilityFieldName) }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          // 初始化子模块的搜索值
          this.$store.commit('setState', {
            value: { id: this.currentItem.id },
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            stateName: 'search'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'tg-submodule-container'}>
        <Table />
      </DragModal>
    )
  }
}
