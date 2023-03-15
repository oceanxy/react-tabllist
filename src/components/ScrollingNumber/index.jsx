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
      <div class="tg-scrolling-number-container">
        {
          this.inner_text
            ? (
              <div class="tg-scrolling-number-text">
                {this.inner_text}
              </div>
            )
            : null
        }
        <div class="tg-scrolling-number-value">
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
