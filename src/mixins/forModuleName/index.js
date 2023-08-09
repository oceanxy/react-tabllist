/**
 * 根据页面 name 自动生成 moduleName 的混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-27 周一 10:09:06
 */

import forIndex from '@/mixins/forIndex'

/**
 * 根据页面 name 自动生成 moduleName 的混合
 * @param [isSubmoduleName] {boolean} 是否是子模块
 * @returns {Object}
 */
export default (isSubmoduleName = false) => {
  if (!isSubmoduleName) {
    return {
      mixins: [forIndex],
      computed: {
        moduleName() {
          const name = this.$options.name || ''

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
      computed: {
        submoduleName() {
          const name = this.$options.name || ''

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
