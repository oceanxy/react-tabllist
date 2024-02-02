import { Icon, message, Modal, Upload } from 'ant-design-vue'
import { getBase64, getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

export default {
  name: 'TGUploadPictures',
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
    // 默认 config.imageUploadPath
    action: {
      type: String,
      default: ''
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
      name: 'file',
      headers: { token: localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`) }
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
      this.fileList = []
      let err = false

      for (const file of fileList) {
        if ('response' in file && !file.response.status) {
          file.status = 'error'
          file.response = file.response.message
          err = true
        }

        this.fileList.push(file)
      }

      if (!err) {
        if (this.fileList.length >= this.limit) {
          this.fileList = this.fileList.slice(0, this.limit)
        }

        this.$emit('change', this.fileList)
      } else {
        this.form.setFields({
          [this.$attrs.id]: {
            value: this.fileList,
            errors: [new Error('请上传合法的文件！')]
          }
        })
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
          accept={'.png,.jpg,.jpeg'}
          action={this.action || this.$config.imageUploadPath}
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
