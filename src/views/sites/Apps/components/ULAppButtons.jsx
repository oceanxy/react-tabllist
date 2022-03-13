import { Button, Space } from 'ant-design-vue'
import './assets/styles/index.scss'
import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  methods: {
    async onAddClick() {
      await dispatch(this.moduleName, 'setCurrent', {})
      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    async onEditClick() {
      // 注意此处数据在操作列表复选框时，已把数据存入了current，所以不再需要在手动设置current。
      // 这里的注释代码仅仅是为了提醒。
      // await dispatch(this.moduleName, 'setCurrent', payload: fromCurrent)

      await dispatch(this.moduleName, 'setModalStateForEdit', true)
    },
    onDeleteClick() {
      // todo 删除功能
    }
  },
  render() {
    return (
      <Space>
        <Button type="primary" onClick={this.onAddClick} icon='plus'>新增</Button>
        <Button type="primary" onClick={this.onEditClick} icon='edit'>修改</Button>
        <Button type="danger" onClick={this.onDeleteClick} icon='delete'>删除</Button>
      </Space>
    )
  }
}
