import TGRouterView from '@/components/TGRouterView'

// 正常开发时应更新本路由表，与服务端返回的动态路由对应
export default [
  {
    path: 'edph/record-or-register',
    component: TGRouterView,
    redirect: { name: 'signUpOnline' },
    meta: {
      title: '记录登记',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-record-or-register'
    },
    children: [
      {
        path: 'sign-up-online',
        name: 'signUpOnline',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/SignUpOnline'),
        meta: {
          title: '网签',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-wq-line'
        }
      },
      {
        path: 'advance-registration',
        name: 'advanceRegistration',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/AdvanceRegistration'),
        meta: {
          title: '预告登记',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-ygdj-line'
        }
      },
      {
        path: 'mortgage-records',
        name: 'mortgageRecords',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/MortgageRecords'),
        meta: {
          title: '抵押记录',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-dyjl-line'
        }
      }
    ]
  },
  {
    path: 'edph/real-estate',
    component: TGRouterView,
    redirect: { name: 'developers' },
    meta: {
      title: '不动产管理',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-real-estate'
    },
    children: [
      {
        path: 'developers',
        name: 'developers',
        // eslint-disable-next-line max-len
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Developers'),
        meta: {
          title: '开发商',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-kfs-line'
        }
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Projects'),
        meta: {
          title: '项目',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-xm-line'
        }
      },
      {
        path: 'assets',
        name: 'assets',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Assets'),
        meta: {
          title: '资产',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-zc-line'
        }
      }
    ]
  },
  {
    path: 'edph/statistics',
    component: TGRouterView,
    redirect: { name: 'borrowingStatistics' },
    meta: {
      title: '数据统计',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-statistics'
    },
    children: [
      {
        path: 'borrowing-statistics',
        name: 'borrowingStatistics',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/BorrowingStatistics'),
        meta: {
          title: '借款统计',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-jktj-line'
        }
      },
      {
        path: 'payment-collection-statistics',
        name: 'paymentCollectionStatistics',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/PaymentCollectionStatistics'),
        meta: {
          title: '回款统计',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-hktj-line'
        }
      },
      {
        path: 'statistics-of-sign-up-online',
        name: 'statisticsOfSignUpOnline',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/StatisticsOfSignUpOnline'),
        meta: {
          title: '网签统计',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-wqtj-line'
        }
      },
      {
        path: 'pre-registration-statistics',
        name: 'preRegistrationStatistics',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/PreRegistrationStatistics'),
        meta: {
          title: '预登记统计',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-ydjtj-line'
        }
      }
    ]
  },
  {
    path: 'edph/system',
    component: TGRouterView,
    redirect: { name: 'combination' },
    meta: {
      title: '系统管理',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-xtgl-line'
    },
    children: [
      {
        path: 'menus',
        name: 'menus',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/system/Menus'),
        meta: {
          title: '菜单管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-cdgl-line'
        }
      },
      {
        path: 'functions',
        name: 'functions',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/system/Functions'),
        meta: {
          title: '功能管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-gngl-line'
        }
      },
      {
        path: 'combination',
        name: 'combination',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/system/Combination'),
        meta: {
          title: '组织结构',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-zzjg-line'
        }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/system/Roles'),
        meta: {
          title: '角色',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-js-line'
        }
      },
      {
        path: 'account-numbers',
        name: 'accountNumbers',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/system/AccountNumbers'),
        meta: {
          title: '账号管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-zhgl-line'
        }
      }
    ]
  }
]
