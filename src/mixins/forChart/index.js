import './assets/styles/index.scss'
import Chart from '@/components/Chart'
import { Button, Icon } from 'ant-design-vue'

/**
 * 折叠图表混合，为图表增加折叠功能。一般作为全局组件 TGContainerWithTable 的插槽使用。
 * @example
 * // 使用 TGContainerWithTable 组件的文件
 * import CustomChart from 'CustomChart.jsx'
 *
 * <TGContainerWithTable>
 *   <CustomChart slot='chart' /> // CustomChart 组件中使用了本混合
 * </TGContainerWithTable>
 *
 * // CustomChart.jsx
 * import forChart from '@/mixins/forChart'
 *
 * export default {
 *   mixins: [forChart()],
 *   computed: {
 *     option() {
 *       return {
 *         // echarts options
 *       }
 *     }
 *   }
 *   // other code
 * }
 * @returns {JSX.Element|{isCollapsed: boolean, title: undefined}|{data(): {isCollapsed: boolean, title: *}, methods: {onFold(): void}, inject: {isTableExist: {default: boolean}, moduleName: {default: undefined}}, render(): *, props: {maxHeight: {default: string, type: StringConstructor}, collapsible: {default: boolean, type: BooleanConstructor}}}}
 */
export default function forChart() {
  return {
    inject: {
      moduleName: { default: undefined },
      // 判断页面中（TGContainerWithTable全局组件）是否存在表格插槽（slot=table），以使用不同的布局样式
      isTableExist: { default: false }
    },
    props: {
      // 是否可折叠（启用时将在图表右上角显示一个折叠按钮）
      collapsible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 图标标题，折叠状态下会显示在模块的左侧
        title: undefined,
        // 折叠状态
        isCollapsed: false
      }
    },
    methods: {
      onFold() {
        this.isCollapsed = !this.isCollapsed
      }
    },
    render() {
      return (
        <div
          class={`tg-container-chart-container${
            this.isTableExist ? '' : ' tg-no-table'
          }${
            this.collapsible ? ' tg-collapsed-chart' : ''
          }${
            this.isCollapsed ? ' collapsed' : ''
          }`}
        >
          {
            this.collapsible
              ? [
                <Button
                  class={`tg-collapse-switch${this.isCollapsed ? ' down' : ''}`}
                  size="small"
                  title={`${this.isCollapsed ? '展开' : '折叠'}图表`}
                  onClick={this.onFold}
                >
                  <Icon type={this.isCollapsed ? 'down' : 'up'} />
                </Button>,
                <div class={`tg-collapsed-chart-title${this.isCollapsed ? ' parent-collapsed' : ''}`}>
                  {this.title}
                </div>
              ]
              : null
          }
          <Chart class={'chart'} option={this.option} />
        </div>
      )
    }
  }
}
