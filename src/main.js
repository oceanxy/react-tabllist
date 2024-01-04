import '@/assets/styles/app.scss'
import Vue from 'vue'
import config from './config'
import useComponents from '@/utils/antvComponents'
import router from './router'
import store from './store'
import { loadScript, loadStyle, loadVariablesStyle, reloadTheme } from '@/assets/styles'
import { join, resolve } from 'path'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

function createVue() {
  new Vue({
    router,
    store,
    render: h => h(APP_COMPONENT.default)
  }).$mount('#app')
}

const appName = getFirstLetterOfEachWordOfAppName()

useComponents(config)

Vue.config.productionTip = false
// 全局添加配置文件
Vue.prototype.$config = config

// 预载mock数据（开发环境下并启用mock时执行）
if (process.env.NODE_ENV === 'development' && config.mock) {
  require('../mock/index.js')
}

const { NODE_ENV, VUE_APP_PUBLIC_PATH } = process.env

// 加载第三方/远程文件
if (config.loadFiles?.length) {
  config.loadFiles.forEach(file => {
    let host = window.location.host

    if (!host.includes('http')) host = file.host

    loadScript(`${host}${file.filePath}`, () => {
      console.log(`${file.filename}文件加载完成！`)
    })
  })
}

// 加载主题（生产环境和开发环境因为webpack打包机制的不同，所以采用不同的方式实现）
if (NODE_ENV === 'production') {
  fetch(resolve(join(__dirname, VUE_APP_PUBLIC_PATH, '/manifest.json')))
    .then(response => response.json())
    .then(async data => {
      const theme = localStorage.getItem(`${appName}-theme`) || config.theme.default

      loadStyle(resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${theme}.css`]}`)))
      loadScript(
        resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${theme}.js`]}`)),
        () => {
          reloadTheme()
        }
      )
    })

  if (config.prodGateways?.configuration) {
    let ENV_PRODUCTION = config.prodGateways?.filename

    if (ENV_PRODUCTION?.length) {
      if (!/.+\.json$/.test(ENV_PRODUCTION)) {
        ENV_PRODUCTION += '.json'
      }
    } else {
      ENV_PRODUCTION = '/env.production.json'
    }

    fetch(resolve(join(__dirname, VUE_APP_PUBLIC_PATH, ENV_PRODUCTION)))
      .then(response => response.json())
      .then(data => {
        localStorage.setItem(`${appName}-baseApi`, data.VUE_APP_BASE_API)

        createVue()
      })
  } else {
    createVue()
  }
} else {
  loadVariablesStyle(config, store)

  createVue()
}
