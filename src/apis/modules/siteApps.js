import qs from 'qs'

export default {
  /**
   * 获取站点应用分页列表
   * @param request
   * @param data
   * @returns {*}
   */
  getSiteApps(request, data) {
    return request({
      url: '/deploy/application/getApplicationPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新站点状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateSiteAppsStatus(request, data) {
    return request({
      url: '/deploy/application/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  deleteSiteApp(request, data) {
    return request({
      url: '/deploy/application/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  addSiteApp(request, data) {
    return request({
      url: '/deploy/application/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  updateSiteApp(request, data) {
    return request({
      url: '/deploy/application/update',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
