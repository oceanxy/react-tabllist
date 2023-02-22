import './index.scss'
import _ from 'lodash'

export default {
  props: {
    targetNumber: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    startDistance: 0,
    targetDistance: 0,
    itemHeight: 0
  }),
  watch: {
    targetNumber(value) {
      this.targetNumber = value

      this.startDistance = this.targetDistance
      this.targetDistance = this.$refs.container.clientHeight * this.targetNumber
    }
  },
  mounted() {
    this.itemHeight = this.$refs.container.clientHeight

    if (this.targetNumber) {
      this.startDistance = 0
      this.targetDistance = this.targetNumber * this.itemHeight
    } else {
      this.startDistance = 9 * this.itemHeight
      this.targetDistance = 0
    }
  },
  render() {
    return (
      <div
        ref="container"
        class="number-container"
      >
        <div
          class="scroll-container animation"
          style={{
            '--height': `${this.itemHeight}px`,
            '--start': `-${this.startDistance}px`,
            '--target': `-${this.targetDistance}px`
          }}
        >
          {
            _.range(0, 10).map(num => <div class="number-item">{num}</div>)
          }
        </div>
      </div>
    )
  }
}
