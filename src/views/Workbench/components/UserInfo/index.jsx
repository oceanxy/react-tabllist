import TGContainer from '@/components/TGContainer'
import { Avatar, Card } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
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
            title={`${this.userInfo.fullName}，祝您工作愉快，开心快乐每一天！`}
            description={
              <div>{[this.userInfo.organName, this.userInfo.roleNames].join(' / ')}</div>
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
            <span>{this.userInfo.monthLoginNum || 0}</span> 天
          </p>
        </Card>
        <p class={'logon-time'}>上次登录时间：{this.userInfo.lastLoginTime || '----/--/--'}</p>
      </TGContainer>
    )
  }
}
