import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import apis from '@/apis'
import { getStoreModulesFromFiles, injectApisForModules } from '@/utils/store'

Vue.use(Vuex)

// require.context 请参考：https://webpack.js.org/guides/dependency-management/#requirecontext
// 框架层通用模块
const modulesFiles = require.context('./modules', true, /\.js$/)
// app通用模块
const appModulesFiles = require.context('../apps', true, /store\/modules\/[a-zA-Z0-9-]+\.js$/)
// app异步加载模块
const dynamicModulesFiles = require.context('../apps', true, /store\/dynamicModules\/modules\/[a-zA-Z0-9-]+\.js/)

// 自动引入 './modules' 中的所有 vuex 模块
const modules = getStoreModulesFromFiles(modulesFiles, apis, /^\.\/(.*)\.\w+$/)
const appModules = getStoreModulesFromFiles(appModulesFiles, apis, /^\.\/(.*)\.\w+$/, true)
const dynamicModules = getStoreModulesFromFiles(dynamicModulesFiles, apis, /^.*\/(\w+)\.\w+$/)

const store = new Vuex.Store({
  state: {},
  mutations,
  actions: injectApisForModules(actions, apis),
  modules: { ...modules, ...appModules },
  getters
})

store._dynamicModules = dynamicModules
store._commonModules = { ...modules, ...appModules }
store._apis = apis

export { dynamicModules }

export default store
