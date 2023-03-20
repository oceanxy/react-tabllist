import qs from 'qs'

export default {
  /**
   * 获取预告记录分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAdvanceRegistration(request, data) {
    return request({
      url: '/estate/foretell/getNetSignPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增预告登记
   * @param request
   * @param data
   * @returns {*}
   */
  addAdvanceRegistration(request, data) {
    return request({
      url: '/estate/foretell/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改预告登记
   * @param request
   * @param data
   * @returns {*}
   */
  updateAdvanceRegistration(request, data) {
    return request({
      url: '/estate/foretell/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除预告登记
   * @param request
   * @param data
   * @returns {*}
   */
  deleteAdvanceRegistration(request, data) {
    return request({
      url: '/estate/foretell/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },

  /**
   * 导出预告登记数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportAdvanceRegistration(request, params) {
    return request({
      url: '/estate/foretell/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改预告登记状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateAdvanceRegistrationStatus(request, data) {
    return request({
      url: '/estate/foretell/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 解除签约
   * @param request
   * @param data
   * @returns {*}
   */
  rescindContract(request, data) {
    return request({
      url: '/estate/foretell/rescindContract',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 查询资产性质类型集合
   * @param request
   * @param data
   * @returns {*}
   */
  getEstateType(request, data) {
    return request({
      url: '/estate/dictionary/getEstateType',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据资产名称检索资产
   * @param request
   * @param data
   * @returns {*}
   */
  getEstateListByName(request, data) {
    return request({
      url: '/estate/estate/getEstateListByName',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 上传导入文件
   * @param [request]
   * @param formData
   * @returns {*}
   */

  foretellImportFile(request, formData) {
    return request({
      url: '/estate/foretell/importFile',
      method: 'post',
      data: formData
    })
  },

  /**
   * 导入成功数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  foretellImportSuccessData(request, data) {
    return request({
      url: '/estate/foretell/importSuccessData',
      method: 'post',
      data
    })
  },

  /**
   * 下载失败数据
   * @param request
   * @param params
   * @returns {*}
   */
  foretellDownFailExcel(request, params) {
    return request({
      url: '/estate/foretell/downFailExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },

  /**
   * 获取导入模板
   * @param request
   * @param data
   * @returns {*}
   */
  foretellGetTemplateUrl(request, data) {
    return request({
      url: '/estate/netSign/getTemplateUrl',
      method: 'post',
      data
    })
  }
}
