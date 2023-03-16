import './index.scss'
import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#68bbc4', '#ee752f', '#5087ec', '#56ad5a', '#f2bd42'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:
        {
          type: 'category',
          data: [],
          axisTick: { alignWithLabel: true }
        },
        yAxis: { type: 'value' },
        series:
        {
          name: '',
          barWidth: '10%',
          type: 'bar',
          data: []
        }

      }
    })
  },
  computed: {
    columnarChatList() {
      return this.$store.state[this.moduleName].columnarChatList.list ?? []
    }
  },
  watch: {
    columnarChatList(value) {
      const xAxis = []
      const data = []

      value?.forEach(item => {
        xAxis.push(item.xdata)
        data.push(item.ydata)
      })
      this.option.xAxis.data = xAxis
      this.option.series.data = data
    }
  },
  render() {
    return (
      <Chart
        class={'bar-chart'}
        option={this.option}
        notMerge={true}
      />
    )
  }
}
