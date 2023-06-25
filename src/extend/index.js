import Vue from 'vue'
import store from '@/store'
import router from '@/router'

const appModulesFiles = require.context('../apps', true, /extend\/[a-zA-Z0-9\-]+\.js(x)$/)

appModulesFiles.keys().reduce((modules, modulePath) => {
  const value = appModulesFiles(modulePath)

  if (value.default) {
    const TemConstructor = Vue.extend(value.default)

    new TemConstructor({ el: '#global-modal', store, router })
  }
}, {})
