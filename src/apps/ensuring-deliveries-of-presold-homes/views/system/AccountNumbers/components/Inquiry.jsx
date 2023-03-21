

import { Form, Input, Select } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { status: '' } }),
  computed: {
    forRender() {
      return [
        <Form.Item label={'账号'}>
          {
            this.form.getFieldDecorator('loginName', { initialValue: this.initialValues.loginName })(
              <Input maxLength={10} placeholder="请输入账号" allowClear />
            )
          }
        </Form.Item>,
        <Form.Item label={'状态'}>
          {
            this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
              <Select placeholder="请选择" allowClear>
                <Select.Option value={''}>全部</Select.Option>
                <Select.Option value={1}>正常</Select.Option>
                <Select.Option value={2}>停用</Select.Option>
              </Select>
            )
          }
        </Form.Item>
      ]
    }
  }
})
