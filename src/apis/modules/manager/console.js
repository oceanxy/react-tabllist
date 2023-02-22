import qs from 'qs'
import { omit } from 'lodash'

export default {
  /**
   * 获取控制台数据集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConsole(request, data) {
    return request({
      url: '/home/getHomeData',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  getOthersData(request, data) {
    let url

    switch (data.othersType) {
      case 2:
        url = '/home/getTrachomaMorbidity'
        break
      case 3:
        url = '/home/getHypertensionMorbidity'
        break
      case 4:
        url = '/home/getLungQualifiedData'
        break
      default:
        url = '/home/getCariesmMorbidity'
        break
    }

    data = omit(data, 'othersType')

    return request({
      url,
      method: 'post',
      data: qs.stringify(data)
    })
  }
}
