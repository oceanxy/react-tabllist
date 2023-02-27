/**
 * 登录/注册引导组件
 */

import '../assets/styles/index.scss'
import BNContainer from '@/components/TGModule'
import { Button, Tag } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('login')

export default {
  name: 'Login',
  data: () => ({activeKey: 1}),
  computed: {...mapState(['userInfo'])},
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    },
    onLogin() {
      this.$router.push({ name: 'login' })
    },
    onLogon() {
      this.$router.push({ name: 'logon' })
    },
    toEnterpriseCenter() {
      this.$router.push({ name: 'home' })
    }
  },
  render() {
    return (
      <BNContainer
        modalTitle={
          <div class="corporate-services-title">
            企业服务
            <Button type="primary" class="custom-button" onClick={this.toEnterpriseCenter}>
              进入企业中心
            </Button>
          </div>
        }
        width={390}
        showTitleShape={false}
      >
        <div class="corporate-services">{this.userInfo.fullName}</div>
        <div class="corporate-services-tags">
          {/* <Tag color="blue">已入驻</Tag> */}
          {this.userInfo.isContract === 1 ? <Tag color="cyan">已签约</Tag> : null}
          {this.userInfo.isOwe === 1 ? <Tag color="red">已欠费</Tag> : null}
        </div>
      </BNContainer>
    )
  }
}
