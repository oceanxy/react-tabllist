import { Button, Form, Input, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { fullName: undefined } }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <Form.Item label={'开发商'} style={'width:260px'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input placeholder="输入名称搜索" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Space>
            <Button
              loading={this.loading}
              htmlType="submit"
              type="primary"
              icon="search"
            >
              查询
            </Button>
            <Button onClick={this.onClear} icon="reload">重置并刷新</Button>
          </Space>
        </Space>
      </Form>
    )
  }
})
