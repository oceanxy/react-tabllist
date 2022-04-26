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
    start: 0,
    targetDistance: 0,
    itemHeight: 0
  }),
  watch: {
    targetNumber(value) {
      this.executeAnimation(value)
    }
  },
  mounted() {
    this.itemHeight = this.$refs.container.clientHeight
    this.executeAnimation()
  },
  methods: {
    executeAnimation(height, value) {
      this.start = this.targetDistance

      if (this.targetDistance) {
        this.targetDistance = 0
      }

      this.$nextTick(() => {
        this.targetDistance = this.$refs.container.clientHeight * (value || this.targetNumber)
      })
    }
  },
  render() {
    return (
      <div
        ref="container"
        class="number-container"
      >
        <div
          class={`scroll-container${this.targetDistance ? ' scroll' : ' reduction'}`}
          style={{
            '--height': `${this.itemHeight}px`,
            '--start': `-${this.start}px`,
            '--target': `-${this.targetDistance}px`
          }}
        >
          {
            _.range(0, 10).map(num => (
              <div
                class={`number-item${this.targetDistance || !this.targetNumber ? ' show' : ''}`}
              >
                {num}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
