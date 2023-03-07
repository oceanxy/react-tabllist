import { Icon, message, Modal, Upload } from 'ant-design-vue'
import { getBase64 } from '@/utils/utilityFunction'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 最大图片数量
    limit: {
      type: Number,
      default: 5
    },
    action: {
      type: String,
      default: '/api/system/upload/image'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      previewImage: '',
      previewVisible: false,
      name: 'files',
      headers: { token: localStorage.getItem('token') }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value && value.length) {
          this.fileList = value.map((item, index) => {
            if ('uid' in item) {
              return item
            } else {
              return {
                uid: item.key + index,
                key: item.key,
                url: item.path,
                status: 'done',
                name: item.fileName
              }
            }
          })
        } else {
          this.fileList = []
        }
      }
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      if (this.fileList.length >= this.limit) {
        message.warning(`上传数量限制为${this.limit}个`)

        return false
      }
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ file, fileList }) {
      if (fileList.length > this.limit) {
        fileList = fileList.slice(0, this.limit)
      }

      this.fileList = fileList

      if (file.status === 'done') {
        this.$emit('change', this.fileList)
      }
    }
  },
  render() {
    return (
      <div
        style={{
          margin: '4px 0',
          lineHeight: 0,
          flex: 'auto'
        }}
      >
        <Upload
          accept={'.png,.jpg'}
          action={this.action}
          listType="picture-card"
          name={this.name}
          fileList={this.fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          headers={this.headers}
          multiple={true}
          disabled={this.disabled}
        >
          {
            this.fileList.length < this.limit
              ? (
                <div class={'tg-upload-pic'}>
                  <Icon type={'plus'} />
                  <div class="ant-upload-text">上传</div>
                </div>
              )
              : null
          }
        </Upload>
        <Modal
          visible={this.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style="width: 100%"
            src={this.previewImage}
          />
        </Modal>
      </div>
    )
  }
}
