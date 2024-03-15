import '@/assets/styles/app.scss'
import { detectZoom } from '@/utils/detectZoom'
import Vue from 'vue'
import config from '@/config'
import useComponents from '@/utils/antvComponents'
import store from '@/store'
import router from '@/router'
import { fetchProdEnvTheme, loadDevEnvTheme, loadScript } from '@/assets/styles'
import { join, resolve } from 'path'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import { TGKeepAlive } from '@/components/TGRouterView'
import dotenv from 'dotenv'

function createVue() {
  new Vue({
    router,
    store,
    components: { TGKeepAlive },
    render: h => h(APP_COMPONENT.default)
  }).$mount('#app')
}

const appName = getFirstLetterOfEachWordOfAppName()
const m = detectZoom()

// 处理笔记本系统默认系统比例为125%、150%带来的布局影响
document.body.style.zoom = 100 / Number(m)

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
    if (file.host) {
      let host = file.host
      const regex = /^\{([A-Z0-9_]+)}$/

      if (regex.test(file.host)) {
        const VUE_APP_JEGOTRIP_AJAX = host.replace(regex, '$1')

        if (config.prodEnvVar.configurable) {
          host = localStorage.getItem(`${appName}--${VUE_APP_JEGOTRIP_AJAX}`)
        } else {
          host = process.env[VUE_APP_JEGOTRIP_AJAX]
        }
      }

      if (host) {
        loadScript(`${host}${file.filePath}`, () => {
          console.log(`${file.filename}文件加载完成！`)
        })
      }
    }
  })
}

// 加载主题（生产环境和开发环境因为webpack打包机制的不同，所以采用不同的方式实现）
if (NODE_ENV === 'production') {
  // 加载默认主题
  fetchProdEnvTheme()

  if (config.prodEnvVar?.configurable) {
    let ENV_PRODUCTION = config.prodEnvVar?.filename

    if (ENV_PRODUCTION?.length) {
      if (!/^\.env(\.[a-z0-9]+)*$/.test(ENV_PRODUCTION)) {
        ENV_PRODUCTION = '.env.' + ENV_PRODUCTION
      }
    } else {
      ENV_PRODUCTION = '.env.production'
    }

    fetch(resolve(join(__dirname, VUE_APP_PUBLIC_PATH, ENV_PRODUCTION)))
      .then(response => response.text())
      .then(data => {
        Object.entries(dotenv.parse(data) || {}).forEach(([key, value]) => {
          localStorage.setItem(`${appName}--${key}`, /**@type string*/value)
        })

        createVue()
      })
  } else {
    createVue()
  }
} else {
  // 加载默认主题
  loadDevEnvTheme()

  createVue()
}
