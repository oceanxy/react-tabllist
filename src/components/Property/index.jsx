import './index.scss'
import Scroll from '@/components/Property/Scroll'

export default {
  data() {
    return {
      inner_icon: '',
      inner_text: '',
      inner_value: '',
      inner_color: ''
    }
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#c9e7fe'
    }
  },
  watch: {
    icon: {
      immediate: true,
      handler(value) {
        this.inner_icon = value
      }
    },
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
    },
    color: {
      immediate: true,
      handler(value) {
        this.inner_color = value
      }
    }
  },
  render() {
    return (
      <div class="tg-property">
        <div class={`icon${this.inner_icon ? ` ${this.inner_icon}` : ''}`} />
        <div
          class="value"
          style={{ '--color': this.inner_color }}
        >
          {
            this.inner_value.map(numStr => {
              return !isNaN(+numStr)
                ? <Scroll targetNumber={+numStr} />
                : <div>{numStr}</div>
            })
          }
        </div>
        <div class="text">
          {this.inner_text}
        </div>
      </div>
    )
  }
}
