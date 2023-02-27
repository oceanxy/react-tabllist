import './assets/styles/index.scss'
import BNContainer from '@/components/TGModule'
import BarChart from '../BarChart'
import PieChart from '../PieChart'

export default {
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  render() {
    return (
      <BNContainer
        width={'100%'}
        class={'pe-console-overview'}
        contentClass={'pe-console-overview-content'}
        modalTitle={this.type === 1 ? '学生生长发育数据总览' : '视力数据总览'}
      >
        <BarChart type={this.type} />
        <PieChart type={this.type} />
      </BNContainer>
    )
  }
}
