// 引入特定组件
// 配合babel-plugin-import，此时会自动引入对应的样式文件
import { Button, Form, FormModel, Icon, Input, Modal, Select, Spin, Tree } from 'ant-design-vue'
import Vue from 'vue'

// 按需注册特定组件
Vue.component(Spin.name, Spin)
Vue.component(Button.name, Button)
Vue.component(Button.Group.name, Button.Group)
Vue.component(Icon.name, Icon)
Vue.component(Input.name, Input)
Vue.component(Tree.name, Tree)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(FormModel.name, FormModel)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)

// 解决报错：[Vue warn]: Failed to resolve directive: ant-portal (found in <Anonymous>)
Vue.use(Modal)
