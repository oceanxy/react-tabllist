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
  mounted() {
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
            vModel={this.collapsed}
            trigger={null}
            class={`tg-sider${this.collapsed ? ' collapsed' : ''}`}
            collapsible
          >
            <TGMenu />
          </Layout.Sider>
          <Layout.Content class="tg-content">
            {this.$config.hideBreadCrumb || this.$route.meta.hideBreadCrumb ? null : <TGBreadcrumb />}
            {this.$config.enableTabPage ? <TGPageTabs /> : null}
            {this.RouterView}
          </Layout.Content>
        </Layout>
        <div id="global-modal" />
      </Layout>
    )
  }
}
