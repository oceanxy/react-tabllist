export default {
  /**
   * 获取省市区
   * @param request
   * @returns {*}
   */
  getAdministrativeDivision(request) {
    return request({
      url: '/system/district/getDistrictListThree',
      method: 'post'
    })
  },
  /**
   * 获取民族数据
   * @param request
   * @returns {*}
   */
  getNations(request) {
    return request({
      url: '/system/dictionary/getNationality',
      method: 'post'
    })
  },
  /**
   * 获取政治面貌数据
   * @param request
   * @returns {*}
   */
  getPoliticalStatus(request) {
    return request({
      url: '/system/dictionary/getPolitical',
      method: 'post'
    })
  },
  /**
   * 获取阶级数据
   * @param request
   * @returns {*}
   */
  getCastes(request) {
    return request({
      url: '/system/dictionary/getCardType',
      method: 'post'
    })
  },
  /**
   * 获取行政级别数据
   * @param request
   * @returns {*}
   */
  getAdministrativeRanks(request) {
    return request({
      url: '/system/dictionary/getAdministrativeLevel',
      method: 'post'
    })
  },
  /**
   * 获取学历数据
   * @param request
   * @returns {*}
   */
  getDegrees(request) {
    return request({
      url: '/system/dictionary/getDegree',
      method: 'post'
    })
  },
  getProvinces(request) {
    return request({
      url: '/system/district/getDistrictTreeForOne',
      method: 'post'
    })
  }
}
