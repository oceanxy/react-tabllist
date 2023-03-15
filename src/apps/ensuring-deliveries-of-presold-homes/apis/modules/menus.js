import qs from 'qs'

export default {
  /**
   * 获取角色列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMenus(request, data) {
    return request({
      url: '/system/role/getRoleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增角色
   * @param request
   * @param data
   * @returns {*}
   */
  addMenus(request, data) {
    return request({
      url: '/system/role/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改角色
   * @param request
   * @param data
   * @returns {*}
   */
  updateMenus(request, data) {
    return request({
      url: '/system/role/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除角色
   * @param request
   * @param data
   * @returns {*}
   */
  deleteMenus(request, data) {
    return request({
      url: '/system/role/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改角色状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateMenusStatus(request, data) {
    return request({
      url: '/system/role/updateStatus',
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
  },
  /**
   * 获取权限树
   * @param request
   * @param data
   * @returns {*}
   */
  getPrivilegeTree(request, data) {
    return request({
      url: '/system/privilege/getPrivilegeTree',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 设置角色的权限菜单
   * @param request
   * @param data
   * @returns {*}
   */
  setPrivilege(request, data) {
    return request({
      url: '/system/privilege/setPrivilege',
      method: 'post',
      data
    })
  },
  /**
   * 获取角色的权限菜单
   * @param request
   * @param data
   * @returns {*}
   */
  getRoleMergerMenuList(request, data) {
    return request({
      url: '/system/privilege/getRoleMergerMenuList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
