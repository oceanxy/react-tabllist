/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import './themeFromLess.scss'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import { join, resolve } from 'path'

const { NODE_ENV, VUE_APP_PUBLIC_PATH } = process.env
const appName = getFirstLetterOfEachWordOfAppName()

function loadStyle(url) {
  const link = document.createElement('link')

  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url

  document.head.appendChild(link)
}

function loadScript(url) {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src = url

  document.head.appendChild(script)
}

/**
 * 加载主题（生产环境和开发环境因为webpack打包机制的不同，采用不同的方式实现）
 * @param config
 * @param store
 */
export default function loadVariablesStyle(config, store) {
  const theme = store?.state?.login?.userInfo?.themeFileName ||
    localStorage.getItem(`${appName}-theme`) ||
    config.theme.default

  if (NODE_ENV !== 'production') {
    window.themeVariables = require(`./themes/${theme}/index.less`)
  } else {
    fetch(resolve(join(__dirname, VUE_APP_PUBLIC_PATH, '/manifest.json')))
      .then(response => response.json())
      .then(async data => {
        const theme = localStorage.getItem(`${appName}-theme`) || config.theme.default

        loadStyle(resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${theme}.css`]}`)))
        loadScript(resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${theme}.js`]}`)))
      })
  }
}
