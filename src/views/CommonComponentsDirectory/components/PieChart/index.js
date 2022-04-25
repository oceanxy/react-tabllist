import Chart from '@/components/Chart'
import './index.scss'

export default {
  data() {
    return {
      loading: false,
      option: {
        color: ['#3696fe', '#fb8f7a', '#a12bff'],
        title: {
          text: '人口\n性别分布',
          textStyle: {
            fontSize: 12,
            color: '#ffffff',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '48%',
          y: '49%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center',
          textStyle: {
            color: '#ffffff',
            fontSize: '12px'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['center', '60%'],
            // itemStyle: {
            //   borderRadius: 10
            // },
            label: {
              show: true,
              position: 'inner',
              color: '#ffffff',
              fontFamily: 'Source Han Sans CN',
              textShadowColor: '#082842',
              textShadowBlur: 4,
              lineHeight: 16,
              formatter: '{b}\n{d}%'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                name: '男',
                value: 19
              },
              {
                name: '女',
                value: 19
              },
              {
                name: '未知',
                value: 19
              }
            ]
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
