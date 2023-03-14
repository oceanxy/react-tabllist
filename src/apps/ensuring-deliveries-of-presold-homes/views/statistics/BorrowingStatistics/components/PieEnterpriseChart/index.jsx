import './index.scss'
import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#5087ec', '#68bbc4', '#56ad5a', '#f2bd42', '#ee752f'],
        tooltip: { trigger: 'item' },
        series:
        {
          name: '',
          type: 'pie',
          data: [],
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 2
          }
        }

      }
    })
  },
  computed: {
    cycleChat() {
      return this.$store.state[this.moduleName].threeChatList?.cycleChat ?? []
    }
  },
  watch: {
    cycleChat(value) {
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
