import './index.scss'
import Scroll from './Scroll'

export default {
  data() {
    return {
      innerText: '',
      innerValue: ''
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
        this.innerText = value
      }
    },
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value.toLocaleString().split('')
      }
    }
  },
  render() {
    return (
      <div class="tg-scrolling-number-container">
        {
          this.innerText
            ? (
              <div class="tg-scrolling-number-text">
                {this.innerText}
              </div>
            )
            : null
        }
        <div class="tg-scrolling-number-value">
          {
            this.innerValue.map(numStr => {
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
