import qs from 'qs'

export default {
  /**
   * 获取资方合同列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/getCapitalContractInfoPageList',
      method: 'post',
      data: qs.stringify({
        ...data,
        isOutTime: Number(data.isOutTime)
      })
    })
  },
  /**
   * 获取资方合同详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/getCapitalContractInfo',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增资方合同
   * @param request
   * @param data
   * @returns {*}
   */
  addEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改资方合同
   * @param request
   * @param data
   * @returns {*}
   */
  updateEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除资方合同
   * @param request
   * @param data
   * @returns {*}
   */
  deleteEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出资方合同数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportEmployerSideContracts(request, params) {
    return request({
      url: '/estate/capitalContractInfo/exportExcel',
      method: 'get',
      params: { ...params, isOutTime: Number(params.isOutTime) },
      responseType: 'blob'
    })
  },
  /**
   * 修改资方合同状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateEmployerSideContractsStatus(request, data) {
    return request({
      url: '/estate/capitalContractInfo/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 还款弹窗-获取还款期次下拉列表
   * @param request
   * @param data
   * @returns {*}
   */
  getListOfRepaymentPlan(request, data) {
    return request({
      url: '/estate/capitalContractInfo/getWaitRefundPlanList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 还款操作
   * @param request
   * @param data
   * @returns {*}
   */
  repayment(request, data) {
    return request({
      url: '/estate/capitalContractInfo/refund',
      method: 'post',
      data
    })
  },
  /**
   * 获取还款计划列表
   */
  getRepaymentPlanOfEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/getRefundPlanList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增/编辑时的还款计划预览
   */
  getRepaymentPlanPreviewOfEmployerSideContracts(request, data) {
    return request({
      url: '/estate/capitalContractInfo/createRefundPlan',
      method: 'post',
      data
    })
  }
}
