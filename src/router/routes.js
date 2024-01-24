import config from '@/config'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

const appName = getFirstLetterOfEachWordOfAppName()

/**
 * 获取基础路由数据
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
            ? localStorage.getItem(`${appName}-defaultRoute`) || config.defaultRouteName
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
          component: resolve => require.ensure(
            [],
            () => resolve(require('@/layouts/' + _config.layout)),
            'chunk-home'
          ),
          redirect: {
            name: config.dynamicRouting
              ? localStorage.getItem(`${appName}-defaultRoute`) || config.defaultRouteName
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
        redirect: () => {
          // 登录状态下无可用菜单跳转到无权限页面
          if (localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)) {
            return { name: 'noAccess', query: { 'no-link': 1 } }
          }

          // 未登录状态下跳转到登录页
          return { name: 'login' }
        },
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
      component: resolve => require.ensure(
        [],
        () => resolve(require('@/views/NoAccess')),
        'chunk-no-access'
      ),
      meta: {
        title: '无访问权限',
        keep: false,
        requiresAuth: false
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: resolve => require.ensure(
        [],
        () => resolve(require('@/views/NotFound')),
        'chunk-not-found'
      ),
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
