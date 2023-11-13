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
import { message } from 'ant-design-vue'

const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to, null, () => {/**/})
}

VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to, null, () => {/**/})
}

Vue.use(VueRouter)

/**
 * 根据后台数据生成路由
 * @param [menus] {Array} 用来生成菜单的数据
 * @returns {Object[]}
 */
function initializeDynamicRoutes(menus) {
  return menus?.map(menu => {
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
      if (component.includes('@/')) {
        if (component.includes('layouts')) {
          route.component = () => import('@/layouts/' + component.slice(10))
        } else if (component.includes('apps')) {
          route.component = () => import('@/apps/' + component.slice(7))
        } else {
          route.component = () => import('@/views/' + component.slice(8))
        }
      } else {
        route.component = () => {
          let target = '_blank'
          const defaultRoute = localStorage.getItem('defaultRoute') || config.defaultRouteName

          // 检测系统的默认首页是否是需要通过 window.open 跳转，并且是否是从登录页直接跳转的，
          // 如果以上条件成立，则采用 “_self” 模式，否则采用 “_blank” 模式
          if (router.history.current.name === 'login' && defaultRoute === route.name) {
            target = '_self'
          }

          if (process.env.NODE_ENV !== 'production') {
            const token = localStorage.getItem('token')

            window.open(`http://localhost:8193${component}/?token=${token}`, target)
          } else {
            window.open(component, target)
          }
        }
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
      route.children = initializeDynamicRoutes(children)
    }

    return route
  }) ?? []
}

/**
 * 从用户信息映射文件选取菜单数据
 * @param menus ｛VueRoute[]｝ - 从用户信息映射来的菜单数据，数据类型为vue-router的路由格式
 * @param routes ｛VueRoute[]｝ - 本项目的路由文件
 * @return {*[]}
 */
function selectDynamicRoutes(menus, routes) {
  if (routes.length) {
    const _routes = []

    routes?.forEach(route => {
      const _menu = menus.find(menu => menu.meta.title === route.meta.title && menu.path === route.path)

      if (_menu) {
        if (_menu?.children?.length && route?.children?.length) {
          route.children = selectDynamicRoutes(_menu.children, route.children)
        }

        if (!_menu?.children?.length && route?.children?.length) {
          route.children = []
        }

        if (_menu?.children?.length && !route?.children?.length) {
          console.warn(`未找到ID为${_menu.id}的菜单数据，请确认后台返回的菜单数据是否与前端路由文件匹配！`)
        }

        _routes.push(route)
      }
    })

    return _routes
  } else {
    message.error('未获取到动态菜单数据，请重新登录以完成菜单初始化')
    throw new Error('未获取到动态菜单数据，请重新登录以完成菜单初始化')
  }
}

/**
 * 立即创建一个路由器
 * @param [rootRoute] {Route} 根路由
 * @returns {VueRouter}
 */
function createRouter(rootRoute) {
  return new VueRouter({
    routes: rootRoute || getRoutes(),
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: config.routeMode === 'history' ? 'history' : 'hash'
  })
}

/**
 * 获取当前项目下所有可用的子项目的路由表
 * @returns {VueRouter.route[]}
 */
function getRoutes() {
  const { NODE_ENV, VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS } = process.env

  // 本地开发环境跳过权限直接获取本地路由
  if (NODE_ENV === 'development' && VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS === 'on') {
    return getBaseRoutes(APP_ROUTES.default)
  }

  // 开启动态路由，且已登录，获取路由
  if (config.dynamicRouting && localStorage.getItem('token')) {
    const menu = JSON.parse(localStorage.getItem('menu'))

    if (menu) {
      if (USER_INFO_MAPPINGS) {
        return getBaseRoutes(selectDynamicRoutes(menu, APP_ROUTES?.default))
      }

      return getBaseRoutes(initializeDynamicRoutes(menu))
    }

    message.error('未获取到菜单信息，稍后请刷新重试！', 0)

    return getBaseRoutes()
  } else {
    if (!config.dynamicRouting && APP_ROUTES?.default) {
      return getBaseRoutes(APP_ROUTES.default)
    }

    return getBaseRoutes(true)
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
  if (to.query.title) {
    to.meta.title = decodeURIComponent(to.query.title)
  }

  let title = to.meta.title || ''

  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  // 非生产环境通过地址栏传递token的情况，优先使用地址栏的token。因为本地存储的token可能为过期token（上一次页面关闭时未清空的）
  // if (process.env.NODE_ENV !== 'production' && to.query.token) {
  //   localStorage.setItem('token', to.query.token)
  // }

  // 判断该路由是否需要登录权限
  // 获取存储在localStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = localStorage.getItem('token')

  if (
    to.meta.requiresAuth &&
    // 生产环境开启跳过权限验证
    !(
      process.env.NODE_ENV === 'development' &&
      process.env.VUE_APP_DEVELOPMENT_ENVIRONMENT_SKIPPING_PERMISSIONS === 'on'
    )
  ) {
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

export { resetRoutes }

export default router
