import qs from 'qs'

export default {
  /**
   * 获取活动下拉列表
   * @param [request]
   * @returns {*}
   */
  getActivitiesForSelect(request) {
    return request({
      url: '/examine/examineBloodPressure/getActivityList',
      method: 'post'
    })
  },
  /**
   * 获取统计分析活动列表
   * itemType  统计类型(1:身高体重/派生指数，2：血压，3：视力，4：肺活量，5龋齿 6疾病 7营养状况) 必传
   * @param request
   * @param data
   * @returns {*}
   */
  getActivitiesForStatisticsAnalysis(request, data) {
    return request({
      url: '/examine/examineStatistics/getNumInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取活动学年集合
   * @param request
   * @returns {*}
   */
  getSchoolYearsOfActivity(request) {
    return request({
      url: '/examine/examineActivity/getYearList',
      method: 'post'
    })
  },
  /**
   * 根据学年获取活动集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivitiesBySchoolYear(request, data) {
    return request({
      url: '/examine/examineActivity/getExamineActivityListByYear',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
