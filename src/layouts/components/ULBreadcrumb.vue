<template>
  <a-breadcrumb :routes="matchedRoute" class="uni-log-breadcrumb">
    <template #itemRender="{route, routes}">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ handleBreadcrumbName(route) }}
      </span>
      <router-link v-else :to="route.path || '/'">
        {{ handleBreadcrumbName(route) }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'

export default {
  name: 'ULBreadcrumb',
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

      return matchedRoute
    }
  },
  methods: {
    handleBreadcrumbName(route) {
      return route?.meta?.title ?? route.name
    }
  }
}
</script>

<style lang="scss">
.uni-log-breadcrumb {
  padding: 16px 20px;
  border-top: 1px solid #ededed;
}
</style>
