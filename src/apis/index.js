import getService from '@/utils/request'
import config from '@/config'
import router from '@/router'
import store from '@/store'
import { getApisFromFiles } from '@/utils/store'

export default function getApis() {
  // 加载框架内的apis
  const modulesFiles = require.context('./modules', true, /\.js$/)
  // 加载app内的apis
  const dynamicModulesFiles = require.context('../apps', true, /apis\/modules\/[a-zA-Z0-9-]+\.js/)

  const apis = getApisFromFiles(modulesFiles)
  const appApis = getApisFromFiles(dynamicModulesFiles)

  // 动态注入参数
  Object.entries({ ...apis, ...appApis }).forEach(([apiName, api]) => {
    apis[apiName] = parameter => api(getService(config, router, store), parameter)
  })

  return apis
}
