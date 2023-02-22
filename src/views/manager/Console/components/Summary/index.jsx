import './assets/styles/index.scss'
import { Card } from 'ant-design-vue'
import ScrollingNumber from '@/components/ScrollingNumber'

export default {
  inject: ['moduleName'],
  computed: {
    schoolNumVO() {
      return this.$store.state[this.moduleName].list?.schoolNumVO ?? {}
    }
  },
  render() {
    return (
      <div class={'pe-summary-container'}>
        <Card class={'school-summary-card'}>
          <ScrollingNumber
            value={this.schoolNumVO.schoolNum}
            text={'学校数'}
          />
        </Card>
        <Card class={'student-summary-card'}>
          <ScrollingNumber
            value={this.schoolNumVO.studentNum}
            text={'学生数'}
          />
        </Card>
        <Card class={'pe-item-summary-card'}>
          <ScrollingNumber
            value={this.schoolNumVO.itemNum}
            text={'已开通体检项目'}
          />
        </Card>
      </div>
    )
  }
}
