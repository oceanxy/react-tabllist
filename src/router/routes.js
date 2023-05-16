export default function getBaseRoutes(config) {
  return [
    {
      path: '/login',
      name: 'login',
      component: () => {
        let componentPath

        /* 在所有可用的子仓库里循环查找登录组件，找到第一个可用的组件则终止循环，如果未找到则使用 src/views/Login*/

        const loginFiles = require.context('@/apps', true, /views\/Login\/index\.jsx$/)

        for (const filepath of loginFiles.keys()) {
          const loginComponent = loginFiles(filepath).default

          if (loginComponent) {
            componentPath = filepath
            break
          }
        }

        if (componentPath) {
          return import(`@/apps${componentPath.substring(1)}`)
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
      component: () => import(`@/layouts/${config.layout}`),
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
