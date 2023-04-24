module.exports = {
  // 当前生效配置的前缀，默认 'index'，代表取 src/config/index.js 作为项目运行的配置文件。
  // 为其他有效值时，则取对应的文件作为项目运行的配置文件。位于 src/apps/子系统/config/index.js 中的 appPrefix 字段值。
  appPrefix: 'xzl',
  // mock数据开关。开发模式下生效
  mock: false,
  // 请求超时时间
  timeout: 30000,
  // mock请求延迟时间
  mockDelay: 400,
  // 动态路由（从后台获取权限菜单）
  dynamicRouting: false,
  // iconfont
  iconFontSymbol: '//at.alicdn.com/t/c/font_3996750_sgcx6ewq6y.js',
  // iconfont菜单图标在 active 状态下的后缀（该后缀会直接加到iconfont图标名称的最后，需在iconfont中预先定义好该图标；
  // 如果留空则自动根据主题色填充该图标在active状态下的颜色）
  activeSuffixForMenuIcon: '-active',
  // 面包屑分隔符，如：首页 / 首页
  breadCrumbSeparator: '/',
  // 统一上传地址
  uploadPath: '/mgapi/system/upload/upload',
  // 文件上传地址
  fileUploadPath: '/mgapi/system/upload/fileUpload',
  // 图片上传地址
  imageUploadPath: '/mgapi/system/upload/imageUpload',
  // 视频上传地址
  videoUploadPath: '/mgapi/system/upload/videoUpload',
  // 系统名称
  systemName: '蓝桥后台管理系统快速启动模版',
  systemNameEn: 'vue-template-generator',
  // 主题
  theme: {
    // 是否在header中显示切换主题按钮
    show: true,
    // 主题文件名（位于 @/assets/styles/theme）
    fileName: 'blue.less'
  },
  // 消息
  news: {
    // 是否在header中显示消息通知
    show: false
  },
  // 需要在 header 内传递的参数（下拉列表）
  headerParams: {
    show: true,
    fieldName: 'organId'
  },
  // 全局消息最大显示个数
  maxMessageCount: 1,
  // 账号密码加密key
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCs7Iu8OPMKCt38fCWV5PdA7+TA+vxgNFnAiC+9xw8F4JifCKNRg07w3zxbSoUmW7dN3NMubM' +
    'E9hQQizmx7IJk3hn91ieVg+CiYdA9MwpEThezYPsJ6+Oj9RsVPOCAsXa5+XRlc1lbmo7b21n5SVSkbog2OMqB2OlZK+SdwY+vrhQIDAQAB'
}