import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/components/TGHeader'
import TGMenu from '@/components/TGMenu'
import TGRouterView from '@/components/TGRouterView'
import { mapGetters } from 'vuex'
import TGBreadcrumb from '@/components/TGBreadcrumb'

export default {
  name: 'TGBackendSystemLayout',
  props: {},
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
            v-model={this.collapsed}
            trigger={null}
            class={`tg-sider${this.collapsed ? ' collapsed' : ''}`}
            collapsible
          >
            {/* <div style={'padding:15px 20px 0 20px'}> */}
            {/*   <h4 style={'font-size:16px;margin-bottom:0'}>保交楼信息管理系统</h4> */}
            {/*   <div style={'font-size:12px;color:#ccc'}>V1.02</div> */}
            {/* </div> */}
            <TGMenu />
          </Layout.Sider>
          <Layout.Content class="tg-content">
            {
              this.$config.hideBreadCrumb || this.$route.meta.hideBreadCrumb
                ? null
                : <TGBreadcrumb />
            }
            <TGRouterView />
          </Layout.Content>
        </Layout>
        <div id="global-modal"></div>
      </Layout>
    )
  }
}
