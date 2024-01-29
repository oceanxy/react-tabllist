// 引入特定组件
// 配合babel-plugin-import，此时会自动引入对应的样式文件
// eslint-disable-next-line max-len
import { Alert, Avatar, Badge, Breadcrumb, Button, Card, Cascader, Checkbox, Collapse, Comment, DatePicker, Descriptions, Divider, Dropdown, Empty, Form, Icon, Input, InputNumber, Layout, Menu, message as Message, Modal, Pagination, Popover, Progress, Radio, Select, Space, Spin, Statistic, Switch, Table, Tabs, Tag, Timeline, TimePicker, Tooltip, Tree, TreeSelect, Upload } from 'ant-design-vue'
import Vue from 'vue'

export default function useComponents(config) {
  // 全局消息弹窗设置
  Message.config({ maxCount: config.maxMessageCount })

  let iconfontUrl = config.iconFontSymbol

  if (!config.iconFontSymbol) {
    iconfontUrl = APP_ICON_FONT
  }

  const IconFont = Icon.createFromIconfontCN({ scriptUrl: iconfontUrl })

  // 按需注册特定组件
  Vue.component(Layout.name, Layout)
  Vue.component(Avatar.name, Avatar)
  Vue.component(Badge.name, Badge)
  Vue.component(Collapse.name, Collapse)
  Vue.component(Comment.name, Comment)
  Vue.component(Descriptions.name, Descriptions)
  Vue.component(Popover.name, Popover)
  Vue.component(Statistic.name, Statistic)
  Vue.component(Timeline.name, Timeline)
  Vue.component(Tooltip.name, Tooltip)
  Vue.component(Alert.name, Alert)
  Vue.component(Progress.name, Progress)
  Vue.component(Divider.name, Divider)
  Vue.component(Spin.name, Spin)
  Vue.component(Button.name, Button)
  Vue.component(Button.Group.name, Button.Group)
  Vue.component(Icon.name, Icon)
  Vue.component(Input.name, Input)
  Vue.component(InputNumber.name, InputNumber)
  Vue.component(Tree.name, Tree)
  Vue.component(Form.name, Form)
  Vue.component(Form.Item.name, Form.Item)
  Vue.component(Tag.name, Tag)
  Vue.component(Spin.name, Spin)
  Vue.component(Switch.name, Switch)
  Vue.component(Space.name, Space)
  Vue.component(Select.name, Select)
  Vue.component(Modal.name, Modal)
  Vue.component(Table.name, Table)
  Vue.component(Tabs.name, Tabs)
  Vue.component(Card.name, Card)
  Vue.component(Empty.name, Empty)
  Vue.component(Upload.name, Upload)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(TimePicker.name, TimePicker)
  Vue.component(Cascader.name, Cascader)
  Vue.component(Radio.name, Upload)
  Vue.component(Menu.name, Menu)
  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(Layout.name, Layout)
  Vue.component(Avatar.name, Avatar)
  Vue.component(Dropdown.name, Dropdown)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(Pagination.name, Pagination)
  Vue.component(TreeSelect.name, TreeSelect)
  Vue.component(Select.Option.name, Select.Option)
  Vue.component('IconFont', IconFont)

  // 解决报错：[Vue warn]: Failed to resolve directive: ant-portal (found in <Anonymous>)
  Vue.use(Modal)
}

