import './assets/styles/index.scss'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'ant-design-vue'


export default {
  name: 'TGApp',
  // data() {
  //   return {
  //     ratioX: 1,
  //     ratioY: 1
  //   }
  // },
  async created() {
    const tempState = JSON.parse(localStorage.getItem('state'))

    if (tempState) {
      // 在页面加载时读取localStorage里的状态信息，还原store
      this.$store.replaceState(tempState)

      // 还原store后，删除localStorage里的备份状态信息
      localStorage.removeItem('state')
    }

    // 在页面刷新时将store里的信息保存到localStorage里，以便刷新页面后还原store
    window.addEventListener('beforeunload', this.setStore)
  },
  mounted() {
    // window.onresize = this.getRatio
    // this.getRatio()
  },
  methods: {
    // getRatio() {
    //   this.ratioX = window.innerWidth / 1920
    //   this.ratioY = window.innerHeight / 1080
    // },
    setStore() {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.setStore)
  },
  render() {
    return (
      <div
        id="app"
        // style={{
        //   transform: `scale(${this.ratioX}, ${this.ratioY})`,
        //   transformOrigin: 'left top'
        // }}
      >
        <div id="loading">
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ConfigProvider locale={zhCN}>
          {
            this.$route.meta.keepAlive
              ? (
                <KeepAlive>
                  <RouterView key={this.$route.fullPath} />
                </KeepAlive>
              )
              : <RouterView key={this.$route.fullPath} />
          }
        </ConfigProvider>
      </div>
    )
  }
}
