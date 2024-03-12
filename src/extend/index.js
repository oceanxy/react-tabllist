import Vue from 'vue'
import store from '@/store'
import router from '@/router'

const appModulesFiles = require.context('../apps', true, /extend\/[a-zA-Z0-9\-]+\.js(x)$/)

appModulesFiles.keys().reduce((modules, modulePath) => {
  const value = appModulesFiles(modulePath)

  if (value.default) {
    const TemConstructor = Vue.extend(value.default)

    new TemConstructor({
      // #global-modal 标签位于 src/layouts/TGBackendSystem，因此要使用此功能，需结合该布局组件使用
      el: '#global-modal',
      store,
      router
    })
  }
}, {})
