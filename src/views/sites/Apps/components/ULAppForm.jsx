import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import searchForm from '@/mixins/searchForm'
import './assets/styles/index.scss'

export default Form.create({})({
  mixins: [searchForm],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="uni-log-app-form"
      >
        <Space>
          <Form.Item label="站点名称">
            {
              this.form.getFieldDecorator('appName')(
                <Input placeholder="请输入站点名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status')(
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                搜索
              </Button>
              <Button onClick={this.onClear} icon="reload">重置</Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    )
  }
})
