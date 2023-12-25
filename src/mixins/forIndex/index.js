/**
 * 通用混合，主要封装一些辅助函数
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:25:55
 */

export default {
  methods: {
    /**
     * 打开弹窗操作
     *  1、设置 currentItem 数据。（当前用于操作的数据）
     *  2、设置对应弹窗的可见性为true，弹窗的控制字段请对应store内定义的字段
     * @param [record] {Object} 当前用于操作的数据。编辑弹窗为回显数据，详情弹窗为详情数据，为假值时不会对当前的currentItem做任何改变
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
        submoduleName
      })
    },
    /**
     * 关闭弹窗操作
     *  1、清空 currentItem 数据。
     *  2、设置对应弹窗的可见性为false，弹窗的控制字段请对应store内定义的字段
     * @param [visibilityFieldName] {string} 默认值为打开编辑弹窗的可见性控制字段：visibilityOfEdit
     * @param [moduleName] {string} 目标模块名，在一个模块内调用另外一个模块的 state 时，需要传递对应模块的 moduleName
     * @param [submoduleName] {string} 子模块模块名，依赖 moduleName
     * @param [isClearCurrentItem] {boolean} 是否清空currentItem数据，默认true
     * @returns {Promise<void>}
     * @private
     */
    async _hideVisibilityOfModal(visibilityFieldName, submoduleName, moduleName, isClearCurrentItem = true) {
      moduleName = moduleName || this.moduleName

      if (Object.prototype.toString.call(this.$store.state[moduleName].currentItem) === '[object Object]') {
        if (isClearCurrentItem) {
          await this.$store.dispatch('setCurrentItem', {
            value: {},
            moduleName: this.moduleName
          })
        }
      }

      await this.$store.dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName,
        // 子模块只能通过传参获取，不然会造成bug
        submoduleName
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
