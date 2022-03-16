import qs from 'qs'

export default {
  /**
   * 获取页面分页列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPages(request, data) {
    return request({
      url: '/deploy/page/getPagePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取所有页面
   * @param [request]
   * @returns {*}
   */
  getAllPages(request) {
    return request({
      url: '/deploy/page/getDicList',
      method: 'post'
    })
  },
  /**
   * 更新页面状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updatePagesStatus(request, data) {
    return request({
      url: '/deploy/page/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新监控状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updatePagesMonitorStatus(request, data) {
    return request({
      url: '/deploy/page/updateMonitorStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除页面
   * @param [request]
   * @param data
   * @returns {*}
   */
  deletePages(request, data) {
    return request({
      url: '/deploy/page/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 新增页面
   * @param [request]
   * @param data
   * @returns {*}
   */
  addPages(request, data) {
    return request({
      url: '/deploy/page/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改页面
   * @param [request]
   * @param data
   * @returns {*}
   */
  updatePages(request, data) {
    return request({
      url: '/deploy/page/update',
      method: 'post',
      data
    })
  }
}
