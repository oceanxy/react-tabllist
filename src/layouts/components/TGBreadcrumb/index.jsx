import './index.scss'
import { Breadcrumb } from 'ant-design-vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'TGBreadcrumb',
  props: {
    mode: {
      type: String,
      // 'normal'：正常模式 'onlyLast'：只显示最后一级
      default: 'mormal'
    }
  },
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item
  },
  computed: {
    matchedRoute() {
      const matchedRoute = [...this.$route.matched]

      // 处理进入首页时面包屑显示为“首页 / 首页”的情况
      // 如果 “/” 下的子路由不包含空路由，则不需要此处理
      if (matchedRoute[1].path === '/') {
        matchedRoute.pop()
      }

      // 处理面包屑出现最后两级重名的情况
      // 主要出现在父级菜单设置“hideChildren: true”，不在左侧菜单展示子级，同时子级路由的path字段为空字符串的情况
      const pathOfLastRoute = matchedRoute[matchedRoute.length - 1].path

      if (pathOfLastRoute.substring(pathOfLastRoute.length - 1) === '/') {
        matchedRoute.pop()
      }

      return matchedRoute
    }
  },
  methods: {
    handleBreadcrumbName(route) {
      return route?.meta?.title ?? route.name
    },
    itemRender({ route, routes }) {
      if (routes.indexOf(route) === routes.length - 1) {
        return (
          <span class={'tg-breadcrumb-last-title'}>
            {this.handleBreadcrumbName(route)}
          </span>
        )
      } else {
        if (this.mode === 'normal') {
          return (
            <RouterLink to={route.path || '/'}>
              {this.handleBreadcrumbName(route)}
            </RouterLink>
          )
        }

        return null
      }
    }
  },
  render() {
    return (
      <Breadcrumb
        routes={this.matchedRoute}
        class={'tg-breadcrumb'}
        separator={'>'}
        itemRender={this.itemRender}
      />
    )
  }
}
