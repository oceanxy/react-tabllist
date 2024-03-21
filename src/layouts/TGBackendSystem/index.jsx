import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/components/TGHeader'
import TGMenu from '@/components/TGMenu'
import watermark from '@/mixins/watermark'
import forLayout from '@/mixins/forLayout'
import TGBreadcrumb from '@/components/TGBreadcrumb'
import TGPageTabs from '@/components/TGPageTabs'

export default {
  name: 'TGBackendSystemLayout',
  mixins: [forLayout, watermark()],
  computed: {
    showMenu() {
      return this.$store.state.common.showMenu
    }
  },
  mounted() {
    // 注册全局扩展组件
    this.$nextTick(async () => {
      await import('@/extend')
    })
  },
  render() {
    return (
      <Layout id="tg-responsive-layout">
        <TGHeader />
        <Layout>
          <Layout.Sider
            theme={'light'}
            collapsible
            width={0}
            vModel={this.collapsed}
            trigger={null}
            class={`tg-sider${
              !this.showMenu
                ? ''
                : this.collapsed ? ' collapsed' : ' normal'
            }`}
          >
            {this.showMenu ? <TGMenu /> : null}
          </Layout.Sider>
          <Layout.Content class="tg-content">
            {this.$config.hideBreadCrumb || this.$route.meta.hideBreadCrumb || !this.showMenu ? null : <TGBreadcrumb />}
            {this.$config.enableTabPage && this.showMenu ? <TGPageTabs /> : null}
            {this.getRouterView}
          </Layout.Content>
        </Layout>
        <div id="global-modal" />
      </Layout>
    )
  }
}
