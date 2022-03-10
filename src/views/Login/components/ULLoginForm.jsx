import { createNamespacedHelpers } from 'vuex'
import { Button, Form, Icon, Input } from 'ant-design-vue'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('login')

export default Form.create({ name: 'ULLoginForm' })({
  data: () => ({ picCodePath: '' }),
  computed: mapState({ loading: 'loading' }),
  mounted() {
    this.setLoading(false)
    this.genCode()

    if (process.env.NODE_ENV === 'development') {
      // 开发模式默认账号密码
      this.form.setFieldsValue({
        username: 'sysadmin',
        password: '123456'
      })
    }
  },
  methods: {
    ...mapMutations({ setLoading: 'setLoading' }),
    ...mapActions({ login: 'login' }),
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields(async(err, values) => {
        if (!err) {
          const { status } = await this.login(values)

          if (!status) {
            this.genCode()
          }
        }
      })
    },
    genCode() {
      this.picCodePath = '/api/auth/verifyCode/logimg?t=' + Math.random()
    }
  },
  render() {
    return (
      <Form
        form={this.form}
        class="uni-log-login-form"
        onSubmit={this.handleSubmit}
      >
        <Form.Item>
          {
            this.form.getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!', trigger: '' }]
            })(
              <Input placeholder="请输入用户名">
                <template slot="prefix">
                  <a-icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="user" />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码!' }] })(
              <Input placeholder="请输入密码" type="password">
                <template slot="prefix">
                  <Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="lock" />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item class="code">
          {
            this.form.getFieldDecorator('picCode', { rules: [{ required: true, message: '请输入验证码!' }] })(
              <Input placeholder="请输入验证码">
                <template slot="prefix">
                  <Icon style={{ color: 'rgba(0, 0, 0, .25)' }} type="code" />
                </template>
              </Input>
            )
          }
          <img src={this.picCodePath} alt="" onClick={this.genCode} />
        </Form.Item>
        <Form.Item>
          <Button
            loading={this.loading}
            htmlType="submit"
            type="primary"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
