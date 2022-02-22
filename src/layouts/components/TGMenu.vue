<template>
  <a-menu
    v-model="selectedKeys"
    :inline-collapsed="collapsed"
    :open-keys.sync="openKeys"
    mode="inline"
    theme="dark"
    @click="menuClick"
  >
    <template v-for="route in menuRoutes">
      <t-g-sub-menu
        v-if="route.children && route.children.length"
        :key="route.path"
        :menu-info="route"
        @subMenuClick="titleClick"
      />
      <a-menu-item v-else :key="route.path">
        <a-icon :type="route.icon || 'menu'" />
        <span>{{ route.meta && route.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import { menuRoutes } from '@/router'

const TGSubMenu = {
  template: `
    <a-sub-menu
      :key="menuInfo.path"
      v-bind="$props"
      v-on="$listeners"
      @titleClick="titleClick"
    >
    <div slot="title">
      <a-icon :type="menuInfo.icon || 'menu'" />
      <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
    </div>
    <template v-for="route in menuInfo.children">
      <t-g-sub-menu
        v-if="route.children && route.children.length"
        :key="route.path"
        :menu-info="route"
        @subMenuClick="titleClick"
      />
      <a-menu-item v-else :key="route.path">
        <a-icon :type="route.icon || 'menu'" />
        <span>{{ route.meta && route.meta.title }}</span>
      </a-menu-item>
    </template>
    </a-sub-menu>
  `,
  name: 'TGSubMenu',
  // must add isSubMenu: true 此项必须被定义
  isSubMenu: true,
  props: {
    // 解构a-sub-menu的属性，也就是文章开头提到的为什么使用函数式组件
    ...Menu.SubMenu.props,
    // 接收父级传递过来的菜单信息
    menuInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu
  },
  methods: {
    titleClick(e) {
      this.$emit('subMenuClick', e)
    }
  }
}

export default {
  name: 'TGMenu',
  components: {
    TGSubMenu,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu
  },
  data() {
    return {
      // 默认不折叠
      collapsed: false,
      // 展开的父菜单项
      openKeys: [],
      // 选中的key（routes 中的 path 字段）
      selectedKeys: [],
      // 菜单
      menuRoutes
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        const path = value.matched[value.matched.length - 1].path.substring(1)
        let keyPath = []

        // 根据当前进入页面的路由设置菜单的selectedKeys和openKeys值
        if (path === '') {
          keyPath = ['/']
        } else {
          keyPath = path.split('/').reverse()
        }

        this.selectedKeys = keyPath
        this.$nextTick(() => {
          this.openKeys = keyPath
        })
      }
    }
  },
  created() {
    // 从缓存中取出openKeys，设置到菜单中
    const openKeys = sessionStorage.getItem('openKeys')

    if (openKeys) {
      this.openKeys = JSON.parse(openKeys)
    }
  },
  methods: {
    // 点击菜单，路由跳转，当点击 MenuItem 才会触发此函数
    menuClick({ keyPath }) {
      const toPath = `/${
        [...keyPath]
          .map(key => (key ? key : '/'))
          .reverse()
          .join('/')
      }`
        // 替换path中所有 '//'
        .replaceAll('//', '/')
        // 替换以 '/' 结尾的 path
        .replace(/(\S+)\/$/, '$1')

      // 检测是否是跳转到本路由
      if (toPath !== this.$route.path) {
        this.$router.push(toPath)
      }
    },
    titleClick(e) {
      const { domEvent } = e
      const subMenuDom = domEvent.path.filter(dom => dom.classList?.contains('ant-menu-submenu'))

      // 获取当前点击的折叠菜单的keyPath
      const keyPath = subMenuDom
        .filter((dom, index) => (!index && !dom.__vue__.$props.isOpen) || (index > 0 && dom.__vue__.$props.isOpen))
        .map(dom => dom.__vue__.$props.eventKey)
        .reverse()

      // 将当前打开的父级菜单存入缓存中
      sessionStorage.setItem('openKeys', JSON.stringify(keyPath))

      // 等待菜单打开动画执行完成，在下一次渲染周期执行
      // 将当前菜单的pathKey赋值给openKeys，以实现只打开一个折叠菜单的功能
      this.$nextTick(() => {
        this.openKeys = keyPath
      })
    }
  }
}
</script>
