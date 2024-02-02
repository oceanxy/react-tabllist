import './index.scss'
import _ from 'lodash'

export default {
  name: 'TGScrollingNumber',
  props: {
    itemHeight: {
      type: Number,
      required: true
    },
    /**
     * 滚动目标数字
     */
    targetNumber: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    startDistance: 0,
    targetDistance: 100, // 初始值，随意设置（解决初始数字为0时没有动画的问题）
    duration: 0
  }),
  watch: {
    targetNumber: {
      immediate: true,
      handler(value) {
        this.$nextTick(() => {
          this.duration = this.getRandom(1000, 2000)
          this.startDistance = this.targetDistance
          this.targetDistance = this.$refs.container.children[value].offsetTop
        })
      }
    }
  },
  methods: {
    getRandom(min, max) {
      const floatRandom = Math.random()
      const difference = max - min
      // 介于 0 和差值之间的随机数
      const random = Math.round(difference * floatRandom)

      return random + min
    }
  },
  render() {
    return (
      <div class="tg-scrolling-number-content">
        <div
          ref="container"
          class="tg-scrolling-number-scroll-container animation"
          style={{
            '--duration': `${this.duration}ms`,
            '--start': `${-this.startDistance}px`,
            '--target': `${-this.targetDistance}px`
          }}
        >
          {
            _.range(0, 10).map(num => {
              return (
                <div class="number-item" style={`height: ${this.itemHeight}px;line-height: ${this.itemHeight}px`}>
                  {num}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
