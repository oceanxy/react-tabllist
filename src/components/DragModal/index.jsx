import { Modal, Spin } from 'ant-design-vue'
import _ from 'lodash'

const Title = {
  props: ['isShow'],
  data: () => ({
    position: {
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      tx: 0,
      ty: 0
    },
    tdom: null
  }),
  watch: {
    isShow(value) {
      if (value) {
        const tx = 0
        const ty = 0
        const transformStr = `translate(${tx}px,${ty}px)`

        this.updateTransform(transformStr, tx, ty)
        this.position.dx = tx
        this.position.dy = ty
      }
    }
  },
  mounted() {
    this.tdom = this.$refs['tdom']

    this.tdom.addEventListener('mousedown', this.start)
    //用document移除对mousemove事件的监听
    document.addEventListener('mouseup', this.docMouseUp)
  },
  beforeDestroy() {
    this.tdom.removeEventListener('mousedown', this.start)
    document.removeEventListener('mouseup', this.docMouseUp)
    document.removeEventListener('mousemove', this.docMove)
  },
  methods: {
    docMove(event) {
      const tx = event.pageX - this.position.startX
      const ty = event.pageY - this.position.startY
      const transformStr = `translate(${tx}px,${ty}px)`

      this.updateTransform(transformStr, tx, ty)
      this.position.dx = tx
      this.position.dy = ty
    },
    start(event) {
      if (event.button !== 0) {
        //只允许左键，右键问题在于不选择conextmenu就不会触发mouseup事件
        return
      }

      document.addEventListener('mousemove', this.docMove)
      this.position.startX = event.pageX - this.position.dx
      this.position.startY = event.pageY - this.position.dy
    },
    docMouseUp(event) {
      document.removeEventListener('mousemove', this.docMove)
    },
    updateTransform(transformStr, tx, ty) {
      this.$listeners?.move({ '--transform': transformStr })
    }
  },
  render() {
    return (
      <div
        ref="tdom"
        style={{ cursor: 'move', userSelect: 'none' }}
      >
        {this.$slots.default}
      </div>
    )
  }
}

export default {
  data: () => ({ style: {} }),
  methods: {
    onMove(value) {
      this.style = value
    }
  },
  computed: {
    attributes() {
      const titleAttribute = {
        props: { isShow: this.$attrs.visible },
        on: { move: this.onMove }
      }

      return {
        props: {
          ..._.omit(this.$attrs, ['title', 'dialogStyle', 'loading']),
          title: <Title {...titleAttribute}>{this.$attrs.title}</Title>,
          dialogStyle: { ...this.$attrs.dialogStyle, ...this.style },
          footer: this.$slots.footer || this.$attrs.footer // 优先使用slot方式传递的值
        },
        on: this.$listeners
      }
    }
  },
  render() {
    return (
      <Modal {...this.attributes}>
        <Spin spinning={this.$attrs.loading}>
          {...this.$slots.default}
        </Spin>
      </Modal>
    )
  }
}
