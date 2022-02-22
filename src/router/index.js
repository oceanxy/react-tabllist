import Vue from 'vue'
import VueRouter from 'vue-router'
import TGLayout from '../layouts/TGLayout.vue'
import TGRouterView from '../layouts/TGRouterView.vue'
import config from '@/config'

Vue.use(VueRouter)

// 路由
export const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */'@/views/Login.vue'),
    meta: {
      title: '登录',
      keepAlive: false,
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: TGLayout,
    name: 'root',
    meta: {
      title: '首页',
      keepAlive: true,
      requiresAuth: true
    },
    children: [
      // path 留空， '/' 路由将自动跳转到此配置指定的组件
      {
        path: '',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true,
          requiresAuth: true
        }
      },
      {
        path: 'generator',
        name: 'generator',
        component: TGRouterView,
        // 子路由中没有path为空字符串的路由时，需要添加重定向，以便导航到本级时不会出现白屏
        redirect: { name: 'test1' },
        meta: {
          title: '路由生成器',
          keepAlive: true,
          requiresAuth: true
        },
        children: [
          {
            path: 'test1',
            name: 'test1',
            component: TGRouterView,
            redirect: { name: 'test5' },
            meta: {
              title: 'test1',
              keepAlive: true,
              requiresAuth: true
            },
            children: [
              {
                path: 'test5',
                name: 'test5',
                component: () => import('@/views/Generator.vue'),
                meta: {
                  title: 'test5',
                  keepAlive: true,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'test2',
            name: 'test2',
            component: () => import('@/views/Home.vue'),
            meta: {
              title: 'test2',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'generator2',
        name: 'generator2',
        component: TGRouterView,
        meta: {
          title: '路由生成器2',
          keepAlive: true,
          requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'generator2Root',
            component: () => import('@/views/Generator.vue'),
            meta: {
              title: '路由生成器2',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'test4',
            name: 'test4',
            component: () => import('@/views/Home.vue'),
            meta: {
              title: 'test4',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'generator3',
        name: 'generator3',
        component: TGRouterView,
        // 子路由中没有path为空字符串的路由时，需要添加重定向，以便导航到本级时不会出现白屏
        redirect: { name: 'test6' },
        meta: {
          title: '路由生成器3',
          keepAlive: true,
          requiresAuth: true
        },
        children: [
          {
            path: 'test1',
            name: 'test6',
            component: TGRouterView,
            redirect: { name: 'test7' },
            meta: {
              title: 'test6',
              keepAlive: true,
              requiresAuth: true
            },
            children: [
              {
                path: 'test7',
                name: 'test7',
                component: () => import('@/views/Generator.vue'),
                meta: {
                  title: 'test7',
                  keepAlive: true,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'test8',
            name: 'test8',
            component: () => import('@/views/Home.vue'),
            meta: {
              title: 'test8',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'system-settings',
        name: 'systemSettings',
        component: () => import('@/views/SystemSettings.vue'),
        meta: {
          title: '系统设置',
          keepAlive: true,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue'),
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
