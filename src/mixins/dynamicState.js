/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 创建动态vuex模块
 * @Date: 2022-03-10 周四 16:31:00
 */

import store, { dynamicModules } from '@/store'
import { commitRootInModule } from '@/utils/store'

export default {
  provide() {
    return { moduleName: this.moduleName }
  },
  computed: {
    moduleName() {
      if (!this.$options.name) {
        console.warn('请设置组件的名称(name)，动态创建store模块需要该属性！')
        return null
      }

      return this.$options.name.replace(/^\S/g, s => s.toLowerCase())
    }
  },
  created() {
    if (this.moduleName) {
      if (!store.hasModule(this.moduleName)) {
        dynamicModules[this.moduleName]?.(store, commitRootInModule.bind(null, this.moduleName, store.commit))
      } else {
        console.warn(`未在vuex store(store/dynamicModules/modules)中找到与“${this.moduleName}”对应的名称，vuex 动态模块将不会创建！`)
      }
    }
  },
  destroyed() {
    if (store.hasModule(this.moduleName)) {
      store.unregisterModule(this.moduleName)
    }
  }
}
