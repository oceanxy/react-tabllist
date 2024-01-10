module.exports = {
  // 当前生效配置的前缀，默认 'index'，代表取 src/config/index.js 作为项目运行的配置文件。
  // 为其他有效值时，则取对应的文件作为项目运行的配置文件。位于 src/apps/子系统/config/index.js 中的 appPrefix 字段值。
  appPrefix: 'rc',
  // 布局组件（src/layouts）默认 TGBackendSystem 组件。后台管理系统
  layout: 'TGBackendSystem',
  // mock数据开关。开发模式下生效
  mock: false,
  // 请求超时时间
  timeout: 30000,
  // mock请求延迟时间
  mockDelay: 400,
  // 路由模式：hash 或者 history 模式，本框架默认 history 模式
  routeMode: 'history',
  // 动态路由（从后台获取权限菜单）
  dynamicRouting: false,
  // 默认首页（登录之后默认跳转的页面 route.name。这仅仅是一个默认值，如果启用了动态路由，优先以后台设置的数据为准）
  defaultRouteName: 'home',
  // 根路由（"/"）的访问权限。默认true，代表根路由需要权限才能访问。注意当后端返回的菜单数据中包含了根路由时，根路由的访问权限以后端返回的为准。
  homePermissions: true,
  // iconfont，为空时自动调用 src/assets/iconfont.js 或各子项目下的 assets/iconfont.js
  iconFontSymbol: '//at.alicdn.com/t/c/font_3996750_sgcx6ewq6y.js',
  /**
   * iconfont菜单图标在 active 状态下的后缀（该后缀会直接加到iconfont图标名称的最后，需在iconfont中预先定义好该图标；
   * - 如果留空则自动根据主题色填充该图标在active状态下的颜色）；
   * - 可根据主题色动态设置选中态的图标，'{themeName}'为当前主题色占位符；
   *   例如：'{themeName}-active'
   */
  activeSuffixForMenuIcon: '-active',
  // 是否启用登录验证码功能
  enableLoginVerification: true,
  // 是否隐藏面包屑
  hideBreadCrumb: false,
  // 启用标签页并缓存页面状态
  enableTabPage: false,
  /**
   * TODO 该配置暂未实现，引用位置：@/components/TGPageTabs
   * 是否把标签页的缓存和路由的缓存（route.meta.keepAlive）进行强关联，依赖 enableTabPage。
   * - true：打开的标签页是否进行缓存取决于 route.meta.keepAlive 的值
   * - false(默认)：打开的标签页必定被缓存
   */
  associateKeepAliveAndTabPage: false,
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
  systemName: '蓝桥后台管理系统快速启动模板',
  systemNameEn: 'vue-template-generator',
  /**
   * 菜单样式配置，可选值：
   * - bordered 边框线 默认边框显示
   * - background 背景颜色
   */
  menuStyle: 'bordered',
  // 主题
  theme: {
    // 是否在header中显示切换主题按钮
    show: true,
    // 默认主题文件名
    default: 'blue',
    // 可用的主题文件 （位于 @/assets/styles/theme）
    availableThemes: [
      { name: '蓝色', fileName: 'tech-blue' }
    ]
  },
  siderLayout: 2, //左侧折叠按钮位置 1:跟随左侧菜单，2：跟随右侧菜单
  // 消息
  news: {
    // 是否在header中显示消息通知
    show: false
  },
  // 网站指引
  guide: {
    // 是否在header中显示网站指引
    show: false
  },
  // 重置密码
  resetPwd: {
    // 是否在header中显示修改密码图标
    show: false
  },
  // 需要在 HTTP Request Header 内携带额外参数的字段名（下拉列表）
  // 注意：本框架会始终在 HTTP Request Header 中携带 token 字段，不受此处配置影响。
  headerParams: {
    // 是否需要在 HTTP Request Header 内携带额外参数
    show: false,
    // src/components/TGHeader 组件对对应下拉列表的占位符提示语
    placeholder: '请选择',
    // 需要在 HTTP Request Header 内携带额外参数的字段名，其值为 src/components/TGHeader 组件内对应下拉列表的值
    fieldName: ''
  },
  // 登录令牌相关设置
  tokenConfig: {
    // 是否额外在接口的请求url中拼接token（为了适配一些奇葩第三方在 POST 方式的 URL 中携带 token 的要求）
    isInUrl: false,
    // 从其他渠道获取登录令牌的字段，它们通常保存于 URL/cookie/localStorage/sessionStorage 等地方。
    fieldName: 'token'
  },
  // 生产模式下网关（接口）相关配置，（应某些特殊需求，用于生产环境的包必须包含一个可配置网关地址的文件）
  // 该配置会在打包时生效，开发环境下不生效。
  prodGateways: {
    // 是否在打包后生成一个配置文件，该文件位于打包目录的根路径下（一般是 dist/）。
    // 该配置会为true时，会将 loadFiles 中使用到的环境变量同步生成到打包后呃配置文件中。
    configurable: false,
    // 打包后生成的配置文件的名称，（默认 env.production.json），目前只支持 json 文件，
    // 文件内用于保存网关地址的字段名同环境变量（.env）中的网关字段名
    filename: 'env.production.json'
  },
  /**
   * @global
   * @typedef LoadFiles
   * @property host {string} - 资源文件的默认host，也可使用 '{环境变量}' 的方式加载指定的环境变量的值
   * @property filePath {string} - 文件地址
   * @property filename {string} - 文件备注
   */
  /**
   * 加载第三方文件
   * @type LoadFiles
   */
  loadFiles: [],
  // 生产模式下是否抽离网关地址（接口地址）成单独的配置文件，位于打包后的根目录（通常是 dist/）下的 env.production.json 文件。
  configurableGateways: false,
  // 全局消息最大显示个数
  maxMessageCount: 1,
  // 是开启水印 在需要加水印APP项目的app.jsx文件混淆全局的watermark
  isWatermark: false,
  // 账号密码加密key
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCs7Iu8OPMKCt38fCWV5PdA7+TA+vxgNFnAiC+9xw8F4JifCKNRg07w3zxbSoUmW7dN3NMubM' +
    'E9hQQizmx7IJk3hn91ieVg+CiYdA9MwpEThezYPsJ6+Oj9RsVPOCAsXa5+XRlc1lbmo7b21n5SVSkbog2OMqB2OlZK+SdwY+vrhQIDAQAB'
}
