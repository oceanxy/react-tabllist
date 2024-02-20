import { RouterView } from 'vue-router'
import Vue from 'vue'
import { mapGetters } from 'vuex'

const cache = {}
const keys = []

export const TGKeepAlive = Vue.component(
  'tg-keep-alive',
  Object.assign(
    {},
    Vue.options.components.KeepAlive,
    {
      name: 'TGKeepAlive',
      created() {
        this.cache = cache
        this.keys = keys
      }
    }
  )
)

export default {
  name: 'TGRouterView',
  computed: {
    ...mapGetters({ getState: 'getState' }),
    include() {
      return this.getState('pageNames', 'common') || []
    }
  },
  render() {
    return (
      <TGKeepAlive include={this.include}>
        <RouterView />
      </TGKeepAlive>
    )
  }
}
