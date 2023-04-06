import qs from 'qs'

export default {
  /**
   * 获取资产列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAssets(request, data) {
    return request({
      url: '/estate/estate/getEstatePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增资产
   * @param request
   * @param data
   * @returns {*}
   */
  addAssets(request, data) {
    return request({
      url: '/estate/estate/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改资产
   * @param request
   * @param data
   * @returns {*}
   */
  updateAssets(request, data) {
    return request({
      url: '/estate/estate/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除资产
   * @param request
   * @param data
   * @returns {*}
   */
  deleteAssets(request, data) {
    return request({
      url: '/estate/estate/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出资产数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportAssets(request, params) {
    return request({
      url: '/estate/estate/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改资产状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateAssetsStatus(request, data) {
    return request({
      url: '/estate/estate/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业性质枚举
   * @param request
   * @returns {*}
   */
  getEnumOfNatureOfAssets(request) {
    return request({
      url: '/estate/dictionary/getEstateType',
      method: 'post'
    })
  }
}
