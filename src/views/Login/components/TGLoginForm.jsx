import { createNamespacedHelpers } from 'vuex'
import { Button, Form, Icon, Input } from 'ant-design-vue'
import { generateRoute } from '@/utils/utilityFunction'
import { createRouter } from '@/router'

const {
  mapState, mapActions, mapMutations
} = createNamespacedHelpers('login')

export default Form.create({ name: 'TGLoginForm' })({
  data: () => ({
    picCodePath: '',
    hint: false
  }),
  computed: mapState({ loading: 'loading', codeKey: 'codeKey' }),
  async mounted() {
    this.setLoading(false)

    if (process.env.NODE_ENV === 'development') {
      // 开发模式默认账号密码
      this.form.setFieldsValue({
        username: 'sysadmin',
        password: '123456',
        picCode: 'LANJOR'
      })
    }

    await this.genCode()
  },
  methods: {
    ...mapMutations({ setLoading: 'setLoading' }),
    ...mapActions({ login: 'login', getCodeKey: 'getCodeKey' }),
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { status } = await this.login(values)

          if (!status) {
            await this.genCode()
          } else {
            this.hint = true

            const tempMenu = JSON.parse(localStorage.getItem('menu'))[0]
            const menu = generateRoute(tempMenu)

            // 生成动态路由
            this.$router.matcher = createRouter(menu).matcher
            this.$router.options.routes.splice(1, 1, menu)

            await this.$router.replace({ name: 'home' })
            this.hint = false
          }
        }
      })
    },
    async genCode() {
      await this.getCodeKey()

      this.picCodePath = `${process.env.VUE_APP_BASE_API}/auth/verifyCode/loginImg?verifyCodeKey=${this.codeKey}`
    }
  },
  render() {
    return (
      <Form
        form={this.form}
        class="bn-login-form"
        onSubmit={this.handleSubmit}
      >
        <Form.Item>
          {
            this.form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                  trigger: ''
                }
              ]
            })(
              <Input placeholder="请输入账号">
                <template slot="prefix">
                  <a-icon
                    style={{ color: '#1890ff' }}
                    type="user"
                  />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码!' }
              ]
            })(
              <Input
                placeholder="请输入密码"
                type="password"
              >
                <template slot="prefix">
                  <Icon
                    style={{ color: '#1890ff' }}
                    type="lock"
                  />
                </template>
              </Input>
            )
          }
        </Form.Item>
        <Form.Item class="code">
          {
            this.form.getFieldDecorator('picCode', {
              rules: [
                { required: true, message: '请输入验证码!' }
              ]
            })(
              <Input placeholder="请输入验证码">
                <template slot="prefix">
                  <Icon
                    style={{ color: '#1890ff' }}
                    type="code"
                  />
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
            disabled={this.hint}
          >
            {
              this.hint
                ? '正在进入系统，请稍候...'
                : this.loading ? '正在登录' : '立即登录'
            }
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
