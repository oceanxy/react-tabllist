module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 支持jsx
    [
      '@vue/babel-preset-jsx',
      { injectH: false }
    ]
  ],
  plugins: [
    'dynamic-import-webpack',
    [
      // 该插件配合ant-design一起使用，实现按需导入组件及对应样式文件
      'import',
      // 按需导入ant-design的一些配置
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: false // 不按需引入组件样式文件，也不需要。如果按需引用组件样式会导致全局定制的主题文件被覆盖。(@/assets/styles/themes.less)
      }
    ]
    // lodash 按需引入
    // 'lodash'
  ]
}
