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
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: []
        },
        xAxis:
        {
          type: 'value',
          axisLabel: {
            formatter: function (params) {
              let val = ''

              params = Number(params)

              if (params === 0) {
                val = params + ''
              } else if (params > 1 && params < 10000) {
                val = params + ''
              } else if (params >= 10000 && params < 1000000) {
                val = (params / 10000).toFixed(1) + '万'
              } else if (params >= 1000000 && params < 10000000) {
                val = (params / 1000000).toFixed(1) + '百万'
              } else if (params >= 10000000 && params < 100000000) {
                val = (params / 10000000).toFixed(1) + '千万'
              } else {
                val = (params / 100000000).toFixed(1) + '亿'
              }

              return val
            }
          }
        },
        series:
        {
          name: '',
          barWidth: 10,
          type: 'bar',
          data: []
        }

      }
    })
  },
  computed: {
    columnarChat() {
      return this.$store.state[this.moduleName].threeChatList?.columnarChat ?? []
    }
  },
  watch: {
    columnarChat(value) {
      const yAxis = []
      const data = []

      value.rowList?.forEach(item => {
        yAxis.push(item.name)
        data.push(item.value)
      })

      this.option.yAxis.data = yAxis
      this.option.series.data = data
    }
  },

  methods: {},
  render() {
    return (
      <Chart
        class={'pie-chart'}
        option={this.option}
        notMerge={true}
      />
    )
  }
}
