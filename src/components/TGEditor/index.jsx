/**
 * 富文本编辑器（基于 wangEditor 5）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2023-04-19 周三 09:59:35
 */

import '@wangeditor/editor/dist/css/style.css'
import './index.scss'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      if (editor.isEmpty()) {
        this.$emit('change', '')
      } else {
        this.$emit('change', editor.getHtml())
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.html = value
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor

    if (editor === null) return

    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  render() {
    return (
      <div class={'tg-editor ant-input'}>
        <Toolbar
          style={'border-bottom: 1px solid #ccc'}
          editor={this.editor}
          defaultConfig={this.toolbarConfig}
          mode={this.mode}
        />
        <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model={this.html}
          defaultConfig={this.editorConfig}
          mode={this.mode}
          onOnCreated={this.onCreated}
          onOnChange={this.onChange}
        />
      </div>
    )
  }
}
