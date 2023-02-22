/**
 * 需要账号密码的登录组件
 */

import './assets/styles/index.scss'
import ULLoginForm from '@/views/manager/Login/components/TGLoginForm'
import BNContainer from '@/components/TGModule'
import config from '@/config'

export default {
  name: 'Login',
  props: {
    isShowSiteName: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({ activeKey: 1 }),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    }
  },
  render() {
    return (
      <div class={'tg-login'}>
        <div class={'title'}>{config.systemName}</div>
        <BNContainer
          width={400}
          class={'tg-login-box'}
          contentClass={'login-box-content'}
          showTitleShape={false}
        >
          <div class={'login-logo'} />
          <div class={'login-subtitle'}>您好，欢迎登录</div>
          <ULLoginForm />
        </BNContainer>
        <div class={'corporate-services'}>蓝桥科技有限公司技术支持</div>
      </div>
    )
  }
}
