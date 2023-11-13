import './index.scss'
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Popover,
  Select,
  Space,
  Tag
} from 'ant-design-vue'
import Logo from '@/components/Logo'
import { mapActions, mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

export default {
  name: 'TGHeader',
  mixins: [forIndex],
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
      return this.getState('news', 'common')
    },
    organListForHeader() {
      return this.getState('organListForHeader', 'common')
    },
    headerId: {
      get() {
        return this.getState('headerId', 'common') || localStorage.getItem('headerId')
      },
      set(value) {
        localStorage.setItem('headerId', value)
        this.$store.commit('setState', {
          value,
          moduleName: 'common',
          stateName: 'headerId'
        })
      }
    },
    avatarForLetter() {
      const name = this.userInfo.nickName || this.userInfo.fullName

      return name ? name.at(-1).toUpperCase() : ''
    },
    theme() {
      return (
        localStorage.getItem('theme') || this.$store.state?.login?.userInfo?.themeFileName || this.$config.theme.default
      )
    }
  },
  provide: { moduleName: 'login' },
  watch: {
    userInfo: {
      immediate: true,
      async handler(value) {
        const token = localStorage.getItem('token')

        if (!Object.keys(value).length && token) {
          await this.getUserInfo({ token })
        }
      }
    },
    headerId() {
      if (document.querySelector('#tg-responsive-layout')) {
        document.querySelector('#tg-responsive-layout').style.display = 'none'
      }

      window.location.reload()
    }
  },
  async created() {
    if (this.$config.news?.show) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'common',
        stateName: 'news',
        customApiName: 'getNews'
      })
    }

    if (this.$config.headerParams?.show && !this.organListForHeader.list.length) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'common',
        stateName: 'organListForHeader',
        customApiName: 'getSitesOfStaff'
      })
    }
  },
  async mounted() {
    // 更新用户信息。因为目前用户信息存在 localStorage 中，直接关闭浏览器窗口不会清空用户信息，
    // 所以每次进入到系统，需要更新一次用户信息，以确保用户信息不会被缓存污染
    const token = localStorage.getItem('token')

    if (token) {
      await this.getUserInfo({ token })
    }
  },
  methods: {
    ...mapActions('login', { logout: 'logout', getUserInfo: 'getUserInfo' }),
    async resetPwd() {
      await this._setVisibilityOfModal(
        '',
        'visibilityOfResetPwd',
        null,
        `${getFirstLetterOfEachWordOfAppName()}/common`
      )
    },
    async onLogOut() {
      const response = await this.logout()

      if (response.status) {
        await this.$router.replace({ name: 'login' })
      }
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
    },
    async switchThemes(themeFileName) {
      if (document.querySelector('#tg-responsive-layout')) {
        document.querySelector('#tg-responsive-layout').style.display = 'none'

        await this.$store.dispatch('custom', {
          customApiName: 'setThemeFileName',
          payload: { themeFileName }
        })

        this.$store.commit('setState', {
          stateName: 'userInfo',
          value: { themeFileName },
          moduleName: 'login',
          merge: true
        })

        localStorage.setItem('theme', themeFileName || this.$config.theme.default)
        window.location.reload()
      }
    },
    toLogin() {
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.path }
      })
    }
  },
  render() {
    return (
      <Layout.Header class={'tg-layout-header'}>
        <Logo />
        <Space class={'tg-layout-header-content'}>
          {
            this.page === 'normal'
              ? (
                <IconFont
                  type={'icon-global-sq'}
                  class={`tg-layout-header-menu-btn menu-btn-fold${this.collapsed ? ' reverse' : ''}`}
                  onClick={this.onMenuFold}
                  title={!this.collapsed ? '折叠菜单' : '展开菜单'}
                />
              )
              : null
          }
          {/* <div class={'tg-layout-header-search'}> */}
          {/*   <Input placeholder={'搜功能'} class={'search-input'}> */}
          {/*     <IconFont type={'icon-global-search'} slot={'addonAfter'} /> */}
          {/*   </Input> */}
          {/* </div> */}
          <div class={'tg-header-info'}>
            {
              this.isLogin
                ? [
                  this.$config.headerParams?.show
                    ? [
                      <Select
                        vModel={this.headerId}
                        placeholder={this.$config.headerParams?.placeholder ?? '请选择'}
                        class={'tg-header-params'}
                        suffixIcon={<IconFont type={'icon-global-down'} />}
                      >
                        {
                          this.organListForHeader.list.map(item => (
                            <Select.Option value={item.id}>{item.organName}</Select.Option>
                          ))
                        }
                      </Select>,
                      <Divider type={'vertical'} class={'tg-header-divider'} />
                    ]
                    : null,
                  <Dropdown class={'tg-header-user'} overlayClassName={'tg-header-user-overlay'}>
                    <div class={'tg-header-user-content'}>
                      <Avatar class={'tg-avatar'} shape={'circle'}>
                        {this.avatarForLetter}
                      </Avatar>
                      <div class={'tg-user-info'}>
                        <div class={'tg-header-username'}>
                          {this.userInfo.nickName || this.userInfo.fullName || '暂无用户名'}
                        </div>
                        <div class={'tg-header-tel'}>
                          {this.userInfo.loginName}
                        </div>
                      </div>
                      <IconFont type={'icon-global-down'} style={'color: #ffffff'} />
                    </div>
                    <Menu slot={'overlay'}>
                      {
                        this.$config.resetPwd.show
                          ? <Menu.Item onClick={this.resetPwd}>重置密码</Menu.Item>
                          : null
                      }
                      <Menu.Item onClick={this.onLogOut}>注销</Menu.Item>
                    </Menu>
                  </Dropdown>,
                  <Divider type={'vertical'} class={'tg-header-divider'} />,
                  this.$config.news?.show
                    ? (
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
                          <Button title={'通知'} shape="circle" type={'link'} class={'tg-header-icon'}>
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
                    )
                    : null,
                  this.$config.theme?.show
                    ? (
                      <Dropdown class={'tg-header-themes'} overlayClassName={'tg-header-themes-overlay'}>
                        <Button title={'切换主题'} shape="circle" type={'link'} class={'tg-header-icon'}>
                          <IconFont type={'icon-global-hf'} />
                        </Button>
                        <Menu slot={'overlay'}>
                          {
                            this.$config.theme?.availableThemes.map(item => (
                              <Menu.Item
                                disabled={this.theme === item.fileName}
                                onClick={() => this.switchThemes(item.fileName)}
                              >
                                {item.name}
                              </Menu.Item>
                            ))
                          }
                        </Menu>
                      </Dropdown>
                    )
                    : null,
                  <Button shape="circle" type={'link'} class={'tg-header-icon'}>
                    <IconFont type={'icon-global-help'} />
                  </Button>
                ]
                : (
                  <Dropdown class={'tg-header-user'} overlayClassName={'tg-header-user-overlay'}>
                    <div class={'tg-header-user-content'}>
                      <Avatar class={'tg-avatar'} shape={'circle'}>
                        <Icon type={'user'} />
                      </Avatar>
                      <div class={'tg-user-info'}>
                        <Button
                          type={'link'}
                          class={'tg-header-username'}
                          onClick={this.toLogin}
                        >
                          去登录
                        </Button>
                      </div>
                    </div>
                  </Dropdown>
                )
            }
          </div>
        </Space>
      </Layout.Header>
    )
  }
}
