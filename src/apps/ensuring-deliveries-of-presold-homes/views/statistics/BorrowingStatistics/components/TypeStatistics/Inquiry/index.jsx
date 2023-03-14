import './index.scss'
import { Form, Button, DatePicker } from 'ant-design-vue'
import moment from 'moment'

export default Form.create({})({
  inject: ['moduleName'],
  data: () => ({ initialValues: { startDate: '', endDate: '' } }),
  methods: {
    async onSubmit(e) {
      e?.preventDefault()
      const formData = this.form.getFieldsValue()

      // if (!formData.endDate && !formData.startDate) {
      //   return
      // }

      formData.endDate = formData.endDate ? moment(formData.endDate).format('YYYYMMDD') : ''
      formData.startDate = formData.startDate ? moment(formData.startDate).format('YYYYMMDD') : ''

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'threeChatList',
        customApiName: 'getThreeChatList',
        payload: { ...formData }
      })
    }
  },
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        layout="inline"
        class={'fe-console-inquiry'}
      >
        <div class={'row-up'}>
          <Form.Item label="选择时间" style={'margin-bottom:0'}>
            <Form.Item>
              {
                this.form.getFieldDecorator('startDate', { initialValue: this.initialValues.startDate })(
                  <DatePicker
                    placeholder={'年/月/日'}
                    valueFormat={'YYYY-MM-DD'}
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                this.form.getFieldDecorator('endDate', { initialValue: this.initialValues.endDate })(
                  <DatePicker
                    placeholder={'年/月/日'}
                    valueFormat={'YYYY-MM-DD'}
                    allowClear
                  />
                )
              }
            </Form.Item>
          </Form.Item>
          <Button
            loading={this.loading}
            htmlType="submit"
            type="primary"
            icon="search"
          >
            搜索
          </Button>
        </div>
      </Form>
    )
  }
})
