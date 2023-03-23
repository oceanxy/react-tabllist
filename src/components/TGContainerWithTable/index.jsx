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
    // 导入侧边树的 props，通过本组件转发
    ...TGContainerWithTreeSider.props
  },
  computed: {
    treeProps() {
      const { showTree, ...rest } = this.$props

      return rest
    }
  },
  methods: {
    filterSlots() {
      return [
        this.$slots.inquiry || this.$slots.others,
        this.$slots.chart
          ? (
            <div class={`tg-container-chart-container${this.$slots.table ? '' : ' no-table'}`}>
              {this.$slots.chart}
            </div>
          )
          : null,
        this.$slots.table
          ? (
            <div class={'tg-container-table-container'}>
              {this.$slots.table}
              {this.$slots.pagination}
              {this.$slots.default}
            </div>
          )
          : null
      ]
    }
  },
  render() {
    return (
      <div class="tg-container">
        {
          this.$slots.functions
            ? (
              <div class={'tg-content-title'}>
                <Space class={'title'}>
                  <IconFont type={this.$route.meta.icon} />
                  {this.$route.meta.title}
                </Space>
                {this.$slots.functions}
              </div>
            )
            : null
        }
        {
          this.showTree
            ? (
              <TGContainerWithTreeSider props={{ ...this.treeProps }}>
                {this.filterSlots()}
              </TGContainerWithTreeSider>
            )
            : (
              <div class="tg-container-content">
                {this.filterSlots()}
              </div>
            )
        }
        <div class="tg-container-modals">{this.$slots.modals}</div>
      </div>
    )
  }
}
