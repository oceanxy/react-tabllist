// 声明一个变量用来防止多个组件多次注册同一事件 会导致元素挂载太多同一事件导致页面卡顿
let isBindScrollWheel = false

export default {
  mounted() {
    this.$nextTick(() => {
      this.addScrollWheelToTable()
    })
  },
  beforeDestroy() {
    this.removeScrollWheelFromTable()
  },
  methods: {
    // 移除相关元素的相关事件和清空全局数据
    removeScrollWheelFromTable() {
      if (this._allTableContainers && this._allTableContainers.length) {
        for (let i = 0; i < this._allTableContainers.length; i++) {
          const item = this._allTableContainers[i]

          item.removeEventListener('scroll', this.handleScrollCustom)
          item.removeEventListener('wheel', this.handleWheelCustom)
        }

        this._allTableContainers = null
        this._lastTableScrollTop = null
        this._lastTableScrollLeft = null
        isBindScrollWheel = false
      }
    },
    //
    /**
     * 给ant-design-vue的table组件中 有fixed属性的 元素
     *  1、重写源码中的 handleWheel 事件
     *    具体位置在 node_modules\ant-design-vue\es\vc-table\src\Table
     if (window.navigator.userAgent.match(/Trident/7./) && scroll.y) 改为 if (scroll.y)
     2、重写源码中的 handleBodyScroll 事件
     为了在 handleWheel 事件中使用一个 _lastTableScrollTop 和 _lastTableScrollLeft 变量
     * @returns void
     */
    addScrollWheelToTable() {
      if (isBindScrollWheel) return

      // 找到 fixed 元素下在相关元素（左右fixed的列） .ant-table-fixed-left/.ant-table-fixed-right 元素下的 .ant-table-body-inner
      const innerFixeds = document.querySelectorAll('.ant-table-body-inner')
      // 找到原有的 table 固定区域
      const innerBody = document.querySelector('.ant-table-body')

      // 给所有相关的元素再加一次
      if (innerFixeds.length) {
        this._allTableContainers = [...innerFixeds]

        if (innerBody) {
          this._allTableContainers.push(innerBody)
        }

        for (let i = 0; i < this._allTableContainers.length; i++) {
          const item = this._allTableContainers[i]

          item.addEventListener('scroll', this.handleScrollCustom)
          item.addEventListener('wheel', this.handleWheelCustom)
        }
        isBindScrollWheel = true
      }
    },
    handleScrollCustom(e) {
      const target = e.target

      e.preventDefault()

      // Remember last scrollTop for scroll direction detecting.
      this._lastTableScrollTop = target.scrollTop
      this._lastTableScrollLeft = target.scrollLeft
    },
    handleWheelCustom(event) {
      const ref_bodyTable = document.querySelector('.ant-table-scroll .ant-table-body')
      const ref_fixedColumnsBodyLeft = document.querySelector('.ant-table-fixed-left .ant-table-body-inner')
      const ref_fixedColumnsBodyRight = document.querySelector('.ant-table-fixed-right .ant-table-body-inner')

      event.preventDefault()

      const { shiftKey, deltaY, target } = event
      const bodyTable = ref_bodyTable
      const fixedColumnsBodyLeft = ref_fixedColumnsBodyLeft
      const fixedColumnsBodyRight = ref_fixedColumnsBodyRight

      if (!shiftKey) {
        let scrollTop = 0

        if (this._lastTableScrollTop) {
          scrollTop = this._lastTableScrollTop + deltaY
        } else {
          scrollTop = deltaY
        }

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop
        }
      } else {
        let scrollLeft = 0

        if (this._lastTableScrollLeft) {
          scrollLeft = this._lastTableScrollLeft + deltaY
        } else {
          scrollLeft = deltaY
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollLeft = scrollLeft
        }
      }
    }
  }
}
