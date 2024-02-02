import './index.scss'
// 引入监听dom变化的组件
import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  name: 'TGChart',
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
    $_echarts: null,
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
    this.initChart()

    this.$_elementResizeDetector = elementResizeDetectorMaker()
    this.$_elementResizeDetector.listenTo(this.$refs.chart, this.listener)
  },
  methods: {
    initChart() {
      if (!this.$_echarts) {
        // webpack optimization.splitChunks.cacheGroups.echarts 为了优化 echarts 打包大小而使用的定制包。
        // 生产环境需要读取定制的 echarts.min.js 文件，定制地址：https://echarts.apache.org/zh/builder.html，
        // 非生产环境不需要读 echarts.min.js 文件，直接引用 node_modules 下的 echarts。
        this.$_echarts = CUSTOMIZE_PROD_TINY_ECHARTS
      }

      this.$_chartInstance = this.$_echarts.init(this.$refs.chart)
      this.$_chartInstance.setOption(this.option || {})
    },
    listener() {
      this.$nextTick(() => {
        this.$_chartInstance.resize({ animation: { duration: 300 } })
      })
    }
  },
  beforeDestroy() {
    this.$_elementResizeDetector?.removeListener(this.$refs.chart, this.listener)
  },
  render() {
    return (
      <div ref="chartContainer" class="tg-chart-container">
        {this.$slots.default}
        <div ref="chart" class="chart-container" />
      </div>
    )
  }
}
