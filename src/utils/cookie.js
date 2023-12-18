/**
 * 获取cookie
 * @param name {string}
 * @return {undefined|string}
 */
export function getCookie(name) {
  const result = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')

  return result ? result.pop() : undefined
}

/**
 * 设置cookie
 * @param name ｛string｝
 * @param value {*}
 * @param [expireDays] ｛number｝ 过期时长，单位：天
 * @param [path] {string}
 */
export function setCookie(name, value, expireDays, path = '/') {
  let expires = ''

  if (expireDays) {
    const date = new Date()

    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }

  document.cookie = name + '=' + (value || '') + expires + '; path=' + path
}

