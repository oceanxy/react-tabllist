export default {
  '/login': {
    status: true,
    code: 10000,
    message: '',
    data: {
      token: 'develop token',
      userInfo: {
        username: '@cname',
        id: '@guid'
      }
    }
  },
  '/logout': {
    status: true,
    code: 10000,
    message: '',
    data: {}
  }
}
