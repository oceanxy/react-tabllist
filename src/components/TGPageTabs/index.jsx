/**
 * 通过标签快速切换已打开的页面，并可缓存已打开的页面
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-11-22 周三 16:03:06
 */

import './index.scss'
import { Icon, Tag } from 'ant-design-vue'
import { replacePath } from '@/utils/utilityFunction'

export default {
  name: 'TGPageTabs',
  props: {
    // 允许最大的缓存数（暂未实现）
    maxTabs: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      showMore: false,
      disabledPrev: true,
      disabledNext: true,
      distance: 120
    }
  },
  computed: {
    pageTabs() {
      return this.$store.state.common?.pageTabs || []
    },
    pageNames() {
      return this.$store.state.common?.pageNames || []
    },
    homeRoute() {
      return this.$router.resolve({ name: 'home' }).route
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        const isExistent = this.pageTabs.find(route => {
          return replacePath(route.path) === replacePath(value.path)
        })

        if (!isExistent) {
          this.$store.commit('common/setPageTabs', this.pageTabs.concat(value))
        }

        const isHomeRouteExistent = this.pageTabs.find(route => {
          return replacePath(route.path) === replacePath(this.homeRoute.path)
        })

        if (!isHomeRouteExistent) {
          this.$store.commit('common/setPageTabs', [this.homeRoute].concat(this.pageTabs))
        }
      }
    }
  },
  methods: {
    replacePath(value) {
      return value.replace(/([a-zA-Z0-9\-\/]+)(\/)$/g, '$1')
    },
    resize(force) {
      const sl = this.$refs.pageTabs

      if (sl) {
        this.showMore = sl.clientWidth < this.$refs['pageTabsBox']?.clientWidth
        this.disabledPrev = sl.scrollLeft <= 0
        this.disabledNext = sl.scrollLeft + sl.clientWidth >= this.$refs.pageTabsBox.clientWidth

        if (force) {
          this.$forceUpdate()
        }
      }
    },
    onPrevClick() {
      if (!this.disabledPrev) {
        const sl = this.$refs.pageTabs
        const value = sl.scrollLeft

        this.disabledPrev = value - this.distance <= 0
        this.disabledNext = value - this.distance + sl.clientWidth >= this.$refs.pageTabsBox.clientWidth

        this.$refs['pageTabs'].scrollTo({ left: value - this.distance, behavior: 'smooth' })
      }
    },
    onNextClick() {
      if (!this.disabledNext) {
        const sl = this.$refs.pageTabs
        const value = sl.scrollLeft

        this.disabledPrev = value + this.distance <= 0
        this.disabledNext = value + this.distance + sl.clientWidth >= this.$refs.pageTabsBox.clientWidth

        this.$refs['pageTabs'].scrollTo({ left: value + this.distance, behavior: 'smooth' })
      }
    },
    async onTabClick(route) {
      await this.$router.push(route)
    },
    async onTabClose(routeClosed) {
      // 如果关闭的是当前页，则回退到上一页
      if (replacePath(routeClosed.path) === replacePath(this.$route.path)) {
        await this.$router.push(this.pageTabs.at(-2))
      }

      const routeIndexClosed = this.pageTabs.findIndex(route => {
        return replacePath(route.path) === replacePath(routeClosed.path)
      })

      this.pageTabs.splice(routeIndexClosed, 1)
      this.$store.commit('common/setPageTabs', [...this.pageTabs])
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize(true)
  },
  beforeDestroy() {
    window.addEventListener('resize', this.resize)
  },
  render() {
    return (
      <div class={'tg-page-tabs'}>
        <div class={'tg-page-tabs-container'}>
          <div
            class={`tg-arrow-left${this.showMore ? ' show-arrow' : ''}${this.disabledPrev ? ' disabled' : ''}`}
            onClick={this.onPrevClick}
          >
            <Icon type={'left'} />
          </div>
          <div ref={'pageTabs'} class={'tg-page-tabs-layout'}>
            <div ref={'pageTabsBox'} class={'tg-page-tabs-box'}>
              {
                this.pageTabs.map(route => (
                  <Tag
                    key={route.path}
                    closable={replacePath(route.path) !== replacePath(this.homeRoute.path)}
                    color={`${
                      replacePath(route.path) === replacePath(this.$route.path)
                        ? window.themeVariables.primaryColor
                        : ''
                    }`}
                    onClick={() => this.onTabClick(route)}
                    onClose={() => this.onTabClose(route)}
                  >
                    {route.meta.title}
                  </Tag>
                ))
              }
            </div>
          </div>
          <div
            class={`tg-arrow-right${this.showMore ? ' show-arrow' : ''}${this.disabledNext ? ' disabled' : ''}`}
            onClick={this.onNextClick}
          >
            <Icon type={'right'} />
          </div>
        </div>
      </div>
    )
  }
}

