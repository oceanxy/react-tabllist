import { Badge, Button, Modal } from 'ant-design-vue'
import './index.scss'

export default {
  props: {
    imageUrls: Array,
    width: Number,
    height: Number,
    isScaleDrag: {
      type: Boolean,
      default: false
    },
    scaleZoom: {
      type: Object,
      default() {
        return {
          max: 5,
          min: 0.4
        }
      }
    },
    // 默认封面图
    defaultCover: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      curIndex: 0,
      visible: false,
      dragElement: null,
      translate: { x: 0, y: 0 },
      moveStart: {},
      scale: 1,
      storageX: 0,
      storageY: 0
    }
  },
  computed: {
    firstUrl() {
      let url = this.defaultCover

      if (this.imageUrls.length) {
        url = this.imageUrls.at(-1)
      }

      return url
    },
    curUrl() {
      let url = ''

      if (this.imageUrls.length) {
        url = this.imageUrls[this.curIndex]
      }

      return url
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.start)
    document.removeEventListener('mouseup', this.docMouseUp)
    document.removeEventListener('mousemove', this.docMove)
    document.removeEventListener('mousewheel', this.handleScroll)
  },
  methods: {
    getElement() {
      this.dragElement = this.$refs['dragElement']
      this.dragElement.addEventListener('mousewheel', this.handleScroll)
      this.dragElement.addEventListener('mousedown', this.start)
      document.addEventListener('mouseup', this.docMouseUp)
    },
    start(event) {
      // 记录初始拖拽位置
      event.preventDefault()
      this.fatre = false
      this.moveStart.x = event.clientX
      this.moveStart.y = event.clientY
      document.addEventListener('mousemove', this.docMove)
    },
    docMouseUp(event) {
      // 停止拖拽
      document.removeEventListener('mousemove', this.docMove)
      this.x += this.translate.x
      this.y += this.translate.y
    },
    docMove(event) {
      event.preventDefault()
      // 拖拽中，更新图片位置
      const x = event.clientX - this.moveStart.x
      const y = event.clientY - this.moveStart.y

      this.translate.x = x
      this.translate.y = y

      this.$refs.dragElement.style.transform = `scale(${this.scale}) translate(${this.translate.x + this.storageX}px, ${
        this.translate.y + this.storageY
      }px)`
    },
    handleScroll(event) {
      const speed = event.wheelDelta / 120

      this.x = 0
      this.y = 0

      if (event.wheelDelta > 0 && this.scale < this.scaleZoom.max) {
        this.scale += 0.2 * speed
        this.$refs.dragElement.style.transform =
          `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`
      } else if (event.wheelDelta < 0 && this.scale > this.scaleZoom.min) {
        this.scale += 0.2 * speed
        this.$refs.dragElement.style.transform =
          `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`
      }
    },
    onClickImg() {
      if (this.imageUrls.length) {
        this.visible = true

        if (this.visible && this.isScaleDrag) {
          this.$nextTick(() => {
            this.getElement()
          })
        }
      }
    },
    onCancel() {
      this.visible = false
      this.curIndex = 0
    },
    onSwitch(type) {
      if (type === 'up') {
        if (this.curIndex !== 0) {
          this.curIndex--
        }
      } else {
        if (this.curIndex !== this.imageUrls.length - 1) {
          this.curIndex++
        }
      }
    }
  },
  render() {
    const attributes = {
      props: {
        offset: [0, 5],
        numberStyle: {
          backgroundColor: '#ffffff',
          color: '#999999',
          boxShadow: '0 0 0 1px #d9d9d9 inset'
        }
      }
    }

    if (this.imageUrls.length > 1) {
      attributes.props.count = this.imageUrls.length
    }

    return (
      <div class="tg-image-preview">
        <Badge {...attributes}>
          {
            this.firstUrl ? (
              <img
                class="img"
                src={this.firstUrl}
                alt=""
                style={{
                  width: `${this.width}px`,
                  height: `${this.height}px`,
                  border: '1px solid #ededed',
                  overflow: 'hidden'
                }}
                onClick={() => this.onClickImg()}
              />
            ) : (
              <span></span>
            )
          }
        </Badge>
        <Modal
          visible={this.visible}
          zIndex={10000}
          wrapClassName="tg-image-preview-modal"
          width="90%"
          footer={null}
          oncancel={this.onCancel}
        >
          <img
            ref="dragElement"
            src={this.curUrl}
            style={{ cursor: this.isScaleDrag ? 'move' : '' }}
          />
          {
            this.imageUrls.length > 1
              ? [
                <div class="btn up">
                  <Button shape="circle" icon="left" onClick={() => this.onSwitch('up')} />
                </div>,
                <div class="btn next">
                  <Button shape="circle" icon="right" onClick={() => this.onSwitch('next')} />
                </div>
              ]
              : null
          }
        </Modal>
      </div>
    )
  }
}
