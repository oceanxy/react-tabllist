import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGFooter from '@/layouts/components/TGFooter'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/TGRouterView'
import './assets/styles/index.scss'

export default {
  name: 'TGBackendSystemLayout',
  data: () => ({
    collapsed: false
  }),
  methods: {},
  render() {
    return (
      <Layout id="tg-layout-responsive">
        <Layout.Sider
          v-model={this.collapsed}
          trigger={''}
          class="tg-sider"
          collapsible
        >
          <div class="logo" />
          <TGMenu />
        </Layout.Sider>
        <Layout>
          <TGHeader collapsed={this.collapsed} />
          <Layout.Content class="tg-content">
            <TGRouterView />
          </Layout.Content>
          <TGFooter />
        </Layout>
      </Layout>
    )
  }
}
