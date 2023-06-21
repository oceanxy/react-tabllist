import config from '@/config'

/**
 *
 * @param [routes] {Array}
 * @returns {Route[]}
 */
export default function getBaseRoutes(routes) {
  let rootRoutes
  const _config = config

  if (Array.isArray(routes) && routes.length) {
    const homeIndex = routes.findIndex(route => route.path === '/')

    // 检查路由数据是否包含根路由
    if (homeIndex > -1) {
      rootRoutes = routes
      rootRoutes[homeIndex] = {
        ...routes[homeIndex],
        name: 'home',
        redirect: { name: localStorage.getItem('defaultRoute') },
        meta: {
          ...routes[homeIndex].meta,
          requiresAuth: config.homePermissions || routes[homeIndex].meta.requiresAuth
        }
      }
    } else {
      rootRoutes = [
        {
          path: '/',
          name: 'home',
          component: () => import(`@/layouts/${_config.layout}`),
          redirect: { name: config.defaultRouteName },
          children: routes,
          meta: {
            title: '后台',
            keepAlive: false,
            requiresAuth: config.homePermissions,
            // icon: () => import('@/assets/images/console.svg') // svg 图标方式
            icon: '' // icon-font symbol 方式
          }
        }
      ]
    }
  } else {
    rootRoutes = [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '后台',
          keepAlive: false,
          requiresAuth: config.homePermissions,
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
