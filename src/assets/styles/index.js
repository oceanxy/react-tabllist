/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import variablesScss from './themeFromLess.scss'

export default function getVariablesStyle(config, store) {
  // 加载主题
  const { fileName } = config.theme
  const theme = localStorage.getItem('theme') || store?.state?.login?.userInfo?.themeFileName || fileName
  let less

  try {
    less = require(`./themes/${theme}`)
  } catch (e) {
    less = require('./themes/blue.less') // 默认值
  }

  return {
    scss: variablesScss,
    less
  }
}
