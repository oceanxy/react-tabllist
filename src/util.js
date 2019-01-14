/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 列表/表格 组件 工具类
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2018-12-18 10:00:07
 */

/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element} el DOM元素
 * @param {string} selector 选择器
 * @return {Element} 按照选择器筛选后的元素
 */
export function closest(el, selector) {
  const matchesSelector = el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector

  while(el) {
    if(matchesSelector.call(el, selector)) {
      break
    }
    el = el.parentNode || el.parentElement
  }

  return el
}

/**
 * 设置屏幕滚动区域可见高度
 * @param {object} props props
 * @returns {*} 列表滚动区域可见高度
 */
export function setScrollHeight(props) {
  const {
    property: {
      style: { height },
      list: { header: { show, style } }
    }
  } = props

  // 开启表头
  if(show) {
    return parseInt(height) - parseInt(style.height)
  }
  // 隐藏表头
  return height
}

/**
 * 将用户设置的每一列单元格宽度值解析为组件程序需要的值，同时处理不合法数据
 * @param {string|array|number} width props传入的宽度数据
 * @returns {*} 用于渲染每列单元格的宽度值
 */
export function setColWidth(width) {
  // 处理字符串形式的多列宽度数值
  if(Array.isArray(width)) {
    return width.map(o => (!o ? 'auto' : o))
  }

  // 处理字符串形式的多列宽度数值
  if(typeof width === 'string') {
    if(width.indexOf(',') >= 0) {
      return width.split(',').map(o => {
        if(o.indexOf('px') > -1) {
          return `${parseFloat(o)}px`
        } else if(o.indexOf('%') > -1) {
          return `${parseFloat(o)}%`
        } else if(o * 1) {
          return parseFloat(o)
        }
        return 'auto'
      })
    }
    if(width === 'avg') {
      return new Array(100).fill(1)
    }
  }

  return 'auto'
}
