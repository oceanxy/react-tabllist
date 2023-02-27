import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/components/TGHeader'
import TGMenu from '@/components/TGMenu'
import TGRouterView from '@/components/TGRouterView'

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
