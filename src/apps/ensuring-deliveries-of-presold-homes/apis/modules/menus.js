import qs from 'qs'

export default {
  /**
   * 获取菜单分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMenus(request, data) {
    return request({
      url: '/system/menu/getMenuList',
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
  addMenus(request, data) {
    return request({
      url: '/system/menu/add',
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
  updateMenus(request, data) {
    return request({
      url: '/system/menu/update',
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
  deleteMenus(request, data) {
    return request({
      url: '/system/menu/delete',
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
  updateMenusStatus(request, data) {
    return request({
      url: '/system/menu/updateStatus',
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
