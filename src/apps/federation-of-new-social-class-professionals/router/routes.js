import TGRouterView from '@/components/TGRouterView'

// 正常开发时应更新本路由表，与服务端返回的动态路由对应
export default [
  {
    path: 'fnscp/member-center',
    component: TGRouterView,
    redirect: { name: 'sites' },
    meta: {
      title: '会员中心',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-record-or-register'
    },
    children: [
      {
        path: 'sites',
        name: 'sites',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/SignUpOnline'),
        meta: {
          title: '站点管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-wq-line'
        }
      },
      {
        path: 'member-audit',
        name: 'memberAudit',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/AdvanceRegistration'),
        meta: {
          title: '会员审核',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-ygdj-line'
        }
      },
      {
        path: 'members',
        name: 'members',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/MortgageRecords'),
        meta: {
          title: '会员管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-dyjl-line'
        }
      },
      {
        path: 'membership-points',
        name: 'membershipPoints',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/recordOrRegister/MortgageRecords'),
        meta: {
          title: '会员积分',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-dyjl-line'
        }
      }
    ]
  },
  {
    path: 'fnscp/activity-center',
    component: TGRouterView,
    redirect: { name: 'activities' },
    meta: {
      title: '活动中心',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-real-estate'
    },
    children: [
      {
        path: 'activities',
        name: 'activities',
        // eslint-disable-next-line max-len
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Developers'),
        meta: {
          title: '活动管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-kfs-line'
        }
      },
      {
        path: 'event-registration',
        name: 'eventRegistration',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Projects'),
        meta: {
          title: '活动报名',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-xm-line'
        }
      },
      {
        path: 'summary-of-activities',
        name: 'summaryOfActivities',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/realEstate/Assets'),
        meta: {
          title: '活动总结',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-zc-line'
        }
      }
    ]
  },
  {
    path: 'fnscp/learning-center',
    component: TGRouterView,
    redirect: { name: 'learningContent' },
    meta: {
      title: '学习中心',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-statistics'
    },
    children: [
      {
        path: 'learning-content',
        name: 'learningContent',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/BorrowingStatistics'),
        meta: {
          title: '学习内容',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-jktj-line'
        }
      },
      {
        path: 'content-type',
        name: 'contentType',
        // eslint-disable-next-line max-len
        component: () =>
          import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/PaymentCollectionStatistics'),
        meta: {
          title: '内容类型',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-hktj-line'
        }
      }
    ]
  },
  {
    path: 'fnscp/advocacy-center',
    component: TGRouterView,
    redirect: { name: 'information' },
    meta: {
      title: '宣传中心',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-statistics'
    },
    children: [
      {
        path: 'information',
        name: 'information',
        component: () => import('@/apps/ensuring-deliveries-of-presold-homes/views/statistics/BorrowingStatistics'),
        meta: {
          title: '资讯管理',
          keepAlive: false,
          requiresAuth: true,
          icon: 'icon-menu-jktj-line'
        }
      }
    ]
  },
  {
    path: 'fnscp/system',
    component: TGRouterView,
    redirect: { name: 'menus' },
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
          title: '角色管理',
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
