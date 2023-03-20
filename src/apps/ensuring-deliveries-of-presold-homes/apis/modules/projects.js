import qs from 'qs'

export default {
  /**
   * 获取项目列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getProjects(request, data) {
    return request({
      url: '/estate/projectInfo/getProjectInfoPageList',
      method: 'post',
      data: qs.stringify({
        ...data,
        isOutTime: Number(data.isOutTime)
      })
    })
  },
  /**
   * 获取项目枚举
   * @param request
   * @param data
   * @returns {*}
   */
  getEnumOfProjects(request, data) {
    return request({
      url: '/estate/projectInfo/getProjectInfoLikeName',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取项目详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfProjects(request, data) {
    return request({
      url: '/estate/projectInfo/getProjectInfo',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增项目
   * @param request
   * @param data
   * @returns {*}
   */
  addProjects(request, data) {
    return request({
      url: '/estate/projectInfo/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改项目
   * @param request
   * @param data
   * @returns {*}
   */
  updateProjects(request, data) {
    return request({
      url: '/estate/projectInfo/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除项目
   * @param request
   * @param data
   * @returns {*}
   */
  deleteProjects(request, data) {
    return request({
      url: '/estate/projectInfo/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出项目数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportProjects(request, params) {
    return request({
      url: '/estate/projectInfo/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改项目状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateProjectsStatus(request, data) {
    return request({
      url: '/estate/projectInfo/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取还款计划列表
   * @param request
   * @param data
   * @returns {*}
   */
  getListOfRepaymentPlan(request, data) {
    return request({
      url: '/estate/projectInfo/getWaitRefundPlanList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 还款
   * @param request
   * @param data
   * @returns {*}
   */
  repayment(request, data) {
    return request({
      url: '/estate/projectInfo/refund',
      method: 'post',
      data
    })
  },
  /**
   * 获取还款计划列表
   */
  getRepaymentPlanOfProjects(request, data) {
    return request({
      url: '/estate/projectInfo/getRefundPlanList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取还款计划列表预览
   */
  getRepaymentPlanPreviewOfProjects(request, data) {
    return request({
      url: '/estate/projectInfo/createRefundPlan',
      method: 'post',
      data
    })
  }
}
