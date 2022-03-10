import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import './assets/styles/index.scss'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  inject: ['moduleName'],
  created() {
    // 为 search 创建动态侦听器
    this.$watch(
      () => this.$store.state[this.moduleName].search,
      () => dispatch(this.moduleName, 'getSiteApps')
    )
  },
  methods: {
    async onClear() {
      await dispatch(this.moduleName, 'setSearch')
      this.form.resetFields()
    },
    onSubmit(e) {
      e.preventDefault()

      this.form.validateFields(async(err, values) => {
        if (!err) {
          await dispatch(this.moduleName, 'setSearch', values)
        }
      })
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="uni-log-app-form"
        labelCol={{ offset: 2 }}
        wrapperCol={{ offset: 1 }}
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
              >
                搜索
              </Button>
              <Button onClick={this.onClear}>重置</Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    )
  }
})
