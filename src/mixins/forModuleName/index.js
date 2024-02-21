/**
 * 根据页面 name 自动生成 moduleName 的混合。
 * 请始终为本框架内的页面级组件添加本混合，以注册页面的 moduleName 属性，
 * moduleName 功能：
 * - 用于注册页面的动态 store 模块；
 * - 用于获取路由中`route.meta.keepAlive = true`时，页面组件的名称，以配合 VUE 的 keep-alive 组件缓存页面；
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-27 周一 10:09:06
 */

import forIndex from '@/mixins/forIndex'

/**
 * 根据页面 name 自动生成 moduleName 的混合
 * @param [isSubmoduleName] {boolean} - 是否是子模块
 * @param [setModuleName] {() => string} - 自定义页面的 name 属性，该函数采用 call(this) 方式调用
 * @returns {Object}
 */
export default (isSubmoduleName = false, setModuleName) => {
  if (!isSubmoduleName) {
    return {
      mixins: [forIndex],
      computed: {
        moduleName() {
          const name = setModuleName?.call(this) || this.$options.name || ''

          if (!name) {
            console.warn('请设置组件的名称：name(大驼峰命名规则)，动态创建store模块需要该属性！')

            return null
          }

          // 如果 name 的第一个字母是大写且第二个字母是小写（大驼峰命名）的情况，则转为小驼峰命名，
          // 如果 name 的第一和第二个字母都是大写的情况，则不作转换。
          return name.replace(/^[A-Z](?=[a-z])/g, s => s.toLowerCase())
        }
      },
      provide() {
        return { moduleName: this.moduleName }
      }
    }
  } else {
    return {
      mixins: [forIndex],
      inject: { moduleName: { default: undefined } },
      computed: {
        submoduleName() {
          const name = setModuleName?.call(this) || this.$options.name || ''

          if (!name) {
            console.warn('请设置组件的名称:name(大驼峰命名规则)，获取子模块数据需要该属性！')

            return null
          }

          // 如果 name 的第一个字母是大写且第二个字母是小写（大驼峰命名）的情况，则转为小驼峰命名，
          // 如果 name 的第一和第二个字母都是大写的情况，则不作转换。
          return name.replace(/^[A-Z](?=[a-z])/g, s => s.toLowerCase())
        }
      },
      provide() {
        return { submoduleName: this.submoduleName }
      }
    }
  }
}
