import './index.scss'
import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return ({
      option: {
        color: ['#717bbc'],
        tooltip: { trigger: 'item' },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            data: [],
            barWidth: 16
          }
        ]
      }
    })
  },
  computed: {
    dataForRendering() {
      if (this.type === 1) {
        return this.$store.state[this.moduleName].list.bmiData ?? []
      }

      return this.$store.state[this.moduleName].list.visionData ?? []
    }
  },
  watch: {
    dataForRendering(value) {
      const xAxis = []
      const data = []

      value.forEach(item => {
        xAxis.push(item.conclusionLevelName)
        data.push(item.totalNum)
      })

      this.option.xAxis.data = xAxis
      this.option.series[0].data = data
    }
  },
  render() {
    return (
      <Chart
        option={this.option}
        notMerge={true}
      />
    )
  }
}
