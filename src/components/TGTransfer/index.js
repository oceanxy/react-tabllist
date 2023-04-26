import './index.scss'
import { Transfer } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      targetKeys: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.targetKeys = value
      }
    }
  },
  methods: {
    renderItem(item) {
      const customLabel = (
        <div class="tg-transfer-custom-item">
          {item.title} - {item.mobile} <span class={'tg-transfer-right'}>{item._status}</span>
        </div>
      )

      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      }
    },
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
      this.$emit('change', nextTargetKeys)
    }
  },
  render() {
    return (
      <div class={'tg-transfer'}>
        <Transfer
          showSearch
          titles={this.titles}
          listStyle={{ width: '300px', height: '60vh', minHeight: '300px' }}
          targetKeys={this.targetKeys}
          dataSource={this.dataSource}
          render={this.renderItem}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
