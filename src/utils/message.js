import { message } from 'ant-design-vue'
import config from '@/config'

// 全局消息弹窗设置
message.config({
  maxCount: config.maxMessageCount
})

export default {
  showMessage(option) {
    if (!option.message) {
      option.content = '发生未知错误，清稍后再试！'
    } else if (
      option.message.includes('Network Error') || option.message.includes('500')
    ) {
      option.content = '请检查网络或服务是否异常，或稍后再试！'
    } else if (option.message.includes('403')) {
      option.content = '没有权限进入系统！(错误码403)'
    } else if (option.message.includes('404')) {
      option.content = '请检查服务是否异常，或联系管理员处理！(错误码404)'
    } else if (option.message.includes('timeout')) {
      option.content = '连接超时，请稍后再试！'
    } else {
      option.content = option.message
    }

    message.error(option)
  },
  /**
   * 执行批量操作前的表格多选非空验证
   * @param selection {[]} 列表选择项
   * @param [callback] {Function} 询问内容对应的对调函数
   * @param [content] {string} 询问的内容
   */
  // async verifySelected(selection, callback, content) {
  //   if (!selection.length) {
  //     Message.warning('请至少勾选一项！')
  //     return
  //   }
  //   if (typeof callback === 'function') {
  //     if (content) {
  //       await Validate.verificationDialog(callback, content)
  //     } else {
  //       callback()
  //     }
  //   }
  // },
  /**
   * 显示询问对话框
   * @param callback {Function} 询问内容对应的对调函数
   * @param content {string} 询问的内容
   * @returns {Promise<*>}
   */
  // async verificationDialog(callback, content) {
  //   const confirm = await MessageBox({
  //     title: '请确认',
  //     message: content,
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     showCancelButton: true,
  //     type: 'warning'
  //   }).catch(() => {
  //     // 询问对话框已取消需要的操作，默认无
  //   })
  //
  //   if (confirm && typeof callback === 'function') {
  //     const response = await callback()
  //     message(response)
  //   }
  // },
  /**
   * 消息框
   * @param response 返回体
   */
  // message(response) {
  //   const { status, message } = response
  //
  //   Message({
  //     message: message || (status ? '操作成功！' : '操作失败！'),
  //     type: status ? 'success' : 'error'
  //   })
  // }
}
