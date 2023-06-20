/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import variablesScss from './themeFromLess.scss'

export default function getVariablesStyle(config, store) {
  let _theme = localStorage.getItem('theme')

  if (!_theme) {
    _theme = config.theme.default
    localStorage.setItem('theme', _theme)
  }

  // 加载主题
  const theme = store?.state?.login?.userInfo?.themeFileName || _theme
  // const less = require(`./themes/${theme}`)
  const less = require('./themes/blue.less')

  return {
    scss: variablesScss,
    less
  }
}
