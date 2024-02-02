import './assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import config from '@/config'

export default {
  name: 'TGContainerWithSider',
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
     * 是否显示侧边栏隐藏按钮。
     * 当不显示该按钮时，可以通过 store.state.common.treeCollapsed 自定义展开/折叠逻辑。
     */
    showSiderTrigger: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    treeCollapsed: {
      get() {
        return this.$store.state['common'].treeCollapsed
      },
      async set(value) {
        this.$store.commit('setState', {
          value,
          moduleName: 'common',
          stateName: 'treeCollapsed'
        })
      }
    },
    siderClassName() {
      return this.siderClass ? ` ${this.siderClass}` : ''
    }
  },
  watch: {
    treeCollapsed() {
      // 设置 200ms 的延迟是因为 css 动画的持续时间设置为如下：
      // transition: width .2s ease;
      setTimeout(() => {
        this.$emit('sidebarSwitch')
      }, 200)
    }
  },
  methods: {
    onTrigger() {
      this.treeCollapsed = !this.treeCollapsed
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
          class={`tg-container-with-sider--sider${this.siderClassName}${!this.treeCollapsed ? '' : ' hide'}`}
        >
          {this.$slots.sider}
          {/* {this.showSiderTrigger ? (
            <Button
              class={'tg-container-trigger'}
              icon={!this.treeCollapsed ? 'left' : 'right'}
              type={'link'}
              onClick={this.onTrigger}
            />
          ) : null} */}
        </div>
        {config.siderLayout === 1 ? (
          <Button
            class={`tg-container-trigger-new ${this.treeCollapsed ? 'tg-container-trigger-new-collapse' : ''}`}
            icon={!this.treeCollapsed ? 'left' : 'right'}
            type={'link'}
            onClick={this.onTrigger}
          />
        ) : null}
      </div>
    )
  }
}
