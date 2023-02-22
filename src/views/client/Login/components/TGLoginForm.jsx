import { createNamespacedHelpers } from 'vuex'
import { Button, Form, Icon, Input } from 'ant-design-vue'

const {
  mapState, mapActions, mapMutations
} = createNamespacedHelpers('login')

export default Form.create({ name: 'TGLoginForm' })({
  data: () => ({ picCodePath: '' }),
  computed: mapState({ loading: 'loading' }),
  mounted() {
    this.setLoading(false)
    this.genCode()

    if (process.env.NODE_ENV === 'development') {
      // 开发模式默认账号密码
      this.form.setFieldsValue({
        username: '15826032172',
        password: '123456',
        picCode: 'LANJOR'
      })
    }
  },
  methods: {
    ...mapMutations({ setLoading: 'setLoading' }),
    ...mapActions({ login: 'login' }),
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { status } = await this.login(values)

          if (!status) {
            this.genCode()
          }
        }
      })
    },
    genCode() {
      this.picCodePath = '/api/auth/verifyCode/loginImg?t=' + Math.random()
    }
  },
  render() {
    return (
      <Form form={this.form} class="bn-login-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {
            this.form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder="请输入账号">
                <template slot="prefix">
                  <Icon style={{ color: '#1890ff' }} type="user" />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder="请输入密码" type="password">
                <template slot="prefix">
                  <Icon style={{ color: '#1890ff' }} type="lock" />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item class="code">
          {
            this.form.getFieldDecorator('picCode', {
              rules: [
                {
                  required: true,
                  message: '请输入验证码!',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder="请输入验证码">
                <template slot="prefix">
                  <Icon style={{ color: '#1890ff' }} type="code" />
                </template>
              </Input>
            )
          }
          <img
            src={this.picCodePath}
            alt=""
            onClick={this.genCode}
          />
        </Form.Item>
        <Form.Item>
          <Button
            class="login-submit"
            loading={this.loading}
            htmlType="submit"
            type="primary"
          >
            立即登录
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
