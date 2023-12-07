import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/components/TGHeader'
import TGMenu from '@/components/TGMenu'
import { mapGetters } from 'vuex'
import TGBreadcrumb from '@/components/TGBreadcrumb'
import watermark from '@/mixins/watermark'
import TGPageTabs from '@/components/TGPageTabs'
import { replacePath } from '@/utils/utilityFunction'
import { RouterView } from 'vue-router'

export default {
  name: 'TGBackendSystemLayout',
  mixins: [watermark()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    }
  },
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
            {
              this.$config.hideBreadCrumb || this.$route.meta.hideBreadCrumb
                ? null
                : <TGBreadcrumb />
            }
            {this.$config.enableTabPage ? <TGPageTabs /> : null}
            {
              // this.$config.enableTabPage ||
              this.$route.meta.keepAlive
                ? (
                  <KeepAlive>
                    <RouterView key={replacePath(this.$route.fullPath)} />
                  </KeepAlive>
                )
                : <RouterView key={replacePath(this.$route.fullPath)} />
            }
          </Layout.Content>
        </Layout>
        <div id="global-modal" />
      </Layout>
    )
  }
}
