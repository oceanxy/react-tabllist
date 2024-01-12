export const detectZoom = () => {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  // 只对 windows 系统做缩放处理
  if (!ua.includes('windows')) {
    return 100
  }

  if (window.devicePixelRatio) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth && window.innerWidth) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }

  return ratio
}
