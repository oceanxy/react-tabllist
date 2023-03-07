import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { easteDicId: '' } }),
  computed: {
    natureOfAssets() {
      return this.$store.state[this.moduleName].natureOfAssets
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'natureOfAssets',
      customApiName: 'getEnumOfNatureOfAssets'
    })
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <Form.Item label={'资产性质'}>
            {
              this.form.getFieldDecorator('easteDicId', { initialValue: this.initialValues.easteDicId })(
                <Select placeholder={'资产性质'}>
                  <Select.Option value={''}>不限</Select.Option>
                  {
                    this.natureOfAssets.list.map(item => (
                      <Select.Option value={item.dicCode}>{item.dicName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'关键字'}>
            {
              this.form.getFieldDecorator('queryName', { initialValue: this.initialValues.queryName })(
                <Input placeholder="开发商/资产名称" allowClear />
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
