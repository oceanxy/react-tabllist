import '../../assets/styles/index.scss'
import { Card, Col, Row, Spin } from 'ant-design-vue'
import PieEnterpriseChart from '../PieEnterpriseChart/index'
import PieRingChat from '../PieRingChat/index'
import PieColumnarChat from '../PieColumnarChat/index'
import Inquiry from './Inquiry'

export default {
  inject: ['moduleName'],
  computed: {
    threeChatList() {
      return this.$store.state[this.moduleName].threeChatList ?? null
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'threeChatList',
      customApiName: 'getThreeChatList',
      payload: { startDate: '', endDate: '' }
    })
  },
  render() {
    return (
      <Spin spinning={this.threeChatList.loading}>
        <Card>
          <Inquiry />
          <div class={'total-sum'}>
            <label>{this.threeChatList.typeDesc}：</label>
            <strong>{this.threeChatList.total}</strong>
          </div>
          <Row>
            <Col span={8} >
              <PieEnterpriseChart />
            </Col>
            <Col span={8}>
              <PieRingChat />
            </Col>
            <Col span={8}>
              <PieColumnarChat />
            </Col>
          </Row>

        </Card>
      </Spin>
    )
  }
}
