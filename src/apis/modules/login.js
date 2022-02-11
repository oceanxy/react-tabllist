export default {
  login(request, data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },
  logout(request) {
    return request({
      url: '/logout',
      method: 'post'
    })
  }
}
