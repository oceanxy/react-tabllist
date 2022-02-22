# template-generator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 结构

- mock：模拟数据
- public：编译打包静态资源
- server：node代码生成服务
- src
  - apis：API定义
  - assets：静态资源（如图片、视频、第三方库等）
  - components：通用组件（自定义组件、高阶组件等，请按规范命名 TG + 组件名称）
  - config：源码相关配置
  - layouts：布局组件
  - router：路由
  - store：通用全局状态
  - styles：通用全局样式
    - theme.scss 主题样式及颜色定义
  - utils：工具包（工具函数、高阶函数、混合、注入等辅助型功能）
    - antvComponents：ant design vue 常用全局组件按需注册，非常用的组件请在需要用到时按需引入
    - request：axios简易封装 HTTP请求等相关功能
  - views：页面及其附属组件
  - App.vue：实例化Vue组件
  - main.js：主程序入口

## 主要功能

### 多端/多布局

  1. 多端适配，灵活配置布局文件

### 完全脱离后端运行
  
  1. mockjs支撑，开发模式下无需后端服务即可调试项目
  2. 开发模式下自动绕开前端权限验证模块

### 全量化/持久化状态

  1. 刷新不丢失全局状态
  2. 刷新不丢失菜单选中状态和打开状态
  3. 刷新不丢失路由

### 无感化动态路由监听

  1. **面包屑**：全自动生成页面的面包屑，只需在需要的页面引入面包屑组件即可
  2. **菜单**：结合路由及权限验证模块，自动生成菜单，并注入选中状态和打开状态
  3. **菜单折叠**：自动根据路由打开已激活菜单，自动折叠未激活菜单
  4. **变更浏览器地址**：菜单自动导向到新页面，并自动展开到页面所在层级

### 更多功能加入中...