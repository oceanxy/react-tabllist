// import TGRouterView from '@/layouts/components/TGRouterView'

// 正常开发时应更新本路由表，与服务端返回的动态路由对应
export default [
  {
    path: 'main/console',
    name: 'console',
    component: () => import('@/apps/main/views/Console'),
    meta: {
      title: '控制台',
      keepAlive: false,
      requiresAuth: true,
      hideBreadCrumb: true,
      icon: () => import('@/assets/images/console.svg')
    }
  }
]
