import { Button, Icon, Upload } from 'ant-design-vue'
import config from '@/config'

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
    // 最大数量
    limit: {
      type: Number,
      default: 5
    },
    action: {
      type: String,
      default: config.fileUploadPath
    },
    accept: {
      type: String,
      default: '*'
    },
    placeholder: {
      type: String,
      default: '选择文件'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 限制文件大小，单位 Mb
    fileSize: {
      type: Number,
      required: false
    },
    // ant-design Button 组件的 type prop
    buttonType: {
      type: String, // 'primary', 'dashed', 'danger', 'link'
      required: false
    },
    // ant-design Button 组件的 size prop
    buttonSize: {
      type: String, // 'small', 'large'
      required: false
    },
    /**
     * 上传组件所在表单的实例对象（form，用于验证文件并反馈给表单信息）
     */
    form: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      fileList: [],
      previewImage: '',
      previewVisible: false,
      name: 'file',
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
      if (fileList.length > this.limit) {
        this.form?.setFields({
          [this.$attrs.id]: { errors: [new Error(`上传失败，上传数量限制为${this.limit}个`)] }
        })

        return false
      }

      if (this.fileSize && file.size / 1024 / 1024 > this.fileSize) {
        this.form?.setFields({
          [this.$attrs.id]: { errors: [new Error(`上传失败，文件大小限制为${this.fileSize}M！`)] }
        })

        return false
      }
    },
    async handlePreview(file) {
      // if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file.originFileObj)
      // }
      // this.previewImage = file.url || file.preview
      // this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = []
      let err = false

      for (const file of fileList) {
        if (file.status === 'error' || file.status === 'done') {
          // 监测后端返回的上传失败信息
          if ('response' in file && !file.response.status) {
            file.status = 'error'
            err = true

            this.form?.setFields({
              [this.$attrs.id]: {
                errors: [new Error(file.response.message)]
              }
            })

            continue
          }

          // 如果该文件不是新上传的文件且文件路径不存在则判断为上传失败
          if (!('status' in file)) {
            err = true

            // 错误提示已在 beforeUpload 方法中提示，此处不再重复提示

            continue
          }
        }

        if ('status' in file) {
          this.fileList.push(file)
        }
      }

      if (!err) {
        // 防止用户多次上传以超过限制个数
        if (this.fileList.length >= this.limit) {
          this.fileList = this.fileList.slice(0, this.limit)
        }

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
          accept={this.accept}
          action={this.action}
          listType="text"
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
            this.limit > this.fileList.length ? (
              <Button
                disabled={this.disabled}
                type={this.buttonType}
                size={this.buttonSize}
              >
                <Icon type="upload" />
                {this.placeholder}
              </Button>
            ) : null
          }
        </Upload>
      </div>
    )
  }
}
