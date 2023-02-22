import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'
import Logo from '@/layouts/components/Logo'
import { mapGetters } from 'vuex'

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
        <Layout.Sider
          theme={'light'}
          v-model={this.collapsed}
          trigger={null}
          class={`tg-sider${this.collapsed ? ' collapsed' : ''}`}
          collapsible
        >
          <Logo />
          <TGMenu />
        </Layout.Sider>
        <Layout>
          <TGHeader layout="manager" showBreadcrumb={false} />
          <Layout.Content class="tg-content">
            <TGRouterView />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
