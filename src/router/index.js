import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
import TGRouterView from '@/layouts/components/TGRouterView'

Vue.use(VueRouter)

/**
 * 路由
 */
export const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'@/views/Login'),
    meta: {
      title: '登录',
      keepAlive: false,
      requiresAuth: false
    }
  },
  {
    path: '/',
    // 选择布局组件
    // component: () => import('@/layouts/TGVisualScreenLayout'),
    component: () => import('@/layouts/TGBackendSystemLayout'),
    meta: {
      title: '首页',
      keepAlive: true,
      requiresAuth: true
    },
    children: [
      // 所有路由在这里面添加
      {
        path: '',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true,
          requiresAuth: true
        }
      },
      {
        path: 'site',
        name: 'site',
        component: TGRouterView,
        meta: {
          title: '站点管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'apps' },
        children: [
          {
            path: 'apps',
            name: 'apps',
            component: () => import('@/views/sites/Apps'),
            meta: {
              title: '站点列表',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'module',
        component: TGRouterView,
        meta: {
          title: '功能模块管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'modules' },
        children: [
          {
            path: 'modules',
            name: 'modules',
            component: () => import('@/views/FunctionalModules'),
            meta: {
              title: '功能模块列表',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'page',
        component: TGRouterView,
        meta: {
          title: '页面管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'pages' },
        children: [
          {
            path: 'pages',
            name: 'pages',
            component: () => import('@/views/Pages'),
            meta: {
              title: '页面列表',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'event',
        component: TGRouterView,
        meta: {
          title: '事件管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'events' },
        children: [
          {
            path: 'events',
            name: 'events',
            component: () => import('@/views/Events'),
            meta: {
              title: '事件列表',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'tag',
        name: 'tag',
        component: TGRouterView,
        meta: {
          title: '业务标签管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'categories' },
        children: [
          {
            path: 'categories',
            name: 'categories',
            component: () => import('@/views/Tags/Categories'),
            meta: {
              title: '标签分类',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'system',
        name: 'system',
        component: TGRouterView,
        meta: {
          title: '系统管理',
          keepAlive: true,
          requiresAuth: true
        },
        redirect: { name: 'menus' },
        children: [
          {
            path: 'menus',
            name: 'menus',
            component: () => import('@/views/system/Menus'),
            meta: {
              title: '菜单管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/system/Roles'),
            meta: {
              title: '角色管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'users',
            name: 'users',
            component: () => import('@/views/system/Users'),
            meta: {
              title: '用户管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'departments',
            name: 'departments',
            component: () => import('@/views/system/Departments'),
            meta: {
              title: '部门管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'dictionaries',
            name: 'dictionaries',
            component: () => import('@/views/system/Dictionaries'),
            meta: {
              title: '字典管理',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'comp',
        component: () => import('@/views/CommonComponentsDirectory'),
        name: 'comp',
        meta: {
          title: '共用组件目录',
          keepAlive: true,
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound'),
    meta: {
      title: '404',
      keep: false,
      requiresAuth: false
    }
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404'
  }
]

/* ======生成用于菜单显示的路由，根据 routes 生成========= */
const filterRoutes = routes.filter(route => route.path === '/')
const rootRoute = {
  ...filterRoutes[0],
  children: null
}

export const menuRoutes = filterRoutes[0].children.reduce((menuRoutes, route) => {
  if (!route.path) {
    menuRoutes.push(rootRoute)
  } else {
    menuRoutes.push(route)
  }

  return menuRoutes
}, [])
/* ==================================================== */

const router = new VueRouter({
  routes,
  base: process.env.VUE_APP_PUBLIC_PATH,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title || ''
  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  // 判断该路由是否需要登录权限
  // 获取存储在sessionStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = sessionStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }
  } else {
    if (to.name === 'login' && token) {
      next({
        name: from.name || 'home'
      })
    } else {
      next()
    }
  }
})

export default router
