<template>
  <a-layout id="uni-log-layout-responsive">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      class="uni-log-sider"
      collapsible
    >
      <div class="logo" />
      <u-l-menu />
    </a-layout-sider>
    <a-layout>
      <u-l-header :collapsed.sync="collapsed" />
      <a-layout-content class="uni-log-content">
        <u-l-router-view />
      </a-layout-content>
      <u-l-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout } from 'ant-design-vue'
import ULHeader from '@/layouts/components/ULHeader'
import ULFooter from '@/layouts/components/ULFooter'
import ULMenu from '@/layouts/components/ULMenu'
import ULRouterView from '@/layouts/ULRouterView'

export default {
  name: 'ULLayout',
  components: {
    ULRouterView,
    ULMenu,
    ULFooter,
    ULHeader,
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Content.name]: Layout.Content
  },
  data: () => ({
    collapsed: false
  }),
  methods: {}
}
</script>

<style lang="scss">
#uni-log-layout-responsive {
  overflow: hidden;
  height: 100%;

  .uni-log-sider {
    //background: #ffffff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .uni-log-content {
    margin: 24px 16px 0;
    padding: 24px;
    background: #ffffff;
  }
}
</style>
