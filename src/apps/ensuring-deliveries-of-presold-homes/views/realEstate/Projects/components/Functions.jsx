import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onCustomAddClick()}
          icon="plus"
        >
          新增
        </Button>
        <Button
          disabled={this.exportButtonDisabled}
          onClick={() => this.onCustomExport()}
          icon="export"
        >
          导出
        </Button>
      </Space>
    )
  }
}
