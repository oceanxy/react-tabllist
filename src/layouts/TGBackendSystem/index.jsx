import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/components/TGHeader'
import TGMenu from '@/components/TGMenu'
import TGRouterView from '@/components/TGRouterView'
import { mapGetters } from 'vuex'
import TGBreadcrumb from '@/components/TGBreadcrumb'

export default {
  name: 'TGBackendSystemLayout',
  computed: {
    ...mapGetters({ getState: 'getState' }),
    collapsed() {
      return this.getState('collapsed', 'common')
    }
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
            <TGMenu />
          </Layout.Sider>
          <Layout.Content class="tg-content">
            <TGBreadcrumb />
            <TGRouterView />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
