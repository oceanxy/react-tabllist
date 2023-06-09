import '@/assets/styles/app.scss'
import Vue from 'vue'
import config from './config'
import useComponents from '@/utils/antvComponents'
import router, { resetRoutes } from './router'
import store from './store'

useComponents(config)

Vue.config.productionTip = false
// 全局添加配置文件
Vue.prototype.$config = config

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

if (localStorage.getItem('token')) {
  resetRoutes()
}

new Vue({
  router,
  store,
  render: h => h(APP_COMPONENT.default)
}).$mount('#app')
