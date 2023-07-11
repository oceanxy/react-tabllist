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
        :key="route.key"
        :menu-info="route"
        @subMenuClick="titleClick"
        :style="route.meta.hide ? { display: 'none' } : ''"
        :selected-keys="selectedKeys"
      />
      <a-menu-item
        v-else
        :key="route.key"
        :style="route.meta.hide ? { display: 'none' } : ''"
      >
        <div class="ant-menu-item-title">
          <div>
            <a-icon
              theme="filled"
              v-if="route.meta.icon && typeof route.meta.icon !== 'string'"
              :component="route.meta.icon"
            />
            <icon-font
              v-else-if="route.meta.icon"
              :type="route.meta.icon + (selectedKeys.includes(route.key)
                ? activeSuffixForMenuIcon
                : ''
              )"
            />
            <span>{{ route.meta && route.meta.title }}</span>
          </div>
        </div>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import '@/components/TGMenu/assets/styles/index.scss'
import { Menu } from 'ant-design-vue'

// 函数组件 自定义子菜单
const TGSubMenu = {
  template: `
    <a-sub-menu
      :key="menuInfo.key"
      v-bind="$props"
      v-on="$listeners"
      @titleClick="titleClick"
      popupClassName="t-g-menu-popup"
    >
    <div slot="title">
      <a-icon
        theme="filled"
        v-if="menuInfo.meta.icon && typeof menuInfo.meta.icon !== 'string'"
        :component="menuInfo.meta.icon"
      />
      <icon-font
        v-else-if="menuInfo.meta.icon"
        :type="menuInfo.meta.icon + (selectedKeys.includes(menuInfo.key)
          ? activeSuffixForMenuIcon
          : ''
        )"
      />
      <span>{{ menuInfo.meta && menuInfo.meta.title }}</span>
    </div>
    <template v-for="route in menuInfo.children">
      <t-g-sub-menu
        v-if="!route.meta.hideChildren && route.children && route.children.length"
        :key="route.key"
        :menu-info="route"
        @subMenuClick="titleClick"
        :style="route.meta.hide ? { display: 'none' } : ''"
        :selected-keys="selectedKeys"
      />
      <a-menu-item
        v-else
        :key="route.key"
        :style="route.meta.hide ? { display: 'none' } : ''"
      >
        <div class="ant-menu-item-title">
          <div>
            <a-icon
              theme="filled"
              v-if="showSubIcon && route.meta.icon && typeof route.meta.icon !== 'string'"
              :component="route.meta.icon"
            />
            <icon-font
              v-else-if="showSubIcon && route.meta.icon"
              :type="route.meta.icon + (selectedKeys.includes(route.key)
                ? activeSuffixForMenuIcon
                : ''
              )"
            />
            <span>{{ route.meta && route.meta.title }}</span>
          </div>
        </div>
      </a-menu-item>
    </template>
    </a-sub-menu>
  `,
  name: 'TGSubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    // 解构a-sub-menu的属性，使用函数式组件的原因
    ...Menu.SubMenu.props,
    // 接收父级传递过来的菜单信息
    menuInfo: {
      type: Object,
      required: true
    },
    // 选中的key（routes.js 中的 path 字段，注意不是 $route 中的 path 字段）
    selectedKeys: {
      type: Array,
      required: true
    },
    showSubIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu
  },
  computed: {
    activeSuffixForMenuIcon() {
      return this.$config.activeSuffixForMenuIcon.replace(
        '{themeName}',
        `-${localStorage.getItem('theme') || this.$config.theme.default}`
      )
    }
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
      // 选中的key（$route.path）
      selectedKeys: [],
      // 生成用于菜单显示的路由，根据 routes 生成
      menuRoutes: [],
      // 菜单滚动条距离顶部的初始值
      menuScrollTop: 0
    }
  },
  computed: {
    activeSuffixForMenuIcon() {
      return this.$config.activeSuffixForMenuIcon.replace(
        '{themeName}',
        `-${localStorage.getItem('theme') || this.$config.theme.default}`
      )
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.selectedKeys = this.getSelectedKeys(route)
        localStorage.setItem('selectedKey', route.path)

        this.$nextTick(() => {
          this.openKeys = this.selectedKeys.toReversed().slice(1) // 排除最后一级（最后一级一般不是可展开的菜单层级）
          localStorage.setItem('openKeys', JSON.stringify(this.openKeys))
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

    this.menuRoutes = this.addKey(this.$router.options.routes.find(route => route.path === '/').children)
  },
  methods: {
    addKey(menuRoutes, parent = '/') {
      return menuRoutes.map(route => {
        route.key = `${parent}/${route.path}`.replace('//', '/')

        if (Array.isArray(route.children) && route.children.length) {
          route.children = this.addKey(route.children, route.key)
        }

        return route
      })
    },
    getSelectedKeys(route) {
      const keyPath = []

      // 根据当前进入页面的路由设置菜单的 selectedKeys 和 openKeys 值
      for (let i = 0; i < route.matched.length; i++) {
        if (route.matched[i].path !== '') {
          keyPath.push(route.matched[i].path)
        }
      }

      return keyPath
    },
    // 点击菜单，路由跳转，当点击 MenuItem 才会触发此函数
    menuClick({ key }) {
      const toPath = key
        // 替换path中所有 '//'
        .replaceAll('//', '/')
        // 替换以 '/' 结尾的 path
        .replace(/(\S+)\/$/, '$1')

      // 检测是否是跳转到本路由
      if (toPath !== this.$route.path) {
        this.$router.push(toPath)
        this.menuScrollTop = this.$refs.menu.$el.scrollTop

        setTimeout(() => {
          if (this.$route.path !== key) {
            this.selectedKeys = this.getSelectedKeys(this.$route)
          }

          document.getElementById('menu')?.scrollTo({
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

      let keyPath = []

      if (e.key) {
        if (this.openKeys.includes(e.key)) {
          keyPath = [...this.openKeys]
          keyPath.splice(this.openKeys.findIndex(i => i === e.key), 1)
        } else {
          if (e.domEvent.currentTarget?.parentNode?.parentNode?.classList?.contains('ant-menu-sub')) {
            keyPath = [e.key].concat(this.openKeys)
          } else {
            keyPath = [e.key]
          }
        }
      } else {
        // 获取当前点击的折叠菜单的keyPath
        keyPath = path
          .filter(dom => dom.classList?.contains('ant-menu-submenu'))
          .filter((dom, index) => (!index && !dom.__vue__.$props.isOpen) || (index > 0 && dom.__vue__.$props.isOpen))
          .map(dom => dom.__vue__.$props.eventKey)
          .reverse()
      }

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
