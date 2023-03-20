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
      },
      interest: 0,
      principal: 0
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
          this.count()

          // 初始化子模块的搜索值
          this.$store.commit('setState', {
            value: {
              moneyValue: this.currentItem.moneyValue,
              projectSegmentRateList: this.currentItem.projectSegmentRateList,
              repaymentPlanList: this.currentItem.repaymentPlanList
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
    },
    count() {
      this.interest = 0
      this.principal = 0

      this.currentItem.repaymentPlanList.forEach(item => {
        if (item.repaymentType === 1) {
          this.principal += +item.money.toFixed(2)
        } else {
          this.interest += +item.money.toFixed(2)
        }
      })
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'tg-submodule-container'}>
        <Table />
        <p style={'color: #ffa191; font-weight: bolder; font-size: 16px'}>
          还款总计：利息 {this.interest.toLocaleString()} 元 +
          本金 {this.principal.toLocaleString()} 元 =
          {' '}{(this.interest + this.principal).toLocaleString()} 元
        </p>
      </DragModal>
    )
  }
}
