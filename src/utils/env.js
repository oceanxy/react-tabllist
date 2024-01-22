import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

/**
 * 获取环境变量
 * 为了适配生产环境下暴露了环境变量的情形下，不能直接使用env环境变量，而要使用打包文件内单独生成的文件内的变量
 * @param envName {string} 环境变量名，默认
 * @return {string}
 */
export function getEnvVar(envName = 'VUE_APP_BASE_API') {
  if (config.prodGateways?.configurable) {
    return localStorage.getItem(`${appName}--${envName}`)
  } else {
    return process.env[envName]
  }
}
