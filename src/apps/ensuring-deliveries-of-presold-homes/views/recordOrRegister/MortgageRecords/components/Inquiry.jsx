import { Button, Form, Input, Select, Space, DatePicker } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { dateRange: [], status: '' } }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    estateTypeList() {
      return this.getState('estateType', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'estateType',
      customApiName: 'getEstateType'
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
          <Form.Item label="时间范围" style="margin-bottom:0; width:360px">
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'不动产性质'}>
            {
              this.form.getFieldDecorator('easteDicId', { initialValue: this.initialValues.easteDicId })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.estateTypeList.list?.map(item => (
                      <Select.Option value={item.dicCode} > {item.dicName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'关键字'}>
            {
              this.form.getFieldDecorator('estateName', { initialValue: this.initialValues.estateName })(
                <Input maxLength={10} placeholder="楼盘/开发商名称" allowClear />
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
      </Form >
    )
  }
})
