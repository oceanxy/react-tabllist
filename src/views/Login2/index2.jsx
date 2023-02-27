/**
 * 获取第三方token登录的登录组件
 */

import './assets/styles/index.scss'
import { Spin } from 'ant-design-vue'

export default {
  name: 'Login',
  data() {
    return {token: ''}
  },
  created() {
    this.token = this.$route.query.token || localStorage.getItem('token')

    if (process.env.NODE_ENV === 'development' && !this.token) {
      // 开发模式下可直接向后端索取一个用于调试的token
      this.token = '37c04218fb7f4867ac3f82545b4ca50d'
    }
  },
  mounted() {
    if (this.token) {
      localStorage.setItem('token', this.token)

      this.$router.replace({ name: 'home' })
    }
  },
  render() {
    const tip = this.token ? '正在初始化，请稍候...' : '登录验证失败，请返回主系统重试！'

    return (
      <div class="login-third-part">
        <Spin tip={tip} size="large" spinning={!!this.token} />
      </div>
    )
  }
}
