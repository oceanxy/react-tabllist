import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Summary from './components/Summary'
import Overview from './components/Overview'
import Others from './components/Others'
import { Spin } from 'ant-design-vue'
import BNContainer from '@/components/TGModule'
import Charts from './components/CurrentProgressOfPEActivities/Charts'
import Inquiry from './components/Inquiry'
import QuantityCompleted from './components/QuantityCompleted'
import OverviewOfCompletion from './components/OverviewOfCompletion'

export default {
  name: 'Console',
  mixins: [dynamicState()],
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    }
  },
  render() {
    return (
      <TGContainerWithSider class={'pe-console'} siderClass={'pe-console-sider-container'}>
        <div slot="default" class={'pe-console-main'}>
          <Inquiry />
          <Spin class={'pe-console-statistics'} spinning={this.loading}>
            <Summary />
            <Overview type={1} />
            <Overview type={2} />
            <Others />
          </Spin>
        </div>
        <div slot="sider" class={'pe-console-sider'}>
          <BNContainer
            modalTitle={'当前活动体检进度'}
            showTitleLine
            width={'100%'}
            class={'pe-console-completion-concept'}
          >
            <Charts />
            <QuantityCompleted />
          </BNContainer>
          <BNContainer
            modalTitle={'完成情况概览'}
            showTitleLine
            class={'pe-console-vision-ranking'}
            width={'100%'}
          >
            <OverviewOfCompletion />
          </BNContainer>
        </div>
      </TGContainerWithSider>
    )
  }
}
