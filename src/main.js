import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import config from './config'
// 引入特定组件
import '@/utils/antvComponents'

Vue.config.productionTip = false

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
