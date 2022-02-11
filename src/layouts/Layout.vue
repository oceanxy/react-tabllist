<template>
  <a-layout id="tem-gen-layout-responsive">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      class="tem-gen-sider"
      collapsible
    >
      <div class="logo" />
      <a-menu
        :default-selected-keys="['4']"
        mode="inline"
        theme="dark"
      >
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="user" />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <t-g-header :collapsed.sync="collapsed" />
      <a-layout-content class="tem-gen-content">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        蓝桥科技 ©2022 技术支持
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout, Menu } from 'ant-design-vue'
import TGHeader from '@/layouts/Header'

export default {
  name: 'TGLayout',
  components: {
    TGHeader,
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Content.name]: Layout.Content,
    [Layout.Footer.name]: Layout.Footer,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item
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
