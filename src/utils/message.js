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
  }
}
