import ULLoginForm from '@/views/Login/components/ULLoginForm'
import './assets/styles/index.scss'
import { Tabs } from 'ant-design-vue'
import ULLoginTabPane from '@/views/Login/components/ULLoginTabPane'
import particleAnimation from './mixins/particle-animation'

export default {
  name: 'Login',
  data: () => ({
    activeKey: 1
  }),
  mixins: [particleAnimation],
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    }
  },
  render() {
    return (
      <div class="uni-log-login">
        <div class="login-logo">
          <span>统一日志</span>
        </div>
        <div class="login-center">
          {/* 左侧动画 */}
          <div class="login-animate">
            <div ref="loginCanvas" class="login-canvas" />
          </div>
          {/* 右侧登录框 */}
          <div class="login-box">
            <Tabs
              activeKey={this.activeKey}
              size="large"
              onTabClick={this.handleTabClick}
            >
              <ULLoginTabPane name="普通登录" tabKey={1} icon="user">
                <ULLoginForm />
              </ULLoginTabPane>
              <ULLoginTabPane name="手机号码登录" tabKey={2} icon="phone">
                1
              </ULLoginTabPane>
              <ULLoginTabPane name="验证码登录" tabKey={3} icon="code">
                2
              </ULLoginTabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
