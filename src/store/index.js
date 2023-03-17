import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// require.context 请参考：https://webpack.js.org/guides/dependency-management/#requirecontext
// 框架层通用模块
const modulesFiles = require.context('./modules', true, /\.js$/)
// app通用模块
const appModulesFiles = require.context('../apps', true, /store\/modules\/[a-zA-Z0-9-]+\.js$/)
// app异步加载模块
const dynamicModulesFiles = require.context('../apps', true, /store\/dynamicModules\/modules\/[a-zA-Z0-9-]+\.js/)

// 自动引入 './modules' 中的所有 vuex 模块
// 不再需要`import app from './modules/app'`
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)

  modules[moduleName] = value.default

  return modules
}, {})

const appModules = appModulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = appModulesFiles(modulePath)

  modules[moduleName] = value.default

  return modules
}, {})

const dynamicModules = dynamicModulesFiles.keys().reduce((modules, modulePath) => {
  // eg. 设置 './app.js' => 'app'
  const moduleName = modulePath.replace(/^.*\/(\w+)\.\w+$/, '$1')
  const value = dynamicModulesFiles(modulePath)

  modules[moduleName] = value.default

  return modules
}, {})

const store = new Vuex.Store({
  state: {},
  mutations,
  actions,
  modules: { ...modules, ...appModules },
  getters
})

store._dynamicModules = dynamicModules
store._commonModules = { ...modules, ...appModules }

export { dynamicModules }

export default store
