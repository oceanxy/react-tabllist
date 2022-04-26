import './index.scss'
import Chart from '@/components/Chart'

export default {
  data() {
    return {
      option: {
        color: ['#48e5e5', '#2b8ef3', '#3cd495', '#bee5fb'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '7%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [1, 2, 3, 4],
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLabel: {
            interval: 0
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255)'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.4)'
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '医疗',
            type: 'bar',
            barWidth: '60%',
            colorBy: 'data',
            label: {
              show: true,
              position: 'top',
              color: '#ffffff',
              fontFamily: 'Source Han Sans CN',
              textShadowColor: '#082842',
              textShadowBlur: 4
            },
            data: [10, 20, 30, 40]
          }
        ]
      }
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
