export default {
  // mock数据开关。开发模式下生效
  mock: false,
  // 请求超时时间
  timeout: 30000,
  // mock请求延迟时间
  mockDelay: 400,
  // 动态路由（从后台获取权限菜单）
  dynamicRouting: false,
  // iconfont
  iconFontSymbol: '//at.alicdn.com/t/c/font_3919835_h8szzvuloe9.js',
  // 面包屑分隔符，如：首页 / 首页
  breadCrumbSeparator: '/',
  // 统一上传地址
  uploadPath: '/mgapi/system/upload/upload',
  // 文件上传地址
  fileUploadPath: '/mgapi/system/upload/fileUpload',
  // 图片上传地址
  imageUploadPath: '/mgapi/system/upload/imageUpload',
  // 系统名称
  systemName: '新的社会阶层专业人士联合会',
  systemNameEn: '',
  // 主题
  theme: {
    // 是否在header中显示切换主题按钮
    show: true,
    // 主题文件名（位于 @/assets/styles/theme）
    fileName: 'xzl.less'
  },
  // 消息
  news: {
    // 是否在header中显示消息通知
    show: false
  },
  // 全局消息最大显示个数
  maxMessageCount: 1,
  // 账号密码加密key
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCs7Iu8OPMKCt38fCWV5PdA7+TA+vxgNFnAiC+9xw8F4JifCKNRg07w3zxbSoUmW7dN3NMubM' +
    'E9hQQizmx7IJk3hn91ieVg+CiYdA9MwpEThezYPsJ6+Oj9RsVPOCAsXa5+XRlc1lbmo7b21n5SVSkbog2OMqB2OlZK+SdwY+vrhQIDAQAB'
}
