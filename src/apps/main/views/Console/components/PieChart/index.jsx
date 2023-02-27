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
      dataSource: [],
      option: {
        color: ['#2ed3b7', '#8098f9', '#fd6f8e', '#fdb022', '#53b1fd'],
        legend: {
          show: true,
          orient: 'vertical',
          top: 'center',
          bottom: 'center',
          icon: 'circle',
          right: 20,
          //格式化每一项内容
          formatter: name => {
            const data = this.dataSource.find(item => item.name === name)
            const proportion = (data.value / this.total * 100 || 0).toFixed(2)

            return `{name|${data.name}}：${data.value}人 {value|${`(${proportion}%)`}}`
          },
          //使用富文本去定义样式
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                color: 'rgba(52,64,84,0.80)'
              },
              value: {
                fontSize: 12,
                color: '#16b364'
              }
            }
          }
        },
        tooltip: { trigger: 'item' },
        series: [
          {
            name: '',
            type: 'pie',
            data: [],
            radius: ['60%', '80%'],
            center: ['30%', '50%'],
            hoverAnimation: true,
            labelLine: { show: false },
            label: { show: false },
            silent: false,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 2
            }
          },
          {
            name: '',
            type: 'pie',
            data: [],
            radius: ['39.7%', '59.7%'],
            center: ['30%', '50%'],
            hoverAnimation: false,
            labelLine: { show: false },
            label: { show: false },
            silent: true,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 2,
              opacity: .2
            }
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
      const data = []

      this.total = 0

      value.forEach(item => {
        data.push({
          name: item.conclusionLevelName,
          value: item.totalNum
        })

        this.total += item.totalNum
      })

      this.dataSource = data
      this.option.series[0].data = data
      this.option.series[1].data = data
    }
  },
  methods: {},
  render() {
    return (
      <Chart
        option={this.option}
        notMerge={true}
      />
    )
  }
}
