/**
 * 样式变量（可导出供 *.js 使用）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-03-31 周五 10:09:08
 */

import variablesScss from './themeFromLess.scss'
import config from '@/config'

const { fileName } = config.theme
const variablesLess = require(`./themes/${fileName}`)

// 导出变量
export default {
  variablesScss,
  variablesLess
}
