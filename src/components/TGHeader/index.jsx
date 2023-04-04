import './index.scss'
import { Avatar, Badge, Button, Divider, Dropdown, Layout, Menu, Popover, Tag } from 'ant-design-vue'
import Logo from '@/components/Logo'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TGHeader',
  props: {
    page: {
      // 'normal' || 'not-found'
      type: String,
      default: 'normal'
    }
  },
  data: () => ({ activeKey: 1 }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    userInfo() {
      return this.getState('userInfo', 'login')
    },
    isLogin() {
      return !!window.localStorage.getItem('token')
    },
    news() {
      return this.getState('news', 'login')
    },
    avatarForLetter() {
      const name = this.userInfo.nickName || this.userInfo.fullName

      return name ? name.at(-1).toUpperCase() : ''
    }
  },
  provide: { moduleName: 'login' },
  watch: {
    async userInfo(value) {
      if (!Object.keys(value).length && localStorage.getItem('token')) {
        await this.getUserInfo()
      }
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: 'login',
      stateName: 'news',
      customApiName: 'getNews'
    })
  },
  methods: {
    ...mapActions('login', { logout: 'logout', getUserInfo: 'getUserInfo' }),
    async onLogOut() {
      await this.logout()
    },
    onMenuFold() {
      this.$store.commit('setState', {
        value: !this.collapsed,
        moduleName: 'common',
        stateName: 'collapsed'
      })
    },
    onChange(activeKey) {
      this.activeKey = activeKey
    },
    async onClick({ id, targetAddress }) {
      if (targetAddress) {
        const split = targetAddress.split('?')
        const path = this.$router.resolve({ name: split[0] }).href
        const paramArr = split[1].split('&')

        const query = paramArr.reduce((params, str) => {
          const p = str.split('=')

          return { ...params, [p[0]]: p[1] }
        }, {})

        await this.$store.dispatch('custom', {
          payload: { ids: id },
          customApiName: 'setMessageToRead'
        })

        await this.$router.push({ path, query })
      }
    }
  },
  render() {
    return (
      <Layout.Header class={'tg-layout-header'}>
        <Logo />
        <div class={'tg-layout-header-content'}>
          <div class={'tg-layout-header-search'}>
            {
              this.page === 'normal'
                ? (
                  <IconFont
                    type={'icon-global-sq'}
                    class={`menu-btn menu-btn-fold${this.collapsed ? ' reverse' : ''}`}
                    onClick={this.onMenuFold}
                    title={!this.collapsed ? '折叠菜单' : '展开菜单'}
                  />
                )
                : null
            }
            {/* <Input placeholder={'搜功能'} class={'search-input'}> */}
            {/*   <IconFont type={'icon-global-search'} slot={'addonAfter'} /> */}
            {/* </Input> */}

          </div>
          {
            this.isLogin
              ? (
                <div class={'tg-header-info'}>
                  <Dropdown class={'tg-header-user'} overlayClassName={'tg-header-user-overlay'}>
                    <div class={'tg-header-user-content'}>
                      <Avatar class={'tg-avatar'} shape={'circle'}>
                        {this.avatarForLetter}
                      </Avatar>
                      <div class={'tg-user-info'}>
                        <div class={'username'}>
                          {this.userInfo.nickName || this.userInfo.fullName || '用户名'}
                        </div>
                        <div class={'tel'}>
                          {this.userInfo.loginName || '00000000000'}
                        </div>
                      </div>
                      <IconFont type={'icon-global-down'} style={'color: #ffffff'} />
                    </div>
                    <Menu slot={'overlay'}>
                      <Menu.Item onClick={this.onLogOut}>注销</Menu.Item>
                    </Menu>
                  </Dropdown>
                  <Divider type={'vertical'} class={'tg-header-divider'} />
                  <Popover overlayClassName={'tg-header-news-overlay'}>
                    <Badge
                      count={this.news.total}
                      offset={[-12, 4]}
                      numberStyle={{
                        width: '18px',
                        height: '18px',
                        fontSize: '12px',
                        lineHeight: '18px',
                        padding: '0'
                      }}
                    >
                      <Button
                        title={'通知'}
                        shape="circle"
                        type={'link'}
                        class={'tg-header-icon'}
                      >
                        <IconFont type={'icon-global-tz'} />
                      </Button>
                    </Badge>
                    <Menu slot={'content'} class={'tg-header-news'}>
                      {
                        this.news.userRefundMessageList.map(item => (
                          <Menu.Item onClick={() => this.onClick(item)}>
                            <div>
                              <Tag>{item.messageTypeStr}</Tag>
                              {item.noticeTitle}
                            </div>
                            <div>{item.createTimeStr}</div>
                          </Menu.Item>
                        ))
                      }
                    </Menu>
                    {/* <div slot={'content'} class={'tg-header-news'}> */}
                    {/*   <Tabs */}
                    {/*     activeKey={this.activeKey} */}
                    {/*     animated={true} */}
                    {/*     size={'small'} */}
                    {/*     onChange={this.onChange} */}
                    {/*   > */}
                    {/*     <Tabs.TabPane key={1} tab={<Badge count={99} offset={[12, 2]}>待办事项</Badge>}> */}
                    {/*       <Menu> */}
                    {/*         <Menu.Item> */}
                    {/*           <div>陈思睿发起了新的审核任务，请及时处理</div> */}
                    {/*           <div>2023-02-23 15:06:06</div> */}
                    {/*         </Menu.Item> */}
                    {/*         <Menu.Item> */}
                    {/*           <div>陈思睿发起了新的审核任务，请及时处理</div> */}
                    {/*           <div>2023-02-23 15:06:06</div> */}
                    {/*         </Menu.Item> */}
                    {/*       </Menu> */}
                    {/*     </Tabs.TabPane> */}
                    {/*     <Tabs.TabPane key={2} tab={<Badge count={99} offset={[12, 2]}>待阅消息</Badge>}> */}
                    {/*       <Menu> */}
                    {/*         <Menu.Item> */}
                    {/*           <div>陈思睿发起了新的审核任务，请及时处理</div> */}
                    {/*           <div>2023-02-23 15:06:06</div> */}
                    {/*         </Menu.Item> */}
                    {/*       </Menu> */}
                    {/*     </Tabs.TabPane> */}
                    {/*   </Tabs> */}
                    {/* </div> */}
                  </Popover>
                  {/* <Button */}
                  {/*   title={'更换主题颜色'} */}
                  {/*   shape="circle" */}
                  {/*   type={'link'} */}
                  {/*   class={'tg-header-icon'} */}
                  {/* > */}
                  {/*   <IconFont type={'icon-global-hf'} /> */}
                  {/* </Button> */}
                  {/* <Button shape="circle" type={'link'} class={'tg-header-icon'}> */}
                  {/*   <IconFont type={'icon-global-help'} /> */}
                  {/* </Button> */}
                </div>
              ) : null
          }
        </div>
      </Layout.Header>
    )
  }
}
