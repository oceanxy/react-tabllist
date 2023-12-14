/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import './themeFromLess.scss'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

const appName = getFirstLetterOfEachWordOfAppName()

export default function getVariablesStyle(config, store) {
  let _theme = localStorage.getItem(`${appName}-theme`)

  if (!_theme) {
    _theme = config.theme.default
    localStorage.setItem(`${appName}-theme`, _theme)
  }

  // 加载主题
  const theme = store?.state?.login?.userInfo?.themeFileName || _theme

  if (process.env.NODE_ENV !== 'production') {
    try {
      window.themeVariables = require(`./themes/${theme}/index.less`)
    } catch (e) {
      window.themeVariables = require(`./themes/${config.theme.default}/index.less`)
    }
  }
}
