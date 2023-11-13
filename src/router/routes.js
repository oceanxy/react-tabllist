import config from '@/config'

/**
 * 获取基础路由数据
 * @param [routes] {Array}
 * @param [isToNoAccessPage=false] {boolean} - 当 routes 为假值或者数组长度为空时，是否跳转到无权限页面。
 *  正常情况下，每个应用都有自己的登录页面，在没有权限或路由数据不存在时都应该跳转到登录页面，而不是无权限页面。
 *  但是在第三方携带token跳转到应用的情况下，此时的登录页面仅仅用来实现鉴权相关的功能，并不适合用作为跳转目的地，
 *  此时应将第二个参数设置为 true，让应用跳转到无权限页面，从而避免执行无用的鉴权逻辑。
 * @returns {Route[]}
 */
export default function getBaseRoutes(routes, isToNoAccessPage = false) {
  // 处理参数
  if (typeof arguments[0] === 'boolean') {
    [routes, isToNoAccessPage] = [[], arguments[0]]
  }

  isToNoAccessPage = localStorage.getItem('token') && isToNoAccessPage

  let rootRoutes
  const _config = config
  const homePermissions = typeof config.homePermissions === 'boolean' ? config.homePermissions : true

  if (Array.isArray(routes) && routes.length) {
    const homeIndex = routes.findIndex(route => route.path === '/')

    // 检查路由数据是否包含根路由
    if (homeIndex > -1) {
      rootRoutes = routes
      rootRoutes[homeIndex] = {
        ...routes[homeIndex],
        name: 'home',
        redirect: {
          name: config.dynamicRouting
            ? localStorage.getItem('defaultRoute') || config.defaultRouteName
            : config.defaultRouteName
        },
        meta: {
          ...routes[homeIndex].meta,
          requiresAuth: routes[homeIndex].meta.requiresAuth
        }
      }
    } else {
      // 当 Routes 不包含跟路由时，则直接将该 Routes 视为跟路由的 children
      rootRoutes = [
        {
          path: '/',
          name: 'home',
          component: () => import(`@/layouts/${_config.layout}`),
          redirect: {
            name: config.dynamicRouting
              ? localStorage.getItem('defaultRoute') || config.defaultRouteName
              : config.defaultRouteName
          },
          children: routes,
          meta: {
            title: '后台',
            keepAlive: false,
            requiresAuth: homePermissions,
            // icon: () => import('@/assets/images/console.svg') // svg 图标方式
            icon: '' // icon-font symbol 方式
          }
        }
      ]
    }
  } else {
    // 当未传递 Routes 数据时的默认值
    rootRoutes = [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        redirect: () => {
          if (isToNoAccessPage) {
            return { name: 'noAccess', query: { 'no-link': +isToNoAccessPage } }
          }

          return { name: 'login' }
        },
        meta: {
          title: '后台',
          keepAlive: false,
          requiresAuth: isToNoAccessPage ? false : homePermissions,
          // icon: () => import('@/assets/images/console.svg') // svg 图标方式
          icon: '' // icon-font symbol 方式
        }
      }
    ]
  }

  return [
    {
      path: '/login',
      name: 'login',
      component: () => Promise.resolve(LOGIN_COMPONENT),
      meta: {
        title: '登录',
        keepAlive: false,
        requiresAuth: false
      }
    },
    ...rootRoutes,
    {
      path: '/no-access',
      name: 'noAccess',
      component: () => import('@/views/NoAccess'),
      meta: {
        title: '无访问权限',
        keep: false,
        requiresAuth: false
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('@/views/NotFound'),
      meta: {
        title: '404',
        keep: false,
        requiresAuth: false
      }
    },
    {
      path: '*', // 此处需特别注意至于最底部
      redirect: { name: 'notFound' }
    }
  ]
}
