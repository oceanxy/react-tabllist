export default function getBaseRoutes(config) {
  return [
    {
      path: '/login',
      name: 'login',
      component: () => {
        const _config = config

        if (config.appName) {
          return import(`@/apps/${_config.appName}/views/Login`)
        } else {
          return import('@/views/Login')
        }
      },
      meta: {
        title: '登录',
        keepAlive: false,
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      redirect: { name: config.defaultRouteName },
      // 选择布局组件
      component: () => import('@/layouts/TGBackendSystem'),
      meta: {
        title: '后台',
        keepAlive: false,
        requiresAuth: true,
        // icon: () => import('@/assets/images/console.svg') // svg 图标方式
        icon: '' // icon-font symbol 方式
      },
      children: [
        {
          path: '',
          name: config.defaultRouteName,
          // 选择布局组件
          component: () => import('@/views/Home'),
          meta: {
            title: '首页',
            keepAlive: false,
            requiresAuth: true,
            icon: ''
          }
        }
      ]
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
