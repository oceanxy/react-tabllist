/**
 * vuex store模版
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-22 周三 15:18:57
 */

import { omit } from 'lodash'

/**
 * 创建 Vuex store 模块
 * @param [module={}] {Object} 需要合并到 Store 的 Vuex.Module 模块
 * @param [excludeFromState=[]] {string[]} 需要从 Vuex.Module.state 排除的字段集合
 * @returns {Object} 处理后的用于合并到 Store 的 Vuex.Module
 */
export function createStoreModule(module = {}, excludeFromState = []) {
  return {
    namespaced: true,
    state: () => (omit({
      rowKey: 'id', // antd vue Table 组件的 rowKey 属性
      treeIdField: '', // 用于接收侧边树选中值的字段名，默认''，通过 @/components/TGContainerWithTreeSider 组件设置。
      loading: false,
      search: {},
      pagination: {
        pageIndex: 0,
        pageSize: 15,
        total: 0
      },
      currentItem: {},
      list: [],
      sortFieldList: [],
      details: {},
      loadingDetails: false,
      visibilityOfEdit: false,
      selectedRowKeys: [],
      selectedRows: [],
      ...module.state
    }, excludeFromState)),
    mutations: { ...module.mutations },
    getters: { ...module.getters },
    actions: { ...module.actions },
    modules: { ...module.modules }
  }
}
