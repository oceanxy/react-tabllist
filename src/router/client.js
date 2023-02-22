import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
import store from '@/store/client'

Vue.use(VueRouter)

/**
 * 路由
 */
export const routes = [
  /**
   * 登录/注册相关路由
   */
  {
    path: '/auth',
    component: () => import('@/views/manager/Login'),
    meta: {
      title: '',
      keepAlive: false,
      requiresAuth: false
    },
    children: [
      {
        path: '',
        component: () => import('@/views/client/Login'),
        meta: {
          title: '',
          keepAlive: false,
          requiresAuth: false
        },
        children: [
          {
            path: '',
            name: 'loginBefore',
            component: () => import('@/views/client/Login/components/loginBefore'),
            meta: {
              title: '',
              keepAlive: false,
              requiresAuth: false
            }
          },
          {
            path: '',
            name: 'loginAfter',
            component: () => import('@/views/client/Login/components/loginAfter'),
            meta: {
              title: '首页',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/client/Login/Login'),
        meta: {
          title: '登录',
          keepAlive: false,
          requiresAuth: false
        }
      },
      {
        path: 'logon',
        name: 'logon',
        component: () => import('@/views/client/Login/Logon'),
        meta: {
          title: '企业注册',
          keepAlive: false,
          requiresAuth: false
        }
      }
    ]
  },
  /**
   * 企业服务中心相关路由
   */
  {
    path: '/',
    // 选择布局组件
    component: () => import('@/layouts/TGProfile'),
    meta: {
      title: '企业服务中心',
      keepAlive: false,
      requiresAuth: true,
      icon: () => ''
    },
    children: [
      // 需要展示在menu菜单中的路由在这里面添加
      {
        path: '',
        name: 'home',
        component: () => import('@/views/client/Home'),
        meta: {
          title: '企业服务中心',
          keepAlive: false,
          requiresAuth: true
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

router.beforeEach(async (to, from, next) => {
  let title = to.meta.title || ''

  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  //判断是否自动登录
  if (to.query.token) {
    const res = await store.dispatch('login/bbsLogin', to.query.token)

    if (res.status) {
      next({ name: 'loginAfter' })
    } else {
      window.location.href = res.data
    }

    return
  }

  // 判断该路由是否需要登录权限
  // 获取存储在localStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        name: 'loginBefore',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }
  } else {
    if ((to.name === 'loginBefore' || to.name === 'login') && token) {
      next({ name: 'loginAfter' })
    } else {
      next()
    }
  }
})

export default router
