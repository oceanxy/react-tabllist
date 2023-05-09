import '@/assets/styles/app.scss'
import Vue from 'vue'
import App from './App'
import config from './config'
import useComponents from '@/utils/antvComponents'
import router from './router'
import store from './store'
import { initializeDynamicRoutes } from '@/utils/utilityFunction'

useComponents(config)

Vue.config.productionTip = false
// 全局添加配置文件
Vue.prototype.$config = config

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

if (localStorage.getItem('token') && config.dynamicRouting) {
  const menu = initializeDynamicRoutes()
  const homeRouteIndex = router.options.routes.findIndex(route => route.path === '/')

  router.matcher = router.createRouter(menu).matcher
  router.options.routes.splice(homeRouteIndex, 1, menu)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
