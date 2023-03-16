import './index.scss'
import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        tooltip: { trigger: 'item' },
        series:
        {
          name: '',
          type: 'pie',
          data: [],
          radius: ['48%', '78%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: true }
        }

      }
    })
  },
  computed: {
    ringChat() {
      return this.$store.state[this.moduleName].threeChatList?.ringChat ?? []
    }
  },
  watch: {
    ringChat(value) {
      const data = []

      this.total = 0

      value.rowList.forEach(item => {
        data.push({
          name: item.name,
          value: item.value
        })

        this.total += item.value
      })

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
