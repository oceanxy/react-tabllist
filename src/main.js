import '@/assets/styles/app.scss'
import Vue from 'vue'
import App from './App'
import config from './config'
import '@/utils/antvComponents'
import router, { createRouter } from './router'
import store from './store'
import { initializeDynamicRoutes } from '@/utils/utilityFunction'

// 加载主题
const { fileName } = config.theme
const theme = localStorage.getItem('theme') || fileName

require(`@/assets/styles/themes/${theme}`)

Vue.config.productionTip = false

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

if (localStorage.getItem('token') && config.dynamicRouting) {
  const menu = initializeDynamicRoutes()
  const homeRouteIndex = router.options.routes.findIndex(route => route.path === '/')

  router.matcher = createRouter(menu).matcher
  router.options.routes.splice(homeRouteIndex, 1, menu)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
