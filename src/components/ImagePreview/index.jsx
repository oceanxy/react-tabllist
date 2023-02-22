import { Badge, Button, Modal } from 'ant-design-vue'
import './index.scss'

export default {
  props: {
    imageUrls: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      curIndex: 0,
      visible: false
    }
  },
  computed: {
    firstUrl() {
      let url = ''

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
  methods: {
    onClickImg() {
      if (this.imageUrls.length) {
        this.visible = true
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
      <div class="bn-image-preview">
        {
          this.imageUrls.length
            ? [
              <Badge {...attributes}>
                {
                  this.firstUrl
                    ? (
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
                    )
                    : <span></span>
                }
              </Badge>,
              <Modal
                visible={this.visible}
                wrapClassName="bn-image-preview-modal"
                width="90%"
                footer={null}
                oncancel={this.onCancel}
              >
                <img src={this.curUrl} />
                {
                  this.imageUrls.length > 1 ? [
                    <div class="btn up">
                      <Button
                        shape="circle"
                        icon="left"
                        onClick={() => this.onSwitch('up')}
                      />
                    </div>,
                    <div class="btn next">
                      <Button
                        shape="circle"
                        icon="right"
                        onClick={() => this.onSwitch('next')}
                      />
                    </div>
                  ] : null
                }
              </Modal>
            ]
            : <span>-</span>
        }
      </div>
    )
  }
}
