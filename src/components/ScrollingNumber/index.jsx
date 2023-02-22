import './index.scss'
import Scroll from './Scroll'

export default {
  data() {
    return {
      inner_text: '',
      inner_value: ''
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(value) {
        this.inner_text = value
      }
    },
    value: {
      immediate: true,
      handler(value) {
        this.inner_value = value.toLocaleString().split('')
      }
    }
  },
  render() {
    return (
      <div class="pe-scrolling-number-container">
        <div class="text">
          {this.inner_text}
        </div>
        <div class="value">
          {
            this.inner_value.map(numStr => {
              return !isNaN(+numStr)
                ? <Scroll targetNumber={+numStr} />
                : <div>{numStr}</div>
            })
          }
        </div>
      </div>
    )
  }
}
