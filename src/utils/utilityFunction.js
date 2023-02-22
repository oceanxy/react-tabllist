export function generateRoute(menu) {
  const route = {
    meta: {},
    children: []
  }
  const {
    name,
    icon,
    children,
    obj: {
      name: routeName,
      seniorUrl: url,
      redirect,
      extend2,
      component,
      keepAlive,
      requiresAuth,
      hideBreadCrumb,
      hideChildren,
      hide
    }
  } = menu

  route.path = url || ''
  route.meta.title = name
  route.meta.keepAlive = !!keepAlive
  route.meta.requiresAuth = !!requiresAuth
  route.meta.hideBreadCrumb = !!hideBreadCrumb
  route.meta.hideChildren = !!hideChildren
  route.meta.hide = !!hide

  if (name) {
    route.name = routeName
  }

  if (component?.includes('views')) {
    route.component = () => import(`@/views${component.slice(7)}`)
  } else if (component?.includes('layouts')) {
    route.component = () => import(`@/layouts${component.slice(9)}`)
  } else {
    route.component = () => import('@/layouts/components/TGRouterView')
  }

  if (icon) {
    route.meta.icon = () => import('@/layouts/components/TGMenu/assets/images/' + icon + '.svg')
  }

  if (redirect) {
    route.redirect = { name: extend2 }
  }

  if (children?.length) {
    children.forEach(child => {
      route.children.push(generateRoute(child))
    })
  }

  return route
}

/**
 * 连字符转驼峰
 * 例如：my-profile -> myProfile
 * @param name
 * @returns {*}
 */
export function toHump(name) {
  return name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

/**
 * 驼峰转连字符
 * 例如：myProfile -> my-profile
 * @param field
 * @returns {*}
 */
export function toLowerCase(field) {
  return field.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 图片转base64
 * @param file
 * @returns {Promise<unknown>}
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * 首字母大写
 * @param str {string}
 * @returns {string}
 */
export function firstLetterToUppercase(str) {
  return str.replace(/^\S/, s => s.toUpperCase())
}

/**
 * 下载文件
 * @param {*} blob
 * @param {*} fileName
 */
export function downFile(blob, fileName) {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, fileName)
  } else {
    const tmpa = document.createElement('a')

    tmpa.download = fileName
    console.log(blob)
    const urlObj = URL.createObjectURL(blob)

    console.log(urlObj)
    tmpa.href = urlObj
    tmpa.click() // 模拟点击实现下载
    setTimeout(function() {
      // 延时释放
      URL.revokeObjectURL(urlObj)
    }, 1000)
  }
}
