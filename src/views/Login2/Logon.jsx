/**
 * 企业注册
 */

import TGContainer from '@/components/TGContainer'
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
          <TGContainer
            modalTitle="企业入驻条件"
            width="390px"
            showMore={true}
            contentClass="logon-sider-conditions"
          />
          <TGContainer
            modalTitle="常见问题"
            width="390px"
            showMore={true}
            contentClass="logon-sider-qa"
          />
        </div>
      </div>
    )
  }
}
