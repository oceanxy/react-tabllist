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

const constRoutes = getBaseRoutes()
const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(VueRouter)

/**
 * 根据后台数据生成路由
 * @param [menu]
 * @returns {{children: *[], meta: {}}}
 */
function initializeDynamicRoutes(menu) {
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
 * 立即创建一个路由器
 * @param [rootRoute] {Route} 根路由
 * @returns {VueRouter}
 */
function createRouter(rootRoute) {
  return new VueRouter({
    routes: rootRoute || constRoutes,
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: 'history'
  })
}

/**
 * 获取当前项目下所有可用的子项目的路由表
 * @returns {VueRouter.route[]}
 */
function getRoutes() {
  if (config.dynamicRouting) {
    return getBaseRoutes(initializeDynamicRoutes())
  } else {
    return getBaseRoutes(APP_ROUTES.default)
  }
}

/**
 * 重置路由
 */
function resetRoutes() {
  const menus = getRoutes()

  router.matcher = createRouter(menus).matcher
  router.options.routes = menus
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

router.resetRoutes = resetRoutes

export {
  createRouter,
  getRoutes,
  initializeDynamicRoutes,
  resetRoutes
}

export default router
