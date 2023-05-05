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
 * 封装的全局dispatch
 * 直接在组件内调用自身对应的store module
 * @param moduleName
 * @param action
 * @param [payload]
 * @returns {Promise<any>}
 */
export async function dispatch(moduleName, action, payload) {
  const store = await import('../store')

  return await store.default.dispatch(`${moduleName}/${action}`, payload)
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
 * @param [initials] {boolean} 以首字母命名，默认 false（当模块名称过长时，可以设置为true）
 * @returns {Object}
 */
export function getStoreModulesFromFiles(modulesFiles, apis, regular, initials) {
  return modulesFiles.keys().reduce((modules, modulePath) => {
    let moduleName

    if (!initials) {
      // eg. 设置 './app.js' => 'app'
      moduleName = modulePath.replace(regular, '$1')
    } else {
      moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

      // apps 下的文件夹名称通常比较长，取其每个单词的首字母组合当作store内每个app的前缀
      const newName = getFirstLetterOfEachWordOfAppName(moduleName.substring(0, moduleName.indexOf('/')))

      moduleName = newName + '/' + moduleName.substring(moduleName.lastIndexOf('/') + 1)
    }

    const value = modulesFiles(modulePath)

    // 向 module 中的 actions 注入 apis
    if (value.default.actions) {
      value.default.actions = injectApisForModules(value.default.actions, apis)
    }

    modules[moduleName] = value.default

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

    modules = {
      ...modules,
      ...value.default
    }

    return modules
  }, {})
}

/**
 * 返回store模块状态
 * @param {string[]} keys 状态的键名
 * @param {string} [submoduleName] 子模块名称
 * @return {Object}
 */
export const mapState = (keys, submoduleName) => {
  return keys.reduce((modules, item) => {
    modules[item] = function() {
      const moduleNameData = this.$store.state[this.moduleName]

      if (submoduleName) {
        return moduleNameData[submoduleName][item]
      } else {
        return moduleNameData[item]
      }
    }

    return modules
  }, {})
}

/**
 * @description: 返回store模块getter
 * @param {Array} keys [string]
 * @param {string} submoduleName 子模块名称
 * @return {object}
 */
export const mapGetter = (keys, submoduleName) => {
  const result = keys.reduce((modules, item) => {
    modules[item] = function() {
      const moduleNameData = this.$store.getters

      if (submoduleName) {
        return moduleNameData[`${this.moduleName}/${this.submoduleName}/${item}`]
      } else {
        return moduleNameData[`${this.moduleName}/${item}`]
      }
    }

    return modules
  }, {})

  return result
}

/**
 * @description: 返回store模块方法
 * @param {Array} actions [string]
 * @return {object} { [key]:function(payload,submoduleName) }
 */
export const mapAction = actions => {
  const result = actions.reduce((modules, item) => {
    modules[item] = function(payload, submoduleName) {
      if (submoduleName) {
        return this.$store.dispatch(`${this.moduleName}/${submoduleName}/${item}`, payload)
      } else {
        return this.$store.dispatch(`${this.moduleName}/${item}`, payload)
      }
    }

    return modules
  }, {})

  return result
}

/**
 * @description: 返回store模块同步方法
 * @param {Array} actions [string]
 * @return {object} { [key]:function(payload,submoduleName) }
 */
export const mapMutation = actions => {
  const result = actions.reduce((modules, item) => {
    modules[item] = function(payload, submoduleName) {
      if (submoduleName) {
        this.$store.commit(`${this.moduleName}/${submoduleName}/${item}`, payload)
      } else {
        this.$store.commit(`${this.moduleName}/${item}`, payload)
      }
    }

    return modules
  }, {})

  return result
}
