/**
 * 创建动态vuex模块.依赖 forModuleName 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:31:00
 */

import { commitRootInModule } from '@/utils/store'
import { firstLetterToUppercase } from '@/utils/utilityFunction'
import forModuleName from './forModuleName'

/**
 * 创建动态vuex模块
 * @param [customModuleName] {string} 自定义模块名（小驼峰命名规则）。如果存在自定义模块名，仅动态注册该模块
 * @param [isRequestData] {boolean} 是否在注册 customModuleName 模块后立即请求该模块的数据列表。依赖 customModuleName 参数，默认 true
 * @param [injectSubmoduleName] {boolean} 是否同时注册子模块。与 customModuleName 参数互斥，默认 false
 * @returns {Object}
 */
export default (
  {
    customModuleName,
    isRequestData = true,
    injectSubmoduleName
  } = {}
) => {
  let dynamicState

  if (customModuleName) {
    // 如果存在自定义模块名，为了不与其他动态模块混淆，仅动态注册该模块，此时不提供 moduleName
    dynamicState = {
      async created() {
        // 判断动态模块文件夹内是否存在与moduleName匹配的文件，用以作为动态模块的模版
        if (this.$store.dynamicModules[customModuleName]) {
          // 判断是否已经注册了该模块
          if (!this.$store.hasModule(customModuleName)) {
            this.$store.registerModule(
              customModuleName,
              this.$store.dynamicModules[customModuleName]?.(commitRootInModule.bind(
                null,
                customModuleName,
                this.$store.commit
              ))
            )

            if (isRequestData) {
              // 动态注册store模块后，立即请求该模块的数据
              await this.$store.dispatch('getList', {
                api: `get${firstLetterToUppercase(customModuleName)}`,
                moduleName: customModuleName
              })
            }
          }
        } else {
          console.error(`未在vuex store(store/dynamicModules/modules)中找到与“${customModuleName}”对应的名称，vuex 自定义动态模块将不会创建！`)
        }
      },
      methods: {
        /**
         * 下拉列表搜索事件的回调
         * @param keyword
         * @returns {Promise<void>}
         */
        async onSelectSearch(keyword) {
          // 动态注册store模块后，立即请求该模块的数据
          await this.$store.dispatch('getList', {
            api: `get${firstLetterToUppercase(customModuleName)}`,
            moduleName: customModuleName,
            additionalQueryParameters: {
              pageIndex: 0,
              fullName: keyword
            }
          })
        }
      }
    }
  } else {
    dynamicState = {
      mixins: [forModuleName(injectSubmoduleName)],
      created() {
        if (this.moduleName) {
          // 判断动态模块文件夹内是否存在与moduleName匹配的文件，用以作为动态模块的模版
          if (this.$store.dynamicModules[this.moduleName]) {
            // 判断是否已经注册了该模块
            if (!this.$store.hasModule(this.moduleName)) {
              this.$store.registerModule(
                this.moduleName,
                this.$store.dynamicModules[this.moduleName]?.(commitRootInModule.bind(
                  null,
                  this.moduleName,
                  this.$store.commit
                ))
              )
            }
          } else {
            console.error(`未在vuex store(store/dynamicModules/modules)中找到与“${this.moduleName}”对应的名称，vuex 动态模块将不会创建！`)
          }
        } else {
          console.error('如需注册动态模块，请设置组件的 name 属性，格式采用大驼峰命名法。例如：“DynamicModuleName”')
        }
      }
      /**
       * 组件销毁时，取消注册动态store模块
       */
      // destroyed() {
      //   if (store.hasModule(this.moduleName)) {
      //     store.unregisterModule(this.moduleName)
      //   }
      // }
    }
  }

  return dynamicState
}
