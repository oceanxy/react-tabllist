import qs from 'qs'

export default {
  /**
   * 获取开发商列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDevelopers(request, data) {
    return request({
      url: '/estate/developers/getDevelopersPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增开发商
   * @param request
   * @param data
   * @returns {*}
   */
  addDevelopers(request, data) {
    return request({
      url: '/estate/developers/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改开发商
   * @param request
   * @param data
   * @returns {*}
   */
  updateDevelopers(request, data) {
    return request({
      url: '/estate/developers/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除开发商
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDevelopers(request, data) {
    return request({
      url: '/estate/developers/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出开发商数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportDevelopers(request, params) {
    return request({
      url: '/estate/developers/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改开发商状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateDevelopersStatus(request, data) {
    return request({
      url: '/estate/developers/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业性质枚举
   * @param request
   * @returns {*}
   */
  getEnumOfNatureOfTheEnterprise(request) {
    return request({
      url: '/estate/dictionary/getCardType',
      method: 'post'
    })
  }
}
