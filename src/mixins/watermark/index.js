/**
 * 初始化项目混合watermark(水印)
 * @Date: 2023-10-31 周二 16:23:00
 */

import watermark from 'watermark-dom'
import debounce from 'lodash/debounce'
import config from '@/config'

/**
 * 添加水印
 * @returns {Object}
 */
export default () => {
  if (!config.isWatermark) {
    return {}
  }

  return {
    data() {
      return {
        winWidth: 0,
        winHeight: 0
      }
    },
    computed: {
      userInfo() {
        return this.$store.state['login'].userInfo
      }
    },
    beforeMount() {
      this.handleResize = debounce(this.handleResize, 500, { leading: false })
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed() {
      const wmDiv = document.getElementById('wm_div_id')

      if (wmDiv) {
        window.removeEventListener('resize', this.handleResize)
        // 移除水印的逻辑，使用你自己的方法或第三方库
        watermark.remove()
      }
    },
    methods: {
      // 获取屏幕宽高
      handleResize() {
        this.winWidth = window.innerWidth
        this.winHeight = window.innerHeight
        this.watermarkLoad()
      },
      // 绘制水印
      watermarkLoad() {
        watermark.load({
          watermark_txt: this.userInfo.nickName,
          watermark_font: '微软雅黑',
          watermark_color: 'rgba(0,0,0,1)',
          watermark_alpha: 0.1,
          watermark_width: 300,
          watermark_height: 200,
          watermark_angle: 25,
          watermark_fontsize: 12,
          watermark_parent_node: this.$el
        })


      }
    }
  }
}
