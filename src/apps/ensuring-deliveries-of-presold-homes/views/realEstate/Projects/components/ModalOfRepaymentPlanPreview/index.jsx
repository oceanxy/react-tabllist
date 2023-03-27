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
        width: 900,
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
        {/* <p style={'color: #ffa191; font-weight: bolder; font-size: 16px'}> */}
        {/*   还款总计： */}
        {/*   利息 {this.totalRepayment.interest.toLocaleString()} 元 + */}
        {/*   本金 {this.totalRepayment.principal.toLocaleString()} 元 = */}
        {/*   {' '} */}
        {/*   {(this.totalRepayment.interest + this.totalRepayment.principal).toLocaleString()} 元 */}
        {/* </p> */}
      </DragModal>
    )
  }
}
