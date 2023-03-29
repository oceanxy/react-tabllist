/**
 * 主路由的 routes
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-23 周四 10:46:26
 */

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录',
      keepAlive: false,
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    redirect: { name: 'workbench' },
    // 选择布局组件
    component: () => import('@/layouts/TGBackendSystem'),
    meta: {
      title: '后台',
      keepAlive: false,
      requiresAuth: true,
      // icon: () => import('@/assets/images/console.svg') // svg 图标方式
      icon: 'icon-menu-workbench' // icon-font symbol 方式
    },
    children: [
      {
        path: 'workbench',
        name: 'workbench',
        // 选择布局组件
        component: () => import('@/views/Workbench'),
        meta: {
          title: '工作台',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-workbench'
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
