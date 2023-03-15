import qs from 'qs'

export default {
  /**
   * 获取用户关注的数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getListOfUserConcern(request, data) {
    return request({
      url: '/system/home/getUserFocusCardList',
      method: 'post',
      data
    })
  },
  /**
   * 获取用户常用功能列表
   * @param request
   * @param data
   * @returns {*}
   */
  getListOfUsedFunctionsFrequently(request, data) {
    return request({
      url: '/system/home/getCommonFunctionList',
      method: 'post',
      data
    })
  },
  /**
   * 设置常用功能
   * @param request
   * @param data
   * @returns {*}
   */
  updateUsedFunctionsFrequently(request, data) {
    return request({
      url: '/system/home/edit',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 获取常用功能树
   * @param request
   * @param data
   * @returns {*}
   */
  getTreeOfUsedFunctionsFrequently(request, data) {
    return request({
      url: '/system/home/getRoleMenu',
      method: 'post',
      data
    })
  },
  /**
   * 获取待办事项列表
   * @param request
   * @param data
   * @returns {*}
   */
  getTodoOfWorkbench(request, data) {
    return request({
      url: '/system/home/getUserRefundMessageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取审阅信息列表
   * @param request
   * @param data
   * @returns {*}
   */
  getNewsOfWorkbench(request, data) {
    return request({
      url: '/system/home/getUserRefundMessageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
