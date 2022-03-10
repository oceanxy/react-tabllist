import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import dynamicModules from './dynamicModules'

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

const store = new Vuex.Store({
  state: {},
  mutations: {
    setLoading(state, { payload, moduleName }) {
      state[moduleName].loading = payload
    },
    setSearch(state, { payload, moduleName }) {
      state[moduleName].search = payload
    },
    setPagination(state, { payload, moduleName }) {
      state[moduleName].pagination = payload
    },
    setTotal(state, { payload, moduleName }) {
      state[moduleName].total = payload
    },
    setList(state, { payload, moduleName }) {
      state[moduleName].list = payload
    }
  },
  actions: {},
  modules,
  getters
})

export {
  dynamicModules
}

export default store
