import './index.scss'
import { Select } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  computed: {
    othersType: {
      get() {
        return this.$store.state[this.moduleName].othersType
      },
      set(value) {
        this.$store.commit('setState', {
          value,
          moduleName: this.moduleName,
          stateName: 'othersType'
        })
      }
    }
  },
  render() {
    return (
      <Select
        vModel={this.othersType}
        class={'pe-others-selector'}
        dropdownMatchSelectWidth={false}
      >
        <Select.Option value={1}>龋齿患病率</Select.Option>
        <Select.Option value={2}>沙眼患病率</Select.Option>
        <Select.Option value={3}>高血压</Select.Option>
        <Select.Option value={4}>肺活量合格率</Select.Option>
      </Select>
    )
  }
}
