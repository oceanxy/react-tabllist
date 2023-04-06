import { Button, Checkbox, DatePicker, Form, Input, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { dateRange: [] } }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <Form.Item label="时间范围" style="width:360px">
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYYMMDD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'关键字'} style={'width:260px'}>
            {
              this.form.getFieldDecorator('contractName', { initialValue: this.initialValues.contractName })(
                <Input placeholder="合同编号/合同名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item style={'width: auto'}>
            {
              this.form.getFieldDecorator('isOutTime', {
                initialValue: !!this.initialValues.isOutTime,
                valuePropName: 'checked'
              })(
                <Checkbox>只看逾期</Checkbox>
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
