import '@/assets/styles/app.scss'
import Vue from 'vue'
import config from './config'
import useComponents from '@/utils/antvComponents'
import router, { resetRoutes } from './router'
import store from './store'
import getVariablesStyle from '@/assets/styles'

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

function loadStyle(url) {
  const link = document.createElement('link')

  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url

  const head = document.getElementsByTagName('head')[0]

  head.appendChild(link)
}

function loadScript(url) {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src = url

  document.body.appendChild(script)
}

const { NODE_ENV, VUE_APP_PUBLIC_PATH, VUE_APP_DOMAIN_NAME } = process.env

// 加载主题（生产环境和开发环境因为webpack打包机制的不同，所以采用不同的方式实现）
if (NODE_ENV === 'production') {
  const theme = localStorage.getItem('theme') || config.theme.default

  fetch(`${VUE_APP_DOMAIN_NAME}${VUE_APP_PUBLIC_PATH}/manifest.json`.replace('//', '/'))
    .then(response => response.json())
    .then(async data => {
      if (!data[`${theme}.css`]) {
        loadStyle(`${VUE_APP_PUBLIC_PATH}/${data[config.theme.default]}`)
        loadScript(`${VUE_APP_PUBLIC_PATH}/${data[config.theme.default]}`)
      } else {
        loadStyle(`${VUE_APP_PUBLIC_PATH}/${data[`${theme}.css`]}`)
        loadScript(`${VUE_APP_PUBLIC_PATH}/${data[`${theme}.js`]}`)
      }
    })
} else {
  getVariablesStyle(config, store)
}

new Vue({
  router,
  store,
  render: h => h(APP_COMPONENT.default)
}).$mount('#app')
