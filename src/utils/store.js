/**
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Description: store helper
 * @Date: 2022-03-10 周四 17:56:58
 */

import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

/**
 * 在模块内触发全局 mutation 的封装
 * @param moduleName {string} 需要修改状态的模块名称
 * @param commit {Function} [moduleName]模块的commit (Vuex.commit)
 * @param mutation {string} Mutation
 * @param payload {*} 触发mutation的值
 */
export function commitRootInModule(moduleName, commit, mutation, payload) {
  commit(mutation, payload, { root: true })
}

/**
 * 为自定义 Vuex.store 模块注入 apis
 * @param actions
 * @param apis
 * @returns {{}}
 */
export function injectApisForModules(actions, apis) {
  return Object.entries(actions).reduce((newActions, [key, action]) => {
    newActions[key] = action.bind({ apis })

    return newActions
  }, {})
}

/**
 * 从 require.context 导入的文件中获取用于 store 的模块
 * @param modulesFiles 从 require.context 导入的文件
 * @param apis {Object} 全局apis
 * @param regular {RegExp} 从导入文件的路径中获取名称的正则表达式
 * @param [initials] {boolean} 是否取名称中每个单词的首字母来命名模块，默认 false（当模块名称过长时，建议设置为 true）
 * @returns {Object}
 */
export function getStoreModulesFromFiles(modulesFiles, apis, regular, initials) {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    const value = modulesFiles(modulePath)

    if (value.default?.actions) {
      value.default.actions = injectApisForModules(value.default.actions, apis)
    }

    // 向 module 中的 actions 注入 apis
    if (value.default) {
      let moduleName = modulePath.replace(regular, '$1')

      if (initials) {
        const tempName = moduleName.split('/')

        // apps 下的文件夹名称通常比较长，取其每个单词的首字母组合当作store内每个app的前缀
        moduleName = getFirstLetterOfEachWordOfAppName(tempName[0]) + '/' + tempName.at(-1)
      }

      modules[moduleName] = value.default
    }

    return modules
  }, {})
}

/**
 * 从 require.context 导入的文件中获取 apis
 * @param modulesFiles 从 require.context 导入的文件
 * @returns {Object}
 */
export function getApisFromFiles(modulesFiles) {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    // eg. 设置 './app.js' => 'app'
    const value = modulesFiles(modulePath)

    if (value.default) {
      modules = {
        ...modules,
        ...value.default
      }
    }

    return modules
  }, {})
}
