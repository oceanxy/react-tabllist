import { Button, Space } from 'ant-design-vue'
import './assets/styles/index.scss'

export default {
  render() {
    return (
      <Space>
        <Button type='primary'>新增</Button>
        <Button type='primary'>修改</Button>
        <Button type='danger'>删除</Button>
      </Space>
    )
  }
}
