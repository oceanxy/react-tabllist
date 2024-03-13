/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import './themeFromLess.scss'
import store from '@/store'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'
import { message } from '@/utils/message'

const appName = getFirstLetterOfEachWordOfAppName()

export function reloadTheme() {
  const userTheme = localStorage.getItem(`${appName}-theme`) ||
    store.state?.login?.userInfo?.themeFileName ||
    config.theme.default

  if (userTheme !== window.themeVariables?.themeFileName) {
    window.location.reload() // to switch theme
  }
}

export function loadStyle(url) {
  const link = document.createElement('link')

  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url

  const head = document.getElementsByTagName('head')[0]

  head.appendChild(link)
}

export function loadScript(url, callback) {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src = url

  if (typeof callback === 'function') {
    script.onload = callback
  }

  script.onerror = e => {
    message(false, e.message)
  }

  document.body.appendChild(script)
}

export function loadVariablesStyle(config, store) {
  if (process.env.NODE_ENV !== 'production') {
    let _theme = localStorage.getItem(`${appName}-theme`)

    if (!_theme) {
      _theme = config.theme.default
      localStorage.setItem(`${appName}-theme`, _theme)
    }

    // 加载主题
    const theme = store?.state?.login?.userInfo?.themeFileName || _theme

    try {
      window.themeVariables = require(`./themes/${theme}/index.less`)
    } catch (e) {
      window.themeVariables = require(`./themes/${config.theme.default}/index.less`)
    }
  }
}
