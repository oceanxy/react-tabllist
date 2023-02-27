import { Card } from 'ant-design-vue'
import ScrollingNumber from '@/components/ScrollingNumber'

export default {
  inject: ['moduleName'],
  computed: {
    dataSource() {
      return this.$store.state[this.moduleName].list.endDataVO
    }
  },
  render() {
    return (
      <Card class={'school-summary-card'}>
        <ScrollingNumber
          value={this.dataSource.endStudentNum || 0}
          text={'已完成学生数'}
        />
      </Card>
    )
  }
}
