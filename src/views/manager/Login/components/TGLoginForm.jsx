import '../assets/styles/index.scss'
import { createNamespacedHelpers } from 'vuex'
import { Button, Form, Input } from 'ant-design-vue'
import { generateRoute } from '@/utils/utilityFunction'
import { createRouter } from '@/router/manager'

const {
  mapState, mapActions, mapMutations
} = createNamespacedHelpers('login')

export default Form.create({ name: 'TGLoginForm' })({
  data: () => ({
    picCodePath: '',
    hint: false
  }),
  computed: mapState({ loading: 'loading' }),
  mounted() {
    this.setLoading(false)
    // this.genCode()

    if (process.env.NODE_ENV === 'development') {
      // 开发模式默认账号密码
      this.form.setFieldsValue({
        username: 'adminOne',
        password: '123456'
        // picCode: 'LANJOR'
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
            // this.genCode()
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
    genCode() {
      this.picCodePath = '/api/auth/verifyCode/loginImg?t=' + Math.random()
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
                  message: '请输入用户名！',
                  trigger: ''
                }
              ]
            })(
              <Input placeholder="请输入账号" />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码！' }
              ]
            })(
              <Input placeholder="请输入密码" type="password" />
            )
          }
        </Form.Item>
        {/*<Form.Item class="code" style={{ display: 'none' }}>*/}
        {/*  {*/}
        {/*    this.form.getFieldDecorator('picCode', {*/}
        {/*      rules: [*/}
        {/*        { required: true, message: '请输入验证码!' }*/}
        {/*      ]*/}
        {/*    })(*/}
        {/*      <Input placeholder="请输入验证码" />*/}
        {/*    )*/}
        {/*  }*/}
        {/*  <img*/}
        {/*    src={this.picCodePath}*/}
        {/*    alt=""*/}
        {/*    onClick={this.genCode}*/}
        {/*  />*/}
        {/*</Form.Item>*/}
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
