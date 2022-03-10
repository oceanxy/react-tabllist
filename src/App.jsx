import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'
import './assets/styles/index.scss'

export default {
  name: 'ULApp',
  created() {
    const tempState = JSON.parse(sessionStorage.getItem('state'))

    if (tempState) {
      // 在页面加载时读取sessionStorage里的状态信息，还原store
      this.$store.replaceState(tempState)
      // 还原store后，删除sessionStorage里的备份状态信息
      sessionStorage.removeItem('state')
    }

    // 在页面刷新时将store里的信息保存到sessionStorage里，以便刷新页面后还原store
    window.addEventListener('beforeunload', this.setStore)
  },
  methods: {
    setStore() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.setStore)
  },
  render() {
    return (
      <div id="app">
        <ConfigProvider locale={zhCN}>
          {
            this.$route.meta.keepAlive
              ? (
                <KeepAlive>
                  <RouterView />
                </KeepAlive>
              )
              : <RouterView />
          }
        </ConfigProvider>
      </div>
    )
  }
}
