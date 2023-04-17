/**
 * 生成路由
 * @param [menu]
 * @returns {{children: *[], meta: {}}}
 */
export function initializeDynamicRoutes(menu) {
  if (!menu) {
    menu = JSON.parse(localStorage.getItem('menu'))[0]
  }

  const route = { meta: {}, children: [] }
  const {
    name,
    icon,
    children,
    obj: {
      name: routeName,
      menuUrl: url,
      redirect,
      redirectRouteName,
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

  if (!component || component === '@/components/TGRouterView') {
    route.component = () => import('@/components/TGRouterView')
  } else {
    if (component.includes('layouts')) {
      route.component = () => import('@/layouts/' + component.slice(10))
    } else if (component.includes('apps')) {
      route.component = () => import('@/apps/' + component.slice(7))
    } else {
      route.component = () => import('@/views/' + component.slice(8))
    }
  }

  if (icon && /\.(svg|png|jpg|jpeg)$/.test(icon)) {
    route.meta.icon = () => import(`@/assets/images/${icon}`)
  } else {
    route.meta.icon = icon
  }

  if (redirect) {
    route.redirect = { name: redirectRouteName }
  }

  if (children?.length) {
    children.forEach(child => {
      route.children.push(initializeDynamicRoutes(child))
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
 * @param {*} blobOrUrl
 * @param {*} fileName
 */
export function downloadFile(blobOrUrl, fileName) {
  if (blobOrUrl instanceof Blob && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blobOrUrl, fileName)
  } else {
    const urlObj = blobOrUrl instanceof Blob ? URL.createObjectURL(blobOrUrl) : blobOrUrl
    const tmp = document.createElement('a')
    const body = document.querySelector('body')

    tmp.style.display = 'none'
    tmp.download = fileName
    tmp.href = urlObj
    body.appendChild(tmp)

    tmp.click() // 模拟点击实现下载
    body.removeChild(tmp)

    setTimeout(function() {
      // 延时释放
      URL.revokeObjectURL(urlObj)
    }, 1000)
  }
}
