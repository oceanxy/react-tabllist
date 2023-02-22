/**
 * 需要账号密码的登录组件
 */

import './assets/styles/index.scss'
import { Tabs } from 'ant-design-vue'
import TGLoginForm from '@/views/client/Login/components/TGLoginForm'
import TGTabPane from '@/components/TGTabPane'
import BNContainer from '@/components/TGModule'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('login')

export default {
  name: 'Login',
  props: {
    isShowSiteName: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({ activeKey: 1 }),
  mounted () {
    const { token } = this.$route.query

    if (token) {
      this.bbsLogin(token)
    }
  },
  methods: {
    handleTabClick (key) {
      this.activeKey = key
    },
    async onLogonClick () {
      await this.$router.push({ name: 'logon' })
    },
    ...mapActions(['bbsLogin'])
  },
  render () {
    return (
      <BNContainer width={600} class="login-box" contentClass="login-box-content" showTitleShape={false}>
        <div class="login-subtitle">Welcome Login!</div>
        <Tabs activeKey={this.activeKey} size="large" onTabClick={this.handleTabClick}>
          <TGTabPane name="帐号密码登录" tabKey={1}>
            <TGLoginForm />
          </TGTabPane>
          {/* <TGTabPane name="负责人手机号码登录" tabKey={2}>
            <TGLoginForm />
          </TGTabPane> */}
        </Tabs>
        <div class="login-log-on">
          {/* <Button type="link" onClick={this.onLogonClick}>
            企业还未入驻？点击立即申请
          </Button> */}
        </div>
      </BNContainer>
    )
  }
}
