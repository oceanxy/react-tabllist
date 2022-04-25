// for example
// 1. 最终会在所有的 URL 前自动拼接 process.env.VUE_APP_BASE_API 变量
// 2. 对应 mock 内同名的 URL。当 mock 内存在相同的 URL 时，该接口会被 mock 拦截

import qs from 'qs'

export default {
  getMap(request, data) {
    return request({
      url: '/getMap',
      method: 'post',
      data: data
    })
  }
}
