import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/components/TGContainer'

export default {
  name: 'PreRegistrationStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'tg-edph-home'}>
        <TGContainer
          class="tg-edph-home-concern"
          modalTitle="我的关注"
          showBoxShadow={false}
          titleClass="not-login-title"
          contentClass="shortcut-container"
        >
        </TGContainer>
        <TGContainer
          class="tg-edph-home-userinfo"
          width="40%"
          modalTitle="我的消息"
          showBoxShadow={false}
          showMore
          titleClass="not-login-title"
          onmore={this.onMore}
        >
        </TGContainer>
        <TGContainer
          class="tg-edph-home-frequently-used-functions"
          width="100%"
          modalTitle="常用功能"
          showBoxShadow={false}
          showMore
          titleClass="not-login-title"
          onmore={this.onMore}
        >
        </TGContainer>
        <TGContainer
          class="tg-edph-home-to-do"
          width="49%"
          modalTitle="待办事项"
          showBoxShadow={false}
          showMore
          titleClass="not-login-title"
          onmore={this.onMore}
        >
        </TGContainer>
        <TGContainer
          class="my-news-container"
          width="50%"
          modalTitle="审阅消息"
          showBoxShadow={false}
          showMore
          titleClass="not-login-title"
          onmore={this.onMore}
        >
        </TGContainer>
      </div>
    )
  }
}
