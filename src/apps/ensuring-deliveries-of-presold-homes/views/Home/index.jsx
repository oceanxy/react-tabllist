import './assets/styles/index.scss'
import BNContainer from '@/components/TGModule'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'home',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithSider class="tg-home">
        <template slot="default">
          保交楼首页
        </template>
        <template slot="sider">
          <BNContainer
            width="100%"
            moduleTitle="我的快捷菜单"
            showBoxShadow={false}
            class="shortcut-menu-container"
            titleClass="not-login-title"
            contentClass="shortcut-container"
          >
          </BNContainer>
          <BNContainer
            class="my-news-container"
            width="100%"
            modalTitle="我的消息"
            showBoxShadow={false}
            showMore
            titleClass="not-login-title"
            onmore={this.onMore}
          >
          </BNContainer>
        </template>
      </TGContainerWithSider>
    )
  }
}
