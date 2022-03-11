/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: store helper
 * @Date: 2022-03-10 周四 17:56:58
 */

import store from '@/store'

/**
 * 在模块内触发全局 mutation 的封装
 * @param moduleName {string} 需要修改状态的模块名称
 * @param commit {Function} [moduleName]模块的commit (Vuex.commit)
 * @param mutation {string} Mutation
 * @param payload {*} 触发mutation的值
 */
export function commitRootInModule(moduleName, commit, mutation, payload) {
  commit(mutation, { payload, moduleName }, { root: true })
}

/**
 * 封装的dispatch
 * @param moduleName
 * @param action
 * @param [payload]
 * @returns {Promise<any>}
 */
export async function dispatch(moduleName, action, payload) {
  return await store.dispatch(`${moduleName}/${action}`, payload)
}
