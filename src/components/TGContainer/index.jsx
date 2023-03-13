import './index.scss'
import { Button } from 'ant-design-vue'

export default {
  props: {
    /**
     * 标题文字 或 JSX.Element
     */
    modalTitle: {
      type: [String, Object],
      default: ''
    },
    /**
     * 组件宽度
     * 数字的单位为像素，字符串的单位为百分比
     */
    width: {
      type: [Number, String],
      default: 500
    },
    /**
     * 是否展示“更多”箭头
     */
    showMore: {
      type: Boolean,
      default: false
    },
    /**
     * 右侧显示更多的图标，依赖 showMore
     * DOMElement 或 JSX.Element
     */
    rightIcon: {
      type: [String, Object],
      default: ''
    },
    /**
     * 是否显示标题与内容的分割线
     */
    showTitleLine: {
      type: Boolean,
      default: false
    },
    /**
     * 内容区的自定义class
     */
    contentClass: {
      type: String,
      default: ''
    },
    /**
     * 显示边框阴影
     */
    showBoxShadow: {
      type: Boolean,
      default: false
    },
    /**
     * 标题区的自定义class
     */
    titleClass: {
      type: String,
      default: ''
    },
    /**
     * 是否显示标题前的图案
     */
    showTitleShape: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _rightIcon() {
      return (
        <div class={'right-icon'}>
          {this.rightIcon}
        </div>
      )
    },
    _className() {
      return `${this.contentClass ? `${this.contentClass} ` : ''}${this.showTitleLine ? 'line ' : ''}box-content`
    },
    _titleClassName() {
      return `${this.titleClass ? `${this.titleClass} ` : ''}${
        this.showTitleShape
          ? 'divider padding-left '
          : ''
      }box-title`
    }
  },
  methods: {
    onMore() {
      this.$emit('more')
    }
  },
  render() {
    return (
      <div
        class={`${this.showBoxShadow ? 'show-shadow ' : ''}tg-universal-box`}
        style={{ '--box-width': `${this.width}${isNaN(this.width) ? '' : 'px'}` }}
      >
        {
          this.modalTitle
            ? (
              <div class={this._titleClassName}>
                {this.modalTitle}
                {
                  this.showMore
                    ? (
                      this._rightIcon || (
                        <Button
                          class={'right-icon'}
                          icon="right"
                          onclick={this.onMore}
                        />
                      )
                    )
                    : null
                }
              </div>
            )
            : null
        }
        {
          this.$slots.default
            ? <div class={this._className}>{this.$slots.default}</div>
            : null
        }
      </div>
    )
  }
}
