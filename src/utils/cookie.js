/**
 * 获取cookie
 * @param cookieName
 * @return {undefined|string}
 */
export function getCookie(cookieName) {
  const strCookie = document.cookie
  const cookieList = strCookie.split(';')

  for (let i = 0; i < cookieList.length; i++) {
    const arr = cookieList[i].split('=')

    if (cookieName === arr[0].trim()) {
      return arr[1]
    }
  }

  return undefined
}
