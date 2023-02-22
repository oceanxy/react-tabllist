<template>
  <a-layout-footer style="text-align: center">
    蓝桥科技 ©2022 技术支持
  </a-layout-footer>
</template>

<script>
import { Layout } from 'ant-design-vue'

export default {
  name: 'TGFooter',
  components: { [Layout.Footer.name]: Layout.Footer }
}
</script>

<style lang="scss">
.tg-footer {

}
</style>
