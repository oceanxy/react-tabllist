/**
 * 登录/注册引导组件
 */

import '../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainer from '@/components/TGModule'

export default {
  name: 'Login',
  data: () => ({activeKey: 1}),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    },
    onLogin() {
      this.$router.push({ name: 'login' })
    },
    onLogon() {
      this.$router.push({ name: 'logon' })
    }
  },
  render() {
    return (
      <BNContainer
        class="pre-login-container"
        modalTitle="企业服务"
        contentClass="flex"
        width={390}
        showTitleShape={false}>
        <Button class="button btn-login" onClick={this.onLogin}>
          签约企业登录
        </Button>
        {/* <Button
          class="button btn-logon"
          onClick={this.onLogon}
        >
          企业申请入驻
        </Button> */}
      </BNContainer>
    )
  }
}
