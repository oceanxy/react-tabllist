import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    // 学校及学校下级禁用新增、修改或删除等一切操作
    isFeatureDisabled() {
      const { type } = this.$store.state[this.moduleName].search

      // 类型（1.区 2.职能部门 3.街道 4.学校顶级 5.学校 6.年级 7.班级）
      return [4, 5, 6, 7].includes(type)
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          disabled={this.isFeatureDisabled}
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          新增
        </Button>
        <Button
          type="primary"
          disabled={this.isFeatureDisabled || this.editButtonDisabled}
          onClick={() => this.onEditClick()}
          icon="edit"
        >
          修改
        </Button>
        <Button
          type="danger"
          disabled={this.isFeatureDisabled || this.deleteButtonDisabled}
          onClick={() => this.onDeleteClick()}
          icon="delete"
        >
          删除
        </Button>
      </Space>
    )
  }
}
