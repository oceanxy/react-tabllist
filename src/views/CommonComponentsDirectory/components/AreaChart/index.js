import './index.scss'
import Chart from '@/components/Chart'
import { Spin } from 'ant-design-vue'

export default {
  data() {
    return {
      loading: false,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          top: 15,
          textStyle: {
            color: '#ffffff'
          },
          data: ['L1', 'L2']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '20%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [1, 2, 3, 4, 5, 6, 7],
          axisLabel: {
            rotate: 20,
            interval: 0,
            margin: 20,
            align: 'center'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.4)'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.4)'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#ffffff',
              opacity: 0.1,
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'L1',
            type: 'line',
            areaStyle: {//区域填充渐变颜色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(135, 116, 200, 1)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(135, 116, 200, 0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: 'rgba(135, 116, 200, 1)'
            },
            data: [2, 3, 2, 6, 4, 1, 2]
          },
          {
            name: 'L2',
            type: 'line',
            areaStyle: {//区域填充渐变颜色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(35, 236, 200, 1)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(35, 236, 200, 0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: 'rgba(35, 236, 200, 1)'
            },
            data: [2, 7, 3, 1, 4, 2, 5]
          }
        ]
      }
    }
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class="tg-cadre-visit-situation">
          <Chart
            option={this.option}
            notMerge={true}
          />
        </div>
      </Spin>
    )
  }
}
