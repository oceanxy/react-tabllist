import qs from 'qs'

export default {
  /**
   * 获取职员列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAccountNumbers(request, data) {
    return request({
      url: '/system/employee/getEmployeeList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增职员
   * @param request
   * @param data
   * @returns {*}
   */
  addAccountNumbers(request, data) {
    return request({
      url: '/system/employee/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改职员
   * @param request
   * @param data
   * @returns {*}
   */
  updateAccountNumbers(request, data) {
    return request({
      url: '/system/employee/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除职员
   * @param request
   * @param data
   * @returns {*}
   */
  deleteAccountNumbers(request, data) {
    return request({
      url: '/system/employee/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改职员状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateAccountNumbersStatus(request, data) {
    return request({
      url: '/system/employee/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取角色树
   * @param request
   * @param data
   * @returns {*}
   */
  getRoleTree(request, data) {
    return request({
      url: '/system/role/getRoleTree',
      method: 'post',
      data
    })
  },

  /**
   * 密码重置
   * @param request
   * @param data
   * @returns {*}
   */
  resetPwd(request, data) {
    return request({
      url: '/system/employee/resetPwd',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
