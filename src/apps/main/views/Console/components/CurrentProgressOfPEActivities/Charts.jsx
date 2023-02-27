import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#344054',
              position: 'center',
              formatter: [
                '{a|{b}}',
                '{b|整体完成率}',
                '{c|}'
              ].join('\n'),
              rich: {
                a: {
                  color: '#344054',
                  fontWeight: 'bold',
                  fontSize: 24
                },
                b: {
                  color: '#344054',
                  fontWeight: 'bold',
                  fontSize: 16,
                  lineHeight: 40
                },
                c: {
                  color: 'transparent',
                  lineHeight: 50
                }
              }
            },
            center: ['50%', '100%'],
            radius: ['150%', '190%'],
            startAngle: 180,
            // 初始化样式
            data: [
              {
                name: '0%',
                value: 0,
                itemStyle: { color: '#d3f8df' }
              },
              {
                value: 0,
                itemStyle: { color: 'transparent' }
              }
            ]
          }
        ]
      }
    })
  },
  computed: {
    dataSource() {
      return this.$store.state[this.moduleName].list.endDataVO
    },
    totalEndPercent() {
      return this.dataSource.totalEndPercent || '0%'
    },
    endStudentNum() {
      return this.dataSource.endStudentNum || 0
    }
  },
  watch: {
    dataSource() {
      const ratio = +this.totalEndPercent.replace('%', '') / 100
      const total = this.endStudentNum / ratio

      this.option.series[0].data = [
        {
          name: this.totalEndPercent,
          value: total ? this.endStudentNum : 0,
          itemStyle: { color: '#16b364' }
        },
        {
          name: this.totalEndPercent,
          value: total ? total - this.endStudentNum : 1,
          emphasis: { disabled: true },
          itemStyle: { color: '#d3f8df' }
        },
        {
          name: this.totalEndPercent,
          value: total || 1,
          itemStyle: { color: 'transparent' }
        }
      ]
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
