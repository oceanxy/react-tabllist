// import TGRouterView from '@/layouts/components/TGRouterView'

// 正常开发时应更新本路由表，与服务端返回的动态路由对应
export default [
  {
    path: 'edph/home',
    name: 'home',
    component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/Home'),
    meta: {
      title: '保交楼首页',
      keepAlive: false,
      requiresAuth: true,
      hideBreadCrumb: true,
      icon: () => import('@/assets/images/console.svg')
    }
  }
]
