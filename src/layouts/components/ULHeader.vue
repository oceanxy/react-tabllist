<template>
  <a-layout-header class="tg-layout-header">
    <div class="tg-header">
      <a-icon
        :type="innerCollapsed ? 'menu-unfold' : 'menu-fold'"
        class="trigger"
        @click="handleClick"
      />
      <a-badge class="tg-badge" dot>
        <a-avatar icon="user" shape="square" />
      </a-badge>
      <a-divider class="tg-divider" type="vertical" />
      <a-dropdown class="gem-ten-user-info">
        <a @click="e => e.preventDefault()">
          <span>{{ userInfo.fullName }}</span>
          <a-icon type="down" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <span @click="handleLogOutClick">退 出</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <t-g-breadcrumb />
  </a-layout-header>
</template>

<script>
import { Avatar, Badge, Divider, Dropdown, Layout, Menu } from 'ant-design-vue'
import { createNamespacedHelpers } from 'vuex'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

const { mapState, mapActions } = createNamespacedHelpers('login')

export default {
  name: 'ULHeader',
  model: {
    event: 'change',
    prop: 'collapsed'
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  components: {
    TGBreadcrumb,
    [Layout.Header.name]: Layout.Header,
    [Badge.name]: Badge,
    [Avatar.name]: Avatar,
    [Divider.name]: Divider,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Dropdown.name]: Dropdown
  },
  computed: mapState({ userInfo: 'userInfo' }),
  data: () => ({
    innerCollapsed: false
  }),
  watch: {
    collapsed(value) {
      this.innerCollapsed = value
    }
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
    handleClick() {
      this.innerCollapsed = !this.innerCollapsed
      this.$emit('update:collapsed', this.innerCollapsed)
    },
    handleLogOutClick() {
      this.logout()
    }
  }
}
</script>

<style lang="scss">
.tg-layout-header {
  height: 118px;
  padding: 0;
  background: #ffffff;

  .tg-header {
    display: flex;
    align-items: center;

    .tg-badge {
      margin-left: auto;
    }

    .tg-divider {
      margin: 0 12px;
    }

    .gem-ten-user-info {
      margin-right: 20px;
    }
  }
}
</style>
