import './index.scss'
import { Breadcrumb, Button } from 'ant-design-vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'TGBreadcrumb',
  props: {
    mode: {
      type: String,
      // 'normal'：正常模式 'onlyLast'：只显示最后一级
      default: 'normal'
    }
  },
  computed: {
    matchedRoutes() {
      const matchedRoutes = [...this.$route.matched]

      // 由于 '/' 路由的第一个子路由通常配置为首页的跳转路由，当进入首页时，$route.matched 会将路由为 '/' 和 其第一个子路由
      // 同时返回，所以这里需要处理一下，以防面包屑显示为“首页 / 首页”的情况或类似情况。
      if (matchedRoutes.length === 2 && matchedRoutes[1].name === matchedRoutes[0].redirect.name) {
        matchedRoutes.shift()
      }

      // 处理面包屑出现最后两级重名的情况
      // 主要出现在父级菜单设置“hideChildren: true”，不在左侧菜单展示子级，同时子级路由的path字段为空字符串的情况
      const pathOfLastRoute = matchedRoutes[matchedRoutes.length - 1].path

      if (pathOfLastRoute.substring(pathOfLastRoute.length - 1) === '/') {
        matchedRoutes.pop()
      }

      return matchedRoutes
    }
  },
  methods: {
    handleBreadcrumbName(route) {
      return route?.meta?.title ?? route.name
    },
    itemRender({ route, routes }) {
      // 最后一项
      if (routes.indexOf(route) === routes.length - 1) {
        return (
          <span class={'tg-breadcrumb-last-title'}>
            {this.handleBreadcrumbName(route)}
          </span>
        )
      }

      if (this.mode === 'normal') {
        return (
          <RouterLink to={route.path || '/'}>
            {this.handleBreadcrumbName(route)}
          </RouterLink>
        )
      }

      return null
    }
  },
  render() {
    return (
      <div class={'tg-breadcrumb'}>
        <IconFont type={'icon-global-home'} class={'tg-breadcrumb-btn-home'} />
        <Breadcrumb
          routes={this.matchedRoutes}
          separator={'/'}
          itemRender={this.itemRender}
        />
        <div class={'tg-breadcrumb-guide'}>
          <IconFont type={'icon-global-help'} class={'tg-breadcrumb-btn-question'} />
          <Button type={'link'} class={'tg-breadcrumb-btn'}>
            工作台操作指南
            <IconFont type={'icon-global-right'} class={'tg-breadcrumb-btn-right'} />
          </Button>
        </div>
      </div>
    )
  }
}
