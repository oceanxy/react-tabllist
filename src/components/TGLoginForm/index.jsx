import './index.scss'
import { createNamespacedHelpers } from 'vuex'
import { Button, Form, Input } from 'ant-design-vue'
import { getEnvVar } from '@/utils/env'

const {
  mapState,
  mapActions,
  mapMutations
} = createNamespacedHelpers('login')

export default Form.create({ name: 'TGLoginForm' })({
  name: 'TGLoginForm',
  data: () => ({
    picCodePath: '',
    hint: false
  }),
  computed: { ...mapState({ loading: 'loading', codeKey: 'codeKey' }) },
  async mounted() {
    this.setLoading(false)

    if (this.$config.enableLoginVerification) {
      await this.genCode()
    }
  },
  methods: {
    ...mapMutations({ setLoading: 'setLoading' }),
    ...mapActions({
      login: 'login',
      getCodeKey: 'getCodeKey',
      jump: 'jump'
    }),
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { status } = await this.login({ payload: values, config: this.$config })

          if (!status) {
            if (this.$config.enableLoginVerification) {
              await this.genCode()
            }
          } else {
            this.hint = true
            await this.jump()
            this.hint = false
          }
        }
      })
    },
    async genCode() {
      await this.getCodeKey()

      this.picCodePath = `${getEnvVar('VUE_APP_BASE_API')}/auth/verifyCode/loginImg?verifyCodeKey=${this.codeKey}`
    }
  },
  render() {
    return (
      <Form
        form={this.form}
        class={'tg-login-form'}
        onSubmit={this.handleSubmit}
      >
        <Form.Item>
          {
            this.form.getFieldDecorator('username', {
              initialValue: process.env.NODE_ENV === 'development' ? DEV_DEFAULT_ACCOUNT : '',
              rules: [
                {
                  required: true,
                  message: '请输入用户名!',
                  trigger: ''
                }
              ]
            })(
              <Input placeholder="请输入账号">
                <IconFont
                  slot="prefix"
                  type={'icon-login-user'}
                />
              </Input>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('password', {
              initialValue: process.env.NODE_ENV === 'development' ? DEV_DEFAULT_PASSWORD : '',
              rules: [
                { required: true, message: '请输入密码!' }
              ]
            })(
              <Input
                placeholder="请输入密码"
                type="password"
              >
                <IconFont
                  slot="prefix"
                  type={'icon-login-pwd'}
                />
              </Input>
            )
          }
        </Form.Item>
        {
          this.$config.enableLoginVerification
            ? (
              <Form.Item class="code">
                {
                  this.form.getFieldDecorator('picCode', {
                    initialValue: process.env.NODE_ENV === 'development' && this.$config.enableLoginVerification
                      ? 'LANJOR'
                      : '',
                    rules: [
                      { required: true, message: '请输入验证码!' }
                    ]
                  })(
                    <Input placeholder="请输入验证码">
                      <IconFont
                        slot="prefix"
                        type={'icon-login-captcha'}
                      />
                    </Input>
                  )
                }
                <img
                  src={this.picCodePath}
                  alt=""
                  onClick={this.genCode}
                />
              </Form.Item>
            )
            : null
        }
        <Form.Item>
          <Button
            class="login-submit"
            loading={this.loading || this.hint}
            icon={(this.loading || this.hint) ? 'loading' : ''}
            htmlType="submit"
            type="primary"
            disabled={this.loading || this.hint}
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
