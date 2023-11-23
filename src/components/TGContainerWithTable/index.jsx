import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { Space } from 'ant-design-vue'

export default {
  props: {
    // 是否显示侧边树
    showTree: {
      type: Boolean,
      default: false
    },
    // 是否显示页面标题
    showPageTitle: {
      type: Boolean,
      default: true
    }
  },
  provide: {
    // 提供给所有子级或插槽，以判断本页面是否存在列表组件
    isTableExist() {
      return !!this.$slots.table
    }
  },
  methods: {
    filterSlots() {
      return [
        this.$slots.inquiry || this.$slots.others,
        this.$slots.chart,
        // customContent 和 table 结构只能二选一，如果二者都存在，customContent 优先
        this.$slots.customContent
          ? (
            <div class={'tg-container-custom-content-container'}>
              <div class={'tg-container-custom-content'}>
                {this.$slots.customContent}
              </div>
              {
                this.$slots.bottomFunctions
                  ? (
                    <div class={'tg-container-bottom-functions'}>
                      {this.$slots.bottomFunctions}
                    </div>
                  )
                  : null
              }
            </div>
          )
          : this.$slots.table
            ? (
              <div class={'tg-container-table-container'}>
                {this.$slots.table}
                {this.$slots.pagination}
                {this.$slots.default}
              </div>
            )
            : null,
        <div class="tg-container-modals">{this.$slots.modals}</div>
      ]
    }
  },
  render() {
    return (
      <div class="tg-container">
        <div class={'tg-content-title'}>
          {
            this.showPageTitle
              ? (
                <Space class={'tg-content-title-space'}>
                  {
                    this.$route.meta.icon
                      ? <IconFont type={this.$route.meta.icon} />
                      : null
                  }
                  {this.$route.meta.title}
                </Space>
              )
              : null
          }
          <div class={'tg-content-function'}>
            {
              this.$slots.functions
                ? this.$slots.functions
                : null
            }
          </div>
        </div>
        {
          this.showTree
            ? (
              <TGContainerWithTreeSider props={{ ...this.$attrs }}>
                {this.filterSlots()}
              </TGContainerWithTreeSider>
            )
            : (
              <div class="tg-container-content">
                {this.filterSlots()}
              </div>
            )
        }
      </div>
    )
  }
}
