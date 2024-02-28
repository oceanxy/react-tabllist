import { RouterView } from 'vue-router'
import Vue from 'vue'
import { mapGetters } from 'vuex'

const cache = {}
const keys = []

/**
 * Remove an item from an array.
 */
function remove$2(arr, item) {
  const len = arr.length

  if (len) {
    // fast path for the only / last item
    if (item === arr[len - 1]) {
      arr.length = len - 1

      return
    }

    const index = arr.indexOf(item)

    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

function getComponentName(options) {
  return options.name || options.__name || options._componentTag
}

function _getComponentName(opts) {
  return opts && (getComponentName(opts.Ctor.options) || opts.tag)
}

function pruneCache(keepAliveInstance, filter) {
  const cache = keepAliveInstance.cache
  const keys = keepAliveInstance.keys
  const _vnode = keepAliveInstance._vnode
  const $vnode = keepAliveInstance.$vnode

  for (const key in cache) {
    const entry = cache[key]

    if (entry) {
      const name_1 = entry.name

      if (name_1 && !filter(name_1)) {
        pruneCacheEntry(cache, key, keys, _vnode, keepAliveInstance.$store, keepAliveInstance.pageNames)
      }
    }
  }

  $vnode.componentOptions.children = undefined
}

function pruneCacheEntry(cache, key, keys, current, store, pageNames) {
  const entry = cache[key]

  Vue.nextTick(() => {
    if (pageNames.includes(entry.name)) {
      store.commit('common/setPageNames', pageNames.filter(name => name !== entry.name))
    }

    if (entry && (!current || entry.tag !== current.tag)) {
      entry.componentInstance.$destroy()
    }

    cache[key] = null
    remove$2(keys, key)
  })
}

function isRegExp(v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }

  /* istanbul ignore next */
  return false
}

/**
 * 重写 vue/src/core/components/keep-alive 组件部分逻辑。
 * 主要思路：在 KeepAlive 组件销毁阶段，新增条件以判断是否清空该页面组件的缓存。
 * 在删除页面缓存时，同步维护 store.common.pageNames 的值。
 * 以解决开启了页面缓存时，不同层级的路由组件切换会导致高层级路由缓存被清空的问题。
 * 对于项目的 store.common.pageNames 的维护，详见以下文件：
 * @see src/store/modules/common
 * @see src/layouts/TGBackendSystem
 * @see src/mixins/forLayout
 */
export const TGKeepAlive = Vue.component(
  'tg-keep-alive',
  Object.assign(
    {},
    Vue.options.components.KeepAlive,
    {
      name: 'TGKeepAlive',
      computed: {
        ...mapGetters({getState: 'getState'}),
        pageNames() {
          return this.getState('pageNames', 'common') || []
        }
      },
      methods: {
        cacheVNode: function() {
          const _a = this
          const cache = _a.cache
          const keys = _a.keys
          const vnodeToCache = _a.vnodeToCache
          const keyToCache = _a.keyToCache

          if (vnodeToCache) {
            const tag = vnodeToCache.tag
            const componentInstance = vnodeToCache.componentInstance
            const componentOptions = vnodeToCache.componentOptions

            cache[keyToCache] = {
              name: _getComponentName(componentOptions),
              tag: tag,
              componentInstance: componentInstance
            }

            keys.push(keyToCache)

            // prune oldest entry
            if (this.max && keys.length > parseInt(this.max)) {
              pruneCacheEntry(cache, keys[0], keys, this._vnode, this.$store, this.pageNames)
            }

            this.vnodeToCache = null
          }
        }
      },
      created() {
        this.cache = cache
        this.keys = keys
      },
      destroyed() {
        for (const key in this.cache) {
          const name = this.cache[key]?.name

          if (name && !this.pageNames.includes(name)) {
            pruneCacheEntry(this.cache, key, this.keys, this.$store, this.pageNames)
          }
        }
      },
      mounted() {
        const _this = this

        this.cacheVNode()

        this.$watch('include', function(val) {
          pruneCache(_this, function(name) {
            return matches(val, name)
          })
        })

        this.$watch('exclude', function(val) {
          pruneCache(_this, function(name) {
            return !matches(val, name)
          })
        })
      },
      updated() {
        this.cacheVNode()
      }
    }
  )
)

export default {
  name: 'TGRouterView',
  computed: {
    ...mapGetters({getState: 'getState'}),
    include() {
      return this.getState('pageNames', 'common') || []
    }
  },
  render() {
    return (
      <TGKeepAlive include={this.include} max={this.$config.keepAliveMaxCount}>
        <RouterView />
      </TGKeepAlive>
    )
  }
}
