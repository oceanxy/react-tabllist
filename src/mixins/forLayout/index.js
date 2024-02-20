/**
 * 布局混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2024-02-06 周二 10:59:39
 */

import { mapGetters } from 'vuex'
import { RouterView } from 'vue-router'

export default {
  data() {
    return {
      // 这里主要添加的是实现页面缓存逻辑所必需的组件的名称，未明确需求和缓存实现逻辑的情况下请勿轻易改动
      defaultPageNames: ['TGKeepAlive', 'TGRouterView'],
      cacheComponentName: '',
      currentComponentName: ''
    }
  },
  computed: {
    ...mapGetters({getState: 'getState'}),
    /**
     * 提供左侧菜单折叠状态
     * @return {boolean}
     */
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    /**
     * 当前缓存的页面名称（VUE 组件实例的 name 属性）
     * @return {string[]}
     */
    pageNames() {
      return this.getState('pageNames', 'common') || []
    },
    /**
     * 生成布局中的 RouterView 组件。
     *
     * 注意：所有布局组件（src/layouts/*）都应该使用此方法生成 RouterView，而不是使用 VueRouter 提供的同名组件。
     * 否则会导致一些内置的功能无法正常使用，如：页面缓存
     * @return {JSX.Element}
     * @constructor
     */
    RouterView() {
      return (
        <KeepAlive include={this.pageNames}>
          <RouterView ref={'keepAlive'} />
        </KeepAlive>
      )
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        if (value.meta.keepAlive) {
          // 手动管理已经缓存的页面（vue组件实例的name属性），keep-alive的include属性
          this.setCurrentPageName()
        }
      }
    }
  },
  created() {
    this._setDefaultPageNames()
  },
  methods: {
    /**
     * 私有函数：添加实现缓存必要的组件名称。
     * 根据 VUE keep-alive 组件的实现逻辑，封装了一个支持多级路由的`KeepAlive`组件，详情：
     * @see ../src/components/TGRouterView
     * @private
     */
    _setDefaultPageNames() {
      const temp = []

      this.defaultPageNames.forEach(item => {
        if (!this.pageNames.includes(item)) {
          temp.push(item)
        }
      })

      if (temp.length) {
        this.$store.commit('common/setPageNames', temp.concat(this.pageNames))
      }
    },
    /**
     * 递归获取组件
     * @param {Vue.Element[]} components 当前页面组件或当前页面的父级 RouterView 组件集合
     * @param {boolean} [isTop] 是否是循环的顶端，仅在本组件的 setCurrentPageName 方法内调用时传递为 true
     * @return {{moduleName}|*}
     * @private
     */
    _getComponent(components, isTop) {
      // 清空缓存值
      if (isTop) {
        this.cacheComponentName = ''
        this.currentComponentName = ''
      }

      let _component

      for (const component of components) {
        // 组件中存在 _routerViewCache 时，证明该组件为 RouterView 组件，其子级可能为 RouterView 组件，也可能为页面组件
        const _cacheComponentName = component._routerViewCache?.default.component.name

        if (_cacheComponentName && _cacheComponentName !== 'TGRouterView' && !this.cacheComponentName) {
          this.cacheComponentName = _cacheComponentName
        }

        // 存在 moduleName 属性，则为页面组件。页面组件中的 moduleName 的注入逻辑见 src/mixins/dynamicState。
        if (component.moduleName) {
          this.currentComponentName = component.$options.name

          if (!this.cacheComponentName || this.cacheComponentName === this.currentComponentName) {
            _component = component
            break
          }
        } else {
          // 二级菜单
          _component = this._getComponent(component.$children)
        }
      }

      return _component
    },
    /**
     * 保存当前页面组件的 name 属性
     */
    setCurrentPageName() {
      // 保证此函数内逻辑的执行晚于私有函数 _setDefaultPageNames
      this.$nextTick(() => {
        const component = this._getComponent([this.$refs['keepAlive']], true)

        console.log(component.$options.name)

        if (component?.$options.name && !this.pageNames.includes(component.$options.name)) {
          this.$store.commit('common/setPageNames', this.pageNames.concat(component.$options.name))
        }
      })
    }
  }
}
