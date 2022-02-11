import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动引入 './modules' 中的所有 vuex 模块
// 不再需要`import app from './modules/app'`
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
  getters
})
