import './index.scss'

export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    },
    /**
     * 子组件布局方式
     * - row子组件横向排列
     * - column 默认 子组件纵向排列
     */
    layout: {
      type: String,
      default: 'column'
    }
  },
  render() {
    return (
      <div
        class="tg-container"
        {
          ...{
            style: this.height ? {
              height: this.height + 'px'
            } : {}
          }
        }
      >
        <div class={`icon-container${this.icon ? ` ${this.icon}` : ''}`}>
          <div class="name-container">
            <span class="name">{this.text}</span>
          </div>
        </div>
        <div class={`content${this.layout ? ` ${this.layout}-container` : ''}`}>
          {
            this.$slots.default
          }
        </div>
      </div>
    )
  }
}
