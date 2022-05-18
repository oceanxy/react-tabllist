/**
 * 需要账号密码的登录组件
 */

import ULLoginForm from '@/views/Login/components/ULLoginForm'
import './assets/styles/index.scss'
import { Tabs } from 'ant-design-vue'
import ULLoginTabPane from '@/views/Login/components/ULLoginTabPane'
import config from '@/config'

export default {
  name: 'Login',
  data: () => ({
    activeKey: 1
  }),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    }
  },
  render() {
    return (
      <div class="uni-log-login">
        <div class="login-logo">
          <span>{config.systemName}</span>
        </div>
        <div class="login-center">
          {/* 左侧动画 */}
          <div class="login-animate">
            <div
              ref="loginCanvas"
              class="login-canvas"
            />
          </div>
          {/* 右侧登录框 */}
          <div class="login-box">
            <Tabs
              activeKey={this.activeKey}
              size="large"
              onTabClick={this.handleTabClick}
            >
              <ULLoginTabPane
                name="普通登录"
                tabKey={1}
                icon="user"
              >
                <ULLoginForm />
              </ULLoginTabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
