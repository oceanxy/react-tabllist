import { Layout } from 'ant-design-vue'
import TGRouterView from '@/layouts/components/TGRouterView'
import './assets/styles/index.scss'

export default {
  name: 'TGVisualScreenLayout',
  mounted() {
    // TODO 在这里做页面尺寸变动的监听处理
  },
  render() {
    return (
      <Layout id="tg-visual-screen-layout">
        <TGRouterView />
      </Layout>
    )
  }
}
