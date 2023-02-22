import './index.scss'
import * as echarts from 'echarts'
// 引入监听dom变化的组件
import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  props: {
    option: {
      type: Object,
      required: true
    },
    notMerge: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    $_chartHeight: '',
    $_chartInstance: '',
    $_elementResizeDetector: ''
  }),
  watch: {
    option: {
      handler(value) {
        if (this.notMerge) {
          this.$_chartInstance?.clear()
        }

        this.$_chartInstance?.setOption(value, this.notMerge)
      },
      deep: true
    }
  },
  mounted() {
    this.$_elementResizeDetector = elementResizeDetectorMaker()
    this.$_elementResizeDetector.listenTo(this.$refs.chart, this.listener)

    this.initChart()
  },
  methods: {
    initChart() {
      this.$_chartInstance = echarts.init(this.$refs.chart)
      this.$_chartInstance.setOption(this.option || {})
    },
    listener() {
      this.$nextTick(() => {
        this.$_chartInstance.resize({ animation: { duration: 300 } })
      })
    }
  },
  destroyed() {
    // this.$_elementResizeDetector?.removeListener(this.$refs.chart, this.listener)
  },
  render() {
    return (
      <div ref="chartContainer" class="tg-chart-container">
        <div ref="chart" class="chart-container" />
      </div>
    )
  }
}
