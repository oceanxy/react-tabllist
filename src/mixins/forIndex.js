/**
 * 通用混合，主要封装一些辅助函数
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:25:55
 */

import { dispatch } from '@/utils/store'

export default {
  methods: {
    /**
     * 注入封装后的 dispatch，不必再手动传入 moduleName。
     * 供使用了 index mixin 的组件使用。
     * 使用：this._dispatch(action, payload)
     *    也可以直接调用 '@/utils/store' 里的 'dispatch(moduleName, action, payload)'
     * 如果需要调用全局的 actions 和 mutations，请传第三个参数 root:true
     * 如果需要调用子模块，请在第三个参数内加上submoduleName
     *    也可以直接在组件内以 this.$store.dispatch() 来调用全局 actions
     * @param action {string}
     * @param payload {{payload: *} | *}
     * @param [optional] {{root: boolean}}
     */
    async _dispatch(action, payload, optional) {
      if (optional.root) {
        // 触发全局 action 修改模块内的 state。为了避免破坏性，子模块目前仅支持通过第三个参数（optional）传入
        await this.$store.dispatch(action, {
          ...payload,
          moduleName: this.moduleName,
          submoduleName: optional.submoduleName
        })
      } else {
        // 触发模块内的 action 修改其内的 state。
        await dispatch(`${this.moduleName}${
          optional.submoduleName
            ? `/${optional.submoduleName}`
            : ''
        }`, action, payload)
      }
    },
    /**
     * 打开弹窗操作
     *  1、设置 currentItem 数据。（当前用于操作的数据）
     *  2、设置对应弹窗的可见性为true，弹窗的控制字段请对应store内定义的字段
     * @param [record] {Object} 当前用于操作的数据。编辑弹窗为回显数据，详情弹窗为详情数据，为假值时代表清空 currentItem
     * @param [visibilityFieldName] {string} 默认值为打开编辑弹窗的可见性控制字段：visibilityOfEdit
     * @param [moduleName] {string} 目标模块名，在一个模块内调用另外一个模块的 state 时，需要传递对应模块的 moduleName
     * @param [submoduleName] {string} 子模块模块名，依赖 moduleName
     * @param [merge] {boolean} 是否合并，默认false
     * @returns {Promise<void>}
     */
    async _setVisibilityOfModal(record, visibilityFieldName, submoduleName, moduleName, merge) {
      if (record) {
        await this.$store.dispatch('setCurrentItem', {
          value: record,
          moduleName: this.moduleName,
          merge
        })
      }

      await this.$store.dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: true,
        moduleName: moduleName || this.moduleName,
        // 子模块只能通过传参获取，不然会造成bug
        submoduleName: submoduleName
      })
    },
    /**
     * 合并 store 模块内的 currentItem （当在弹窗内需要临时修改 currentItem 时使用）
     * @param payload
     * @param visibilityFieldName
     * @param [submoduleName]
     * @param [moduleName]
     * @returns {Promise<void>}
     * @private
     */
    async _mergeCurrentItem(payload, visibilityFieldName, submoduleName, moduleName) {
      await this._setVisibilityOfModal(payload, visibilityFieldName, submoduleName, moduleName, true)
    }
  }
}
