import qs from 'qs'

export default {
  /**
   * 获取学校树
   * @param request
   * @returns {*}
   */
  getSchoolTree(request) {
    return request({
      url: '/personnel/school/getSchoolTree',
      method: 'post'
    })
  },
  /**
   * 获取学校街道树
   * @param request
   * @returns {*}
   */
  getStreetTree(request) {
    return request({
      url: '/personnel/school/getStreetTree',
      method: 'post'
    })
  },
  /**
   * 获取体检项目分类树
   * @param request
   * @returns {*}
   */
  getExamineCatalogTree(request) {
    return request({
      url: '/examine/examineCatalog/getExamineCatalogTree',
      method: 'post'
    })
  },
  /**
   * 获取省市区
   * @param request
   * @returns {*}
   */
  getAdministrativeDivision(request) {
    return request({
      url: '/system/district/getAreas',
      method: 'post'
    })
  },
  /**
   * 根据区ID获取街道
   * @param request
   * @returns {*}
   */
  getStreetsByDistrictId(request, data) {
    return request({
      url: '/system/district/getStreetTree',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 查询所有楼栋楼层房间
   * @param request
   * @param params
   * @returns {*}
   */
  getAllBuildList(request, params) {
    return request({
      url: '/morningNoon/build/getAllBuildList',
      method: 'get',
      params
    })
  }
}
