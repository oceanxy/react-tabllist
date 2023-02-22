import './assets/styles/index.scss'
import { Icon, Tag } from 'ant-design-vue'
import BNContainer from '@/components/TGModule'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import dynamicState from '@/mixins/dynamicState'
import { mapAction, mapState } from '@/utils/store'
import { createNamespacedHelpers } from 'vuex'

const { mapState: loginMapState } = createNamespacedHelpers('login')

export default {
  name: 'home',
  mixins: [dynamicState()],
  computed: {
    ...loginMapState(['userInfo']),
    ...mapState(['messageLoading', 'messageList', 'backLogLoading', 'backLogInfo']),
    messageListEffect() {
      return this.messageList.map(item => {
        return {
          id: item.id,
          time: item.publishTimeStr,
          title: item.messageTitle
        }
      })
    },
    backLogList() {
      const list = this.backLogInfo?.backLogList || []

      return list.map(item => {
        item.fullName = item.title
        item.status = 1

        return item
      })
    }
  },
  mounted() {
    this.getMessage()
    this.getBackLogList()
  },
  methods: {
    async onMore() {
      await this.$router.push({ name: 'news' })
    },
    async onHandle(data) {
      if (data.type === 1 || data.type === 3) {
        await this.$router.push({ name: 'reportForm' })
      } else {
        await this.$router.push({ name: 'bill' })
      }
    },
    ...mapAction(['getMessage', 'getBackLogList']),
    async toDetails() {
      await this.$router.push({ name: 'news' })
    }
  },
  render() {
    return (
      <TGContainerWithSider class="tg-home">
        <template slot="default">
          <div class="tg-home-summary">
            <div class="user-info">
              <Icon type="user" class="avatar" />
              <div class="info">
                <span class="name">
                  {this.userInfo.companyName}
                </span>
              </div>
              <span class="address">
                {this.userInfo.contractAddress}
                <Icon type="right" />
              </span>
              <div class="tags">
                {
                  this.userInfo.isContract === 1
                    ? <Tag color="cyan">已签约</Tag>
                    : <Tag color="gray">未签约</Tag>
                }
                {
                  this.userInfo.isOwe === 1
                    ? <Tag color="red">已欠费</Tag>
                    : null
                }
              </div>
            </div>
            <div class="upcoming">
              <div class="upcoming-item my-to-do">
                <div class="name">我的待办</div>
                <div class="value">{this.userInfo.waitNum || 0}</div>
              </div>
              <div class="upcoming-item in-progress">
                <div class="name">进行中的待办</div>
                <div class="value">{this.userInfo.goingNum || 0}</div>
              </div>
              <div class="upcoming-item my-news">
                <div class="name">我的消息</div>
                <div class="value">{this.userInfo.messageNum || 0}</div>
              </div>
            </div>
          </div>
          <BNContainer
            class="tg-home-upcoming"
            width="100%"
            modalTitle={
              <div class="title">
                我的待办（{this.backLogInfo?.countNum || 0}）
                <div class="btns">
                  {/* <Button class="all">全部</Button>
                  <Divider type="vertical" />
                  <Button class="todo">待办</Button>
                  <Divider type="vertical" />
                  <Button class="in-progress">进行中</Button>
                  <Divider type="vertical" />
                  <Button class="done">已办</Button> */}
                </div>
              </div>
            }
          >
          </BNContainer>
        </template>
        <template slot="sider">
          <BNContainer
            width="100%"
            moduleTitle="我的快捷菜单"
            showBoxShadow={false}
            class="shortcut-menu-container"
            titleClass="not-login-title"
            contentClass="shortcut-container"
          >
          </BNContainer>
          <BNContainer
            class="my-news-container"
            width="100%"
            modalTitle="我的消息"
            showBoxShadow={false}
            showMore
            titleClass="not-login-title"
            onmore={this.onMore}
          >
          </BNContainer>
        </template>
      </TGContainerWithSider>
    )
  }
}
