<template>
  <div class="tem-gen-login">
    <p>登 录</p>
    <a-form :form="form" class="tem-gen-login-form" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!', trigger: '' }] }]"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <a-icon style="color:rgba(0,0,0,.25)" type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]"
          placeholder="请输入密码"
          type="password"
        >
          <template #prefix>
            <a-icon style="color:rgba(0,0,0,.25)" type="lock" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          type="primary"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('login')

export default {
  name: 'Login',
  data() {
    return {
      // 初始化表单
      form: this.$form.createForm(this, { name: 'login' })
    }
  },
  computed: mapState({ loading: 'loading' }),
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      // 开发模式默认账号密码
      this.form.setFieldsValue({
        username: 'admin',
        password: '123456'
      })
    }
  },
  methods: {
    ...mapActions({ login: 'login' }),
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.login(values)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.tem-gen-login {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .tem-gen-login-form {
    width: 400px;
  }
}
</style>
