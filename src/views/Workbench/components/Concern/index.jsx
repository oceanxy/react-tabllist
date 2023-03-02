import TGContainer from '@/components/TGContainer'
import { Card } from 'ant-design-vue'

export default {
  render() {
    return (
      <TGContainer
        modalTitle={
          <div class={'container-title'}>
            <IconFont type={'icon-home-wdgz-fill'} />
            我的关注
          </div>
        }
        showMore
        rightIcon={<IconFont title={'设置'} type={'icon-home-pz-fill'} />}
        showBoxShadow={false}
        contentClass="concern-cards"
      >
        <Card>
          <p>土地资产总量</p>
          <p><span>1280</span> 处</p>
        </Card>
        <Card>
          <p>房屋资产总量</p>
          <p><span>1280</span>处</p>
        </Card>
        <Card>
          <p>空置房屋</p>
          <p><span>1280</span> 处</p>
        </Card>
        <Card>
          <p>租金欠收</p>
          <p><span>1280</span> 元</p>
        </Card>
        <Card>
          <p>合同逾期</p>
          <p><span>1280</span> 份</p>
        </Card>
        <Card>
          <p>当前隐患</p>
          <p><span>1280</span> 处</p>
        </Card>
        <Card>
          <p>本月巡查</p>
          <p><span>1280</span> 次</p>
        </Card>
      </TGContainer>
    )
  }
}
