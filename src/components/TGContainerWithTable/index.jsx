import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { Space } from 'ant-design-vue'

export default {
  props: {
    // 是否显示侧边树
    showTree: {
      type: Boolean,
      default: false
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
          : null,
        <div class="tg-container-modals">{this.$slots.modals}</div>
      ]
    }
  },
  render() {
    return (
      <div class="tg-container">
        <div class={'tg-content-title'}>
          <Space class={'title'}>
            <IconFont type={this.$route.meta.icon} />
            {this.$route.meta.title}
          </Space>
          {
            this.$slots.functions
              ? this.$slots.functions
              : null
          }
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
