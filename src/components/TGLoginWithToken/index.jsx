/**
 * 通过第三方token登录
 */

import { message } from 'ant-design-vue'
import { getCookie } from '@/utils/cookie'

export default {
  data() {
    return { token: '' }
  },
  created() {
    const searchToken = new URL(window.location.href).searchParams.get('token')

    this.token = searchToken ||
      this.$route.query.token ||
      getCookie('token') ||
      localStorage.getItem('token')

    // 如果 search 中存在 token，则删除之
    if (searchToken) {
      window.history.replaceState(null, null, window.location.pathname)
    }

    // 如果 hash 中存在 token，则删除之
    if (this.$route.query.token) {
      delete this.$route.query.token
    }
  },
  async mounted() {
    if (this.token) {
      const response = await this.$store.dispatch('login/getUserInfo', { token: this.token })

      if (!response) {
        message.error('获取用户信息失败', 0)

        await this.$store.dispatch('login/clear')
        this.$emit('errorStateChange', { status: true, error: new Error('获取用户信息失败') })
      } else {
        await this.$store.dispatch('login/jump')
        this.$emit('errorStateChange', { status: false, error: null })
      }
    } else {
      message.error('获取权限失败', 0)
      this.$emit('errorStateChange', { status: true, error: new Error('请检查TOKEN是否有效') })
    }
  },
  render() {
    return null
  }
}
