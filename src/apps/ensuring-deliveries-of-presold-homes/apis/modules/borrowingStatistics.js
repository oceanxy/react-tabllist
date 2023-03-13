import qs from 'qs'

export default {
  /**
   * 借款统计-三图
   * @param [request]
   * @param data
   * @returns {*}
   */
  getThreeChatList(request, data) {
    return request({
      url: '/estate/build/getThreeChatList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取借款柱状统计图
   * @param [request]
   * @param data
   * @returns {*}
   */
  getColumnarChatList(request, data) {
    return request({
      url: '/estate/build/getColumnarChatList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 统计图可选日期
   * @param request
   * @param data
   * @returns {*}
   */
  getCountDate(request, data) {
    return request({
      url: '/estate/build/getCountDate',
      method: 'post',
      data
    })
  }
}
