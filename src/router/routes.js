import config from '@/config'

/**
 *
 * @param [routes] {Array}
 * @returns {Route[]}
 */
export default function getBaseRoutes(routes) {
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
