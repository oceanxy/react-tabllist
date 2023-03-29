import DragModal from '@/components/DragModal'
import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import Table from './Table'
import { Button } from 'ant-design-vue'

export default {
  name: 'RepaymentPlanPreview',
  mixins: [forTableModal(), forModuleName(true)],
  data() {
    return {
      modalProps: {
        width: 1000,
        destroyOnClose: true,
        footer: (
          <Button
            type={'primary'}
            icon={'close'}
            onClick={this.onClose}
          >
            关闭
          </Button>
        )
      }
    }
  },
  computed: {
    description() {
      return this.$store.state[this.moduleName][this.submoduleName].description || ''
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: this.onClose }
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
            value: {
              moneyValueList: this.currentItem.moneyValueList,
              projectSegmentRateList: this.currentItem.projectSegmentRateList,
              interestRepaymentPlanList: this.currentItem.interestRepaymentPlanList,
              principalRepaymentPlanList: this.currentItem.principalRepaymentPlanList,
              isBorrow: this.currentItem.isBorrow
            },
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            stateName: 'search'
          })
        }
      }
    }
  },
  methods: {
    onClose() {
      this.$store.commit('setState', {
        value: this.currentItem._currentItem,
        moduleName: this.moduleName,
        stateName: 'currentItem'
      })

      this.onCancel(this.visibilityFieldName)
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'tg-submodule-container'}>
        <Table />
        <p style={'color: #ffa191; font-weight: bolder; font-size: 16px'}>
          {this.description}
        </p>
      </DragModal>
    )
  }
}
