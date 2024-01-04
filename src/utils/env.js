import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

export function getBaseApi() {
  if (config.prodGateways?.configuration) {
    return localStorage.getItem(`${appName}-baseApi`)
  } else {
    return process.env.VUE_APP_BASE_API
  }
}
