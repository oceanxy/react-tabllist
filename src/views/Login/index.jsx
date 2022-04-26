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

// import './assets/styles/index.scss'
// import { Spin } from 'ant-design-vue'
//
// export default {
//   name: 'Login',
//   data() {
//     return {
//       token: ''
//     }
//   },
//   created() {
//     this.token = this.$route.query.token || sessionStorage.getItem('token')
//
//     if (process.env.NODE_ENV === 'development' && !this.token) {
//       // 开发模式下可直接向后端索取一个用于调试的token
//       this.token = '37c04218fb7f4867ac3f82545b4ca50d'
//     }
//   },
//   mounted() {
//     if (this.token) {
//       sessionStorage.setItem('token', this.token)
//
//       this.$router.replace({ name: 'home' })
//     }
//   },
//   render() {
//     const tip = this.token ? '正在初始化，请稍后...' : '登录验证失败，请返回主系统重试！'
//
//     return (
//       <div class="tg-login">
//         <Spin tip={tip} size="large" spinning={!!this.token} />
//       </div>
//     )
//   }
// }
