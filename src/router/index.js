/**
 * 总路由器
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-22 周三 18:21:06
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import getBaseRoutes from './routes'
import config from '@/config'
import { getRoutes } from '@/utils/utilityFunction'

const constRoutes = getBaseRoutes(config)
const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(VueRouter)

/**
 * 立即创建一个路由器
 * @param [routes] {Object<Route>[] | Object<Route>} 路由数组或一个包含子路由的根路由
 * @returns {VueRouter}
 */
function createRouter(routes) {
  const homeRoutesIndex = constRoutes.findIndex(route => route.path === '/')
  const newRoutes = [...constRoutes]

  // 动态路由
  if (config.dynamicRouting && routes) {
    if (Array.isArray(routes)) {
      newRoutes[homeRoutesIndex].children = routes
    } else {
      constRoutes.splice(homeRoutesIndex, 1, routes)
    }
  } else {
    newRoutes[homeRoutesIndex].children = getRoutes()
  }

  return new VueRouter({
    routes: constRoutes,
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: 'history'
  })
}

// 创建路由器
const router = createRouter()

router.createRouter = createRouter

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
