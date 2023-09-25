import { Button, Icon, Upload } from 'ant-design-vue'

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
    // 默认 config.fileUploadPath
    action: {
      type: String,
      default: ''
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
    listType: {
      type: String,
      default: 'text'
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
    },
    /**
     * OSS文件服务配置
     */
    ossConfiguration: {
      type: Object,
      default: null
    },
    /**
     * 通过覆盖默认的上传行为，可以自定义自己的上传实现
     */
    customRequest: {
      type: Function,
      default: null
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
          [this.$attrs.id]: {
            errors: [new Error(`上传失败，上传数量限制为${this.limit}个`)]
          }
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
    handleChange({ file, fileList }) {
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
    },
    setFileList(value) {
      /**
       * 记录一个坑（此注释不要删除，留作警示）
       * 直接改变 this.fileList 会导致 ant-design-vue Upload 组件报错：
       * invalid prop: custom validator check failed for prop "fileList".
       * invalid prop: custom validator check failed for prop "items".
       *
       * 报错代码：
       * this.fileList = [value]
       *
       * 解决方案：
       * 不要对 this.fileList 数组重新赋值（内存地址不能变），但可以对其内部的元素进行更改
       */

      /**
       * @type {number}
       */
      const index = this.fileList.findIndex(item => item.uid === value.uid)

      this.fileList[index] = {
        ...this.fileList,
        ...value
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
          action={this.action || this.$config.fileUploadPath}
          listType={this.listType}
          name={this.name}
          fileList={this.fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          headers={this.headers}
          multiple={true}
          disabled={this.disabled}
          customRequest={
            this.customRequest
              ? rcUploadResponse => this.customRequest(rcUploadResponse, this.setFileList)
              : null
          }
        >
          {
            this.limit > this.fileList.length ? (
              this.listType === 'picture-card' ? (
                <div>
                  <Icon type="plus"></Icon>
                  <p>{this.placeholder}</p>
                </div>
              ) : (
                <Button disabled={this.disabled} type={this.buttonType} size={this.buttonSize}>
                  <Icon type="upload" />
                  {this.placeholder}
                </Button>
              )
            ) : null
          }
        </Upload>
      </div>
    )
  }
}
