/**
 * 表格弹窗混合，依赖 forModal 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-27 周一 10:14:13
 */

import forModal from '@/mixins/forModal'
import { Button } from 'ant-design-vue'

export default () => {
  return {
    mixins: [forModal()],
    data() {
      return {
        modalProps: {
          width: 800,
          footer: (
            <Button
              type={'primary'}
              icon={'close'}
              onClick={() => this.onCancel(this.visibilityFieldName)}
            >
              关闭
            </Button>
          )
        }
      }
    },
    created() {
      if (!this.visibilityFieldName) {
        console.error('请在表格弹窗的data中定义该弹窗对应的显示控制字段“visibilityFieldName”的值。')
      }
    },
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.title = this.modalTitle.replace(
              '{action}',
              this.currentItem?.name ?? this.currentItem?.fullName ?? ''
            )
          }
        }
      }
    }
  }
}
