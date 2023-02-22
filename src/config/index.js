export default {
  // mock数据开关。开发模式下生效
  mock: false,
  // 请求超时时间
  timeout: 30000,
  // mock请求延迟时间
  mockDelay: 400,
  // 动态路由（从后台获取权限菜单）
  dynamicRouting: false,
  // 系统名称
  systemName: '中小学校学生健康体检系统',
  systemNameEn: '',
  // 全局消息最大显示个数
  maxMessageCount: 1,
  // 账号密码加密key（后台）
  publicKey:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCs7Iu8OPMKCt38fCWV5PdA7+TA+vxgNFnAiC+9xw8F4JifCKNRg07w3zxbSoUmW7dN3NMubM' +
    'E9hQQizmx7IJk3hn91ieVg+CiYdA9MwpEThezYPsJ6+Oj9RsVPOCAsXa5+XRlc1lbmo7b21n5SVSkbog2OMqB2OlZK+SdwY+vrhQIDAQAB',
  // 账号密码加密key(前台)
  publicKeyClient:
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCA7uaadgelrfRQ+C46s2OCvmQTRp2Y9IKbaWYzm9jFCUaeVQCp7mjZFyId9P0uqgHPKbR' +
    'nV/Uqra9ciglAsio4rwBvSiNeombxcPgR8IEPyo0NU0NsG/EVAMe5zHLE3RdvoX2w1Ph9aSHxZqsVigE1SMrRA4xR776bO/tvcIGtzwIDAQAB'
}
