/**
 * 初始化项目混合watermark(水印)
 * @Date: 2023-10-31 周二 16:23:00
 */

import watermark from 'watermark-dom'
import debounce from 'lodash/debounce'

/**
 * 添加水印
 * @param [isWatermark] {boolean} 是否开启水印，开启水印必须在子项目app.jsx中混入watermark
 * @param [userName]
 * @param [userNamePinyin]
 * @param [phone]
 * @returns {Object}
 */
export default ({
  isWatermark,
  userName = 'login_name',
  userNamePinyin,
  phone
} = {}) => {
  if (!isWatermark) {
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
      },
      watermarkTxt() {
        let name = ''
        let pinyin = ''
        let tel = ''

        name = userName ? this.userInfo?.[userName] ?? '' : ''
        pinyin = userNamePinyin ? `,${this.userInfo[userNamePinyin]}` : ''
        tel = phone ? `,${this.userInfo[phone]}` : ''

        return name + pinyin + tel
      }
    },
    beforeMount() {
      this.handleResize = debounce(this.handleResize, 500, { leading: false })
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    beforeDestroy() {
      watermark.remove()
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
          watermark_txt: this.watermarkTxt,
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
