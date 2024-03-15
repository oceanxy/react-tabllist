/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import './themeFromLess.scss'
import store from '@/store'
import config from '@/config'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import { message } from '@/utils/message'
import { join, resolve } from 'path'

const appName = getFirstLetterOfEachWordOfAppName()
const { VUE_APP_PUBLIC_PATH } = process.env

/**
 * 开发环境载入主题
 */
export function loadDevEnvTheme() {
  if (process.env.NODE_ENV !== 'production') {
    let _theme = localStorage.getItem(`${appName}-theme`)

    if (!_theme) {
      _theme = config.header.buttons.theme.default
      localStorage.setItem(`${appName}-theme`, _theme)
    }

    // 加载主题
    const theme = store?.state?.login?.userInfo?.themeFileName || _theme

    try {
      window.themeVariables = require(`./themes/${theme}/index.less`)
    } catch (e) {
      window.themeVariables = require(`./themes/${config.header.buttons.theme.default}/index.less`)
    }

    document
      .querySelector(':root')
      .setAttribute('class', window.themeVariables.themeFileName)
  }
}

/**
 * 生产环境加载主题
 */
export function fetchProdEnvTheme() {
  if (process.env.NODE_ENV === 'production') {
    const userTheme = localStorage.getItem(`${appName}-theme`) ||
      store?.state?.login?.userInfo?.themeFileName ||
      config.header.buttons.theme.default

    fetch(resolve(join(__dirname, VUE_APP_PUBLIC_PATH, '/manifest.json')))
      .then(response => response.json())
      .then(async data => {
        loadStyle(resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${userTheme}.css`]}`)))
        loadScript(
          resolve(join(__dirname, `${VUE_APP_PUBLIC_PATH}/${data[`${userTheme}.js`]}`)),
          () => {
            document
              .querySelector(':root')
              .setAttribute('class', window.themeVariables.themeFileName)
          }
        )
      })
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
