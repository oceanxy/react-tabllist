import TGHeader from '@/components/TGHeader'
import { Button, Layout, Space } from 'ant-design-vue'

export default {
  name: 'NoAccess',
  render() {
    return (
      <Layout class={'tg-not-found'}>
        <TGHeader layout="manager" page={'not-found'} />
        <Layout class={'tg-not-found-content'}>
          <Space class={'hint'}>
            <span>无访问权限~</span>
            <Button type={'link'} onClick={() => this.$router.replace('/')}>返回首页</Button>
          </Space>
        </Layout>
      </Layout>
    )
  }
}
