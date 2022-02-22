<template>
  <a-layout id="tem-gen-layout-responsive">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      class="tem-gen-sider"
      collapsible
    >
      <div class="logo" />
      <t-g-menu />
    </a-layout-sider>
    <a-layout>
      <t-g-header :collapsed.sync="collapsed" />
      <a-layout-content class="tem-gen-content">
        <t-g-router-view />
      </a-layout-content>
      <t-g-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGFooter from '@/layouts/components/TGFooter'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/TGRouterView'

export default {
  name: 'TGLayout',
  components: {
    TGRouterView,
    TGMenu,
    TGFooter,
    TGHeader,
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
#tem-gen-layout-responsive {
  overflow: hidden;
  height: 100%;

  .tem-gen-sider {
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

  .tem-gen-content {
    height: 100%;
    margin: 24px 16px 0;
    padding: 24px;
    background: #ffffff;
  }
}
</style>
