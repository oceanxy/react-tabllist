/**
 * 企业注册
 */

import BNContainer from '@/components/TGModule'
import LogonForm from './components/LogonForm'
import './assets/styles/index.scss'

export default {
  name: 'Logon',
  render() {
    return (
      <div class="logon-box">
        <div class="logon-form">
          <LogonForm></LogonForm>
        </div>
        <div class="logon-sider">
          <BNContainer
            modalTitle="企业入驻条件"
            width="390px"
            showMore={true}
            contentClass="logon-sider-conditions"></BNContainer>
          <BNContainer modalTitle="常见问题" width="390px" showMore={true} contentClass="logon-sider-qa"></BNContainer>
        </div>
      </div>
    )
  }
}
