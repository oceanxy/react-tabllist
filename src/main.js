import Vue from 'vue'
import App from './App'
import config from './config'
import '@/utils/antvComponents'
import { generateRoute } from '@/utils/utilityFunction'

Vue.config.productionTip = false

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

function creatVue(r, s, terminal) {
  if (localStorage.getItem('token') && terminal !== 'client' && config.dynamicRouting) {
    const tempMenu = JSON.parse(localStorage.getItem('menu'))[0]
    const menu = generateRoute(tempMenu)

    r.default.matcher = r.createRouter(menu).matcher
    r.default.options.routes.splice(1, 1, menu)
  }

  new Vue({
    router: r.default,
    store: s.default,
    render: h => h(App)
  }).$mount('#app')
}

async function creatApp() {
  const terminal = process.env.VUE_APP_PROJECT.match(/(?<=(-)).*/g)[0]

  // if (process.env.VUE_APP_PROJECT === 'development-client' || process.env.VUE_APP_PROJECT === 'production-client') {
  //   creatVue(await import('./router/client'), await import('./store/client'), 'client')
  // } else {
  //   creatVue(await import('./router/manager'), await import('./store/manager'), 'manager')
  // }

  creatVue(await import('./router/' + terminal), await import('./store/' + terminal), terminal)
}

creatApp()
