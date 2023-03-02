import TGContainer from '@/components/TGContainer'
import { Avatar, Card } from 'ant-design-vue'

export default {
  computed: {
    userInfo() {
      return this.$store.state['login'].userInfo
    },
    avatarForLetter() {
      const name = this.userInfo.nickName || this.userInfo.fullName

      return name ? name.at(-1).toUpperCase() : ''
    }
  },
  render() {
    return (
      <TGContainer showBoxShadow={false} contentClass={'userinfo-container'}>
        <Card class={'userinfo-card'}>
          <Card.Meta
            title={'陈思睿，祝您工作愉快，开心快乐每一天！'}
            description={
              <div>总公司/资产管理部/资管负责人</div>
            }
          >
            <Avatar
              size={56}
              slot="avatar"
            >
              {this.avatarForLetter}
            </Avatar>
          </Card.Meta>
          <p class={'number-of-logins'}>
            <p>本月累积登录</p>
            <span>25</span> 次
          </p>
        </Card>
        <p class={'logon-time'}>上次登录时间：2022-12-18 17:50:22</p>
      </TGContainer>
    )
  }
}
