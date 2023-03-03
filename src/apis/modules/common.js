import qs from 'qs'

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
  }
}
