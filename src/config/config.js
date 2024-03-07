/**
 * 该配置文件作为基准配置的默认值，所有子项目的配置文件都是基于这个文件做配置合并。
 */

module.exports = {
  // 当前要运行/打包的项目默认值，该值指向各个子项目配置文件的同名字段：src/apps/*/config/index.js 中的 appPrefix 字段值。
  // 执行编译时，会优先读取命令行中的 app-prefix 值，然后才会使用该默认值。
  appPrefix: 'wuyouxing',
  // 打包后生成压缩包的名称（默认为子项目仓库名）
  zipName: '',
  // 要使用的布局组件名，位于 src/layouts。默认 TGBackendSystem 组件，后台管理系统。
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
  // VUE 的 KeepAlive 组件最大缓存数量，当缓存的数量超过该值时，会优先清空最久未被激活的页面，默认值：3
  keepAliveMaxCount: 3,
  // iconfont，为空时自动调用 src/assets/iconfont.js 或各子项目下的 assets/iconfont.js
  iconFontSymbol: '',
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
  // 启用标签页
  enableTabPage: false,
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
  // 页面筛选树配置（如果存在筛选树）
  siderTree: {
    // 是否显示筛选树折叠按钮，当不显示该按钮时，可以通过 store.state.common.treeCollapsed 自定义展开/折叠逻辑。
    showTrigger: true,
    /**
     * 折叠按钮位置。可选值：
     * - inInquiry 在搜索栏内展示，默认
     * - inTree 在树的右侧展示
     */
    togglePosition: 'inInquiry'
  },
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
  /**
   * 生产环境(process.env.NODE_ENV === 'production')是否可配置环境变量，注意：
   * - 该配置开发环境下无效。
   * - 该配置生产环境下运行时有效，编译时无效。
   * @global
   * @typedef ProdEnvVar
   * @property {boolean} configurable - 打包后是否生成一个配置文件，该文件位于打包目录的根路径下（一般是`dist/`）。
   * 注意：该配置值为`true`时，
   * - 会将`loadFiles`中使用到的环境变量同步生成到打包后的配置文件中，不管`prodEnvVar.envVars`中是否配置了该环境变量。
   * - 获取环境变量的方式为`utils/env.js`内的`getEnvVar`方法，该方法可传递一个参数`envName`，默认为`VUE_APP_ENV`。
   *
   * @property {string[]} envVars - 需要同步到打包后的配置文件中的环境变量名，`prodEnvVar.configurable`值为`true`时生效。默认值/固定值（不需要手动配置）：
   * - `VUE_APP_ENV`：生产环境不同阶段的变量。
   * - `loadFiles`中使用到的环境变量。
   *
   * 注意并不是所有配置的环境变量都会生效，注意区分运行时环境变量（生效）和编译时环境变量（不生效）。比如：
   *
   * - `webpack`打包需要的公共资源路径（`VUE_APP_PUBLIC_PATH`）属于编译时环境变量，所以不会生效。
   * - 网关地址前缀/接口地址前缀（`VUE_APP_BASE_API`）属于运行时环境变量，所以会生效。
   *
   * @property {string} filename - 打包后生成的配置文件的名称，默认`.env.production`，注意：文件名命名规范及其内容请遵循 dotenv 规则。
   * 文件内用于保存网关地址的字段名同环境变量文件（`.env.*`）中的网关字段名
   */
  /**
   * 生产环境是否可配置环境变量
   * @type ProdEnvVar
   */
  prodEnvVar: {
    configurable: false,
    envVars: [],
    filename: '.env.production'
  },
  /**
   * 要加载的第三方文件信息
   * @global
   * @typedef LoadFiles
   * @property {string} host - 资源文件的默认host，也可使用 '{环境变量}' 的方式加载指定的环境变量的值
   * @property {string} filePath - 文件地址
   * @property {string} filename - 文件备注
   */
  /**
   * 加载第三方文件集合
   * @type LoadFiles[]
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
