import qs from 'qs'

export default {
  /**
   * 获取预告记录分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSignUpOnline(request, data) {
    return request({
      url: '/estate/netSign/getNetSignPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增网签记录
   * @param request
   * @param data
   * @returns {*}
   */
  addSignUpOnline(request, data) {
    return request({
      url: '/estate/netSign/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改网签记录
   * @param request
   * @param data
   * @returns {*}
   */
  updateSignUpOnline(request, data) {
    return request({
      url: '/estate/netSign/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除网签记录
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSignUpOnline(request, data) {
    return request({
      url: '/estate/netSign/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改网签记录状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateSignUpOnlineStatus(request, data) {
    return request({
      url: '/estate/netSign/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 导出抵押记录数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportSignUpOnline(request, params) {
    return request({
      url: '/estate/netSign/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 解除签约
   * @param request
   * @param data
   * @returns {*}
   */
  rescindContract(request, data) {
    return request({
      url: '/estate/netSign/rescindContract',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
