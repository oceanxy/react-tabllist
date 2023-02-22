import './assets/styles/index.scss'
import { Button } from 'ant-design-vue'

export default {
  name: 'TGProfileLayout',
  props: {
    /**
     * 主容器样式表名
     */
    contentClass: {
      type: String,
      default: ''
    },
    /**
     * 侧边容器样式表名
     */
    siderClass: {
      type: String,
      default: ''
    },
    /**
     * 侧边栏在左侧
     */
    siderOnLeft: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示侧边栏隐藏按钮
     */
    showSiderTrigger: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    collapsed: false,
    siderWidthClass: '',
    triggerIcon: 'left'
  }),
  computed: {
    siderClassName() {
      return this.siderClass ? ` ${this.siderClass}` : ''
    }
  },
  methods: {
    onTrigger() {
      const isTriggerHide = this.$refs.containerSider?.classList.contains('hide')

      if (isTriggerHide) {
        this.siderWidthClass = ''
        this.triggerIcon = 'left'
      } else {
        this.siderWidthClass = ' hide'
        this.triggerIcon = 'right'
      }

      // 设置 200ms 的延迟是因为 css 动画的持续时间设置为如下：
      // transition: width 0.2s ease;
      setTimeout(() => {
        this.$emit('sidebarSwitch', isTriggerHide)
      }, 200)
    }
  },
  render() {
    return (
      <div class="tg-container-with-sider">
        <div class={`tg-container-with-sider--main${this.contentClass ? ` ${this.contentClass}` : ''}`}>
          {this.$slots.default}
        </div>
        <div
          ref={'containerSider'}
          style={{ order: this.siderOnLeft ? -1 : 1 }}
          class={`tg-container-with-sider--sider${this.siderClassName}${this.siderWidthClass}`}
        >
          {this.$slots.sider}
          {
            this.showSiderTrigger
              ? (
                <Button
                  class={'tg-container-trigger'}
                  icon={this.triggerIcon}
                  type={'link'}
                  onClick={this.onTrigger}
                />
              )
              : null
          }
        </div>
      </div>
    )
  }
}
