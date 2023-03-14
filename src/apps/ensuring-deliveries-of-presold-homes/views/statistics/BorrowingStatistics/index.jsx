import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import { Space } from 'ant-design-vue'
import Month from './components/Month/index'
import TypeStatistics from './components/TypeStatistics/index'

export default {
  name: 'BorrowingStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'count-page-body'}>
        <Space direction="vertical" size={15}>
          <TypeStatistics />
          <Month />
        </Space>
      </div>
    )
  }
}
