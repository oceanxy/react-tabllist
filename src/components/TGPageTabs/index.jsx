/**
 * 通过标签快速切换已打开的页面，并可缓存已打开的页面
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-11-22 周三 16:03:06
 */

import './index.scss'
import { Button, Icon } from 'ant-design-vue'
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
    homeRoute() {
      return this.$router.resolve({name: 'home'}).route
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        this.resize()
        this.setCurrentPageTabs(value)
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize(true)
  },
  methods: {
    /**
     * 保存当前页面的 Tab
     * @param {Route} currentRoute - 当前路由
     */
    setCurrentPageTabs(currentRoute) {
      const isExistent = this.pageTabs.find(route => {
        return replacePath(route.path) === replacePath(currentRoute?.path)
      })

      if (!isExistent) {
        if (replacePath(currentRoute.path) === replacePath(this.homeRoute.path)) {
          this.$store.commit('common/setPageTabs', [this.homeRoute].concat(this.pageTabs))
        } else {
          this.$store.commit('common/setPageTabs', this.pageTabs.concat(currentRoute))

          this.setCurrentPageTabs(this.homeRoute)
        }
      }
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

        this.$refs['pageTabs'].scrollTo({
          left: value - this.distance,
          behavior: 'smooth'
        })
      }
    },
    onNextClick() {
      if (!this.disabledNext) {
        const sl = this.$refs.pageTabs
        const value = sl.scrollLeft

        this.disabledPrev = value + this.distance <= 0
        this.disabledNext = value + this.distance + sl.clientWidth >= this.$refs.pageTabsBox.clientWidth

        this.$refs['pageTabs'].scrollTo({left: value + this.distance, behavior: 'smooth'})
      }
    },
    async onTabClick(route) {
      await this.$router.push(route)
    },
    async onTabClose(routeClosed) {
      // 寻找当前页在 pageTabs 中对应的位置
      const routeIndexClosed = this.pageTabs.findIndex(route => {
        return replacePath(route.path) === replacePath(routeClosed.path)
      })

      this.pageTabs.splice(routeIndexClosed, 1)
      await this.$router.push(this.pageTabs.at(-1))
      this.$store.commit('common/setPageTabs', [...this.pageTabs])
      this.resize(true)
    },
    getIsHomeRoute(route) {
      return replacePath(route.path) === replacePath(this.homeRoute.path)
    },
    getButtonType(route) {
      return replacePath(route.path) === replacePath(this.$route.path) ? 'primary' : 'default'
    }
  },
  render() {
    return (
      <div class={'tg-page-tabs'}>
        <div class={'tg-page-tabs-container'}>
          <div
            class={
              `tg-arrow-left${
                this.showMore ? ' show-arrow' : ''
              }${
                this.disabledPrev ? ' disabled' : ''
              }`
            }
            onClick={this.onPrevClick}
          >
            <Icon type={'left'} />
          </div>
          <div ref={'pageTabs'} class={'tg-page-tabs-layout'}>
            <div ref={'pageTabsBox'} class={'tg-page-tabs-box'}>
              {
                this.pageTabs.map(route => (
                  <div key={route.path} class={'tg-page-tabs-box-button'}>
                    <Button
                      class={`${!this.getIsHomeRoute(route) ? 'show-close' : ''}`}
                      type={this.getButtonType(route)}
                      onClick={() => this.onTabClick(route)}
                    >
                      {route.meta.title}
                    </Button>
                    {
                      !this.getIsHomeRoute(route)
                        ? (
                          <Button
                            class={'close-btn'}
                            type={this.getButtonType(route)}
                            onClick={() => this.onTabClose(route)}
                          >
                            <Icon type="close" />
                          </Button>
                        )
                        : undefined
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <div
            class={
              `tg-arrow-right${
                this.showMore ? ' show-arrow' : ''
              }${
                this.disabledNext ? ' disabled' : ''
              }`
            }
            onClick={this.onNextClick}
          >
            <Icon type={'right'} />
          </div>
        </div>
      </div>
    )
  }
}
