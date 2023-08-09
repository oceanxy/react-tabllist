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
            : <div class="tg-container-content">{this.filterSlots()}</div>
        }
      </div>
    )
  }
}
