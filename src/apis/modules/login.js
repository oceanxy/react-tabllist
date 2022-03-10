import qs from 'qs'

export default {
  login(request, data) {
    return request({
      url: '/auth/passport/login',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  logout(request) {
    return request({
      url: '/auth/passport/logout',
      method: 'post'
    })
  }
}
