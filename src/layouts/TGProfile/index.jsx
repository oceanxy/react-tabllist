import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'

export default {
  name: 'TGProfileLayout',
  data: () => ({collapsed: false}),
  methods: {},
  render() {
    return (
      <Layout id="tg-profile-layout">
        <TGHeader showBreadcrumb={false} />
        <Layout.Content class="tg-content">
          <TGMenu class="tg-menu" />
          <TGRouterView class='tg-main' />
        </Layout.Content>
      </Layout>
    )
  }
}
