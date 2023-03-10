import qs from 'qs'

export default {
  /**
   * 获取组织机构列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getCombination(request, data) {
    return request({
      url: '/system/organ/getOrganList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  addCombination(request, data) {
    return request({
      url: '/system/organ/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  updateCombination(request, data) {
    return request({
      url: '/system/organ/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  deleteCombination(request, data) {
    return request({
      url: '/system/organ/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改组织机构状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateCombinationStatus(request, data) {
    return request({
      url: '/system/organ/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取组织机构树
   * @param request
   * @param data
   * @returns {*}
   */
  getOrganTree(request, data) {
    return request({
      url: '/system/organ/getOrganTree',
      method: 'post',
      data
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
