<template>
  <a-menu
    ref="menu"
    id="menu"
    class="t-g-menu-container"
    v-model="selectedKeys"
    :inline-collapsed="collapsed"
    :open-keys.sync="openKeys"
    mode="inline"
    @click="menuClick"
  >
    <template v-for="route in menuRoutes">
      <t-g-sub-menu
        v-if="!route.meta.hideChildren && route.children && route.children.length"
        :key="route.path || Math.random()"
        :menu-info="route"
        @subMenuClick="titleClick"
        :style="route.meta.hide ? { display: 'none' } : ''"
      />
      <a-menu-item
        v-else
        :key="route.path || Math.random()"
        :style="route.meta.hide ? { display: 'none' } : ''"
      >
        <a-icon
          theme="filled"
          v-if="route.meta.icon"
          :component="route.meta.icon"
        />
        <span>{{ route.meta && route.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import './assets/styles/index.scss'
import { Menu } from 'ant-design-vue'
import { generateRoute } from '@/utils/utilityFunction'
import config from '@/config'
import { constRoutes } from '@/router/manager'

// 函数组件 自定义子菜单
const TGSubMenu = {
  template: `
    <a-sub-menu
      :key="menuInfo.path || Math.random()"
      v-bind="$props"
      v-on="$listeners"
      @titleClick="titleClick"
      popupClassName="t-g-menu-popup"
    >
    <div slot="title">
      <a-icon
        v-if="menuInfo.meta.icon"
        :component="menuInfo.meta.icon"
      />
      <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
    </div>
    <template v-for="route in menuInfo.children">
      <t-g-sub-menu
        v-if="!route.meta.hideChildren && route.children && route.children.length"
        :key="route.path || Math.random()"
        :menu-info="route"
        @subMenuClick="titleClick"
        :style="route.meta.hide ? { display: 'none' } : ''"
      />
      <a-menu-item
        v-else
        :key="route.path || Math.random()"
        :style="route.meta.hide ? { display: 'none' } : ''"
      >
        <a-icon
          v-if="route.meta.icon"
          :component="route.meta.icon"
        />
        <span>{{ route.meta && route.meta.title }}</span>
      </a-menu-item>
    </template>
    </a-sub-menu>
  `,
  name: 'TGSubMenu',
  // must add isSubMenu: true
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
      /**
       * 生成用于菜单显示的路由，根据 routes 生成
       */
      menuRoutes: [],
      // 菜单滚动条距离顶部的初始值
      menuScrollTop: 0
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
  async created() {
    // 从缓存中取出openKeys，设置到菜单中
    const openKeys = localStorage.getItem('openKeys')

    if (openKeys) {
      this.openKeys = JSON.parse(openKeys)
    }

    if (config.dynamicRouting) {
      this.getMenuRoutes()
    } else {
      this.menuRoutes = constRoutes[1].children
    }
  },
  methods: {
    getMenuRoutes() {
      const tempMenu = JSON.parse(localStorage.getItem('menu'))[0]
      const menu = generateRoute(tempMenu)

      const routes = menu.children
      const rootRoute = {
        ...menu,
        children: undefined
      }

      this.menuRoutes = routes.reduce((menuRoutes, route) => {
        if (!route.path) {
          menuRoutes.push(rootRoute)
        } else {
          menuRoutes.push(route)
        }

        return menuRoutes
      }, [])
    },
    // 点击菜单，路由跳转，当点击 MenuItem 才会触发此函数
    menuClick({ keyPath }) {
      const toPath = `/${[...keyPath]
        .map(key => (key ? key : '/'))
        .reverse()
        .join('/')}`
        // 替换path中所有 '//'
        .replaceAll('//', '/')
        // 替换以 '/' 结尾的 path
        .replace(/(\S+)\/$/, '$1')

      // 检测是否是跳转到本路由
      if (toPath !== this.$route.path) {
        this.$router.push({ path: toPath })
        this.menuScrollTop = this.$refs.menu.$el.scrollTop

        setTimeout(() => {
          document.getElementById('menu').scrollTo({
            top: this.menuScrollTop,
            behavior: 'smooth'
          })
        }, 200)
      }
    },
    titleClick(e) {
      /**
       *  ---------------------- Event.path 的兼容处理 ---------------------------
       *  从 chrome v108 升级到 v109 后发现 Event.path 的值为 undefined，
       *  查阅文档发现 Chrome 在最近版本中删除了该属性！！！！
       *  具体信息参考：https://bugs.chromium.org/p/chromium/issues/detail?id=1277431
       */
      let { path } = e.domEvent

      if (!path) {
        path = e.domEvent.composedPath()
      }

      // ------------------------------------------------------------------------

      const subMenuDom = path.filter(dom => dom.classList?.contains('ant-menu-submenu'))

      // 获取当前点击的折叠菜单的keyPath
      const keyPath = subMenuDom
        .filter((dom, index) => (!index && !dom.__vue__.$props.isOpen) || (index > 0 && dom.__vue__.$props.isOpen))
        .map(dom => dom.__vue__.$props.eventKey)
        .reverse()

      // 将当前打开的父级菜单存入缓存中
      localStorage.setItem('openKeys', JSON.stringify(keyPath))

      // 等待菜单打开动画执行完成，在下一次渲染周期执行
      // 将当前菜单的pathKey赋值给openKeys，以实现只打开一个折叠菜单的功能
      this.$nextTick(() => {
        this.openKeys = keyPath
      })
    }
  }
}
</script>
