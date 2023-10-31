/**
 * 第一次初始化项目加入 watermark水印 混合
 * @Date: 2023-10-31 周二 16:23:00
 */
import watermark from 'watermark-dom'

export default ({ isWatermark = false } = {}) => {

  let watermarkDev

  if (isWatermark) {
    watermarkDev = {
      mounted() {
        watermark.load({
          watermark_txt: this.userName,
          watermark_font: '微软雅黑',
          watermark_color: 'rgba(0,0,0,1)',
          watermark_alpha: 0.08,
          watermark_width: 300,
          watermark_height: 200,
          watermark_angle: 25,
          watermark_parent_node: this.$el,
        })
      },
      computed: {
        userName() {
          return this.$store.state['login'].userInfo?.login_name
        }
      },
    }
  } else {
    watermarkDev = {}
  }

  return watermarkDev
}
