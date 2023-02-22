module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 支持jsx
    [
      '@vue/babel-preset-jsx',
      {injectH: false}
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
        style: true
      }
    ]
  ]
}
