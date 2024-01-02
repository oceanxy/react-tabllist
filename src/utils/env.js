import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

const appName = getFirstLetterOfEachWordOfAppName()

export function getBaseApi() {
  if (ENV_PRODUCTION) {
    return localStorage.getItem(`${appName}-baseApi`)
  } else {
    return process.env.VUE_APP_BASE_API
  }
}
