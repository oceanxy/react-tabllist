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
    totalRepayment() {
      const result = {
        principal: 0,
        interest: 0
      }

      this.$store.state[this.moduleName][this.submoduleName].list.forEach(item => {
        if (item.repaymentType === 1) {
          result.principal += +item.money.toFixed(2)
        } else {
          result.interest += +item.money.toFixed(2)
        }
      })

      return result
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
          还款总计：
          ￥ {this.totalRepayment.interest.toLocaleString()} (利息) +
          ￥ {this.totalRepayment.principal.toLocaleString()} (本金) =
          ￥ {(this.totalRepayment.interest + this.totalRepayment.principal).toLocaleString()}
        </p>
      </DragModal>
    )
  }
}
