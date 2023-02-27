/**
 * 总路由器
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-22 周三 18:21:06
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import constRoutes from './routes'
import config from '@/config'

Vue.use(VueRouter)

export { constRoutes }

/**
 * 立即创建一个路由器
 * @param [routes] {Object<Route>[] | Object<Route>} 路由数组或一个包含子路由的根路由
 * @returns {VueRouter}
 */
export function createRouter(routes) {
  const homeRoutesIndex = constRoutes.findIndex(route => route.path === '/')

  // 动态路由
  if (config.dynamicRouting && routes) {
    if (Array.isArray(routes)) {
      constRoutes[homeRoutesIndex].children = constRoutes[homeRoutesIndex].children.concat(routes)
    } else {
      constRoutes.splice(homeRoutesIndex, 1, routes)
    }
  } else {
    // TODO 这里要获取所有子项目的路由，或者从启动命令参数获取指定项目的路由
    const mainRoutes = require('../apps/main/router/routes')
    const edphRouter = require('../apps/ensuring-deliveries-of-presold-homes/router/routes')
    const appRoutes = [...new Set([...(mainRoutes.default), ...(edphRouter.default)])]

    constRoutes[homeRoutesIndex].children = constRoutes[homeRoutesIndex].children.concat(appRoutes)
  }

  return new VueRouter({
    routes: constRoutes,
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: 'history'
  })
}

// 创建路由器
const router = createRouter()

router.beforeEach((to, from, next) => {
  let title = to.meta.title || ''

  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  // 判断该路由是否需要登录权限
  // 获取存储在localStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }
  } else {
    if (to.name === 'login' && token) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
