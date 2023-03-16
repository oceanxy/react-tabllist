import qs from 'qs'

export default {
  /**
   * 获取菜单分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getFunctions(request, data) {
    return request({
      url: '/system/function/getFunctionList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增菜单
   * @param request
   * @param data
   * @returns {*}
   */
  addFunctions(request, data) {
    return request({
      url: '/system/function/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改菜单
   * @param request
   * @param data
   * @returns {*}
   */
  updateFunctions(request, data) {
    return request({
      url: '/system/function/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除菜单
   * @param request
   * @param data
   * @returns {*}
   */
  deleteFunctions(request, data) {
    return request({
      url: '/system/function/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改菜单状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateFunctionsStatus(request, data) {
    return request({
      url: '/system/function/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取系统功能详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfFunctions(request, data) {
    return request({
      url: '/system/function/getFunctionInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取菜单树
   * @param request
   * @param data
   * @returns {*}
   */
  getMenuTree(request, data) {
    return request({
      url: '/system/menu/getMenuTree',
      method: 'post',
      data
    })
  }
}
