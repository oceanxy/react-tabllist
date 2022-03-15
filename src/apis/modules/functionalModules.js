import qs from 'qs'

export default {
  /**
   * 获取功能模块分页列表
   * @param request
   * @param data
   * @returns {*}
   */
  getFunctionalModules(request, data) {
    return request({
      url: '/deploy/module/getModulePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取所有功能模块列表
   * @param request
   * @returns {*}
   */
  getAllFunctionalModules(request) {
    return request({
      url: '/deploy/module/getModulePageDict',
      method: 'post'
    })
  },
  /**
   * 更新功能模块状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateFunctionalModulesStatus(request, data) {
    return request({
      url: '/deploy/application/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除功能模块
   * @param request
   * @param data
   * @returns {*}
   */
  deleteFunctionalModules(request, data) {
    return request({
      url: '/deploy/application/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 新增功能模块
   * @param request
   * @param data
   * @returns {*}
   */
  addFunctionalModules(request, data) {
    return request({
      url: '/deploy/module/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改功能模块
   * @param request
   * @param data
   * @returns {*}
   */
  updateFunctionalModules(request, data) {
    return request({
      url: '/deploy/module/update',
      method: 'post',
      data
    })
  }
}
