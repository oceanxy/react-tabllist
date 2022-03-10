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
  updateSiteAppsStatus(request, data) {
    return request({
      url: '/deploy/application/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
