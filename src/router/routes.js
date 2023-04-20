/**
 * 主路由的 routes
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-02-23 周四 10:46:26
 */
import _conf from '@/config/config'

const appConfigFiles = require.context('../apps', true, /config\/index.js/)
let appName = ''

for (const item of appConfigFiles.keys()) {
  // 如果子系统不存在配置文件，则取 ''，
  // 如果多个子系统的config中都存在相同值的appPrefix字段，则取最先遍历到的项
  if (_conf.appPrefix === appConfigFiles(item).appPrefix) {
    appName = item.split('/')[1]
    break
  }
}

export default [
  {
    path: '/login',
    name: 'login',
    component: () => {
      if (_conf.appPrefix !== 'index' && appName) {
        return import((`@/apps/${appName}/views/Login`))
      }

      return import('@/views/Login')
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
