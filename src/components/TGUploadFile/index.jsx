import { Button, Icon, Upload } from 'ant-design-vue'
import { uuid } from '@/utils/utilityFunction'

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
      default: 2
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
      fileListBackup: [],
      previewImage: '',
      previewVisible: false,
      name: 'file',
      headers: { token: localStorage.getItem('token') }
    }
  },
  computed: {
    isError() {
      return this.fileList.findIndex(item => item.status === 'error') > -1
    }
  },
  watch: {
    value: {
      deep: true,
      handler(value) {
        const temp = []

        if (value?.length) {
          value.forEach(item => {
            if (!this.fileListBackup.find(i => i.uid === item.uid)) {
              if ('uid' in item) {
                temp.push(item)
              } else {
                temp.push({
                  uid: uuid(),
                  key: item.key,
                  url: item.path,
                  status: 'done',
                  name: item.fileName
                })
              }
            }
          })
        }

        // 回填上传组件
        this.fileList = this.fileListBackup.concat(temp)
        // 清空缓存值
        this.fileListBackup = []
      }
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      if (file.size / 1024 / 1024 > this.fileSize) {
        file.status = 'error'
        file.error = new Error('文件大小超过限制，上传失败。')
        file.response = '文件大小超过限制，上传失败。'

        return false
      }

      // 非错误状态的文件都纳入计数范围，统计已经上传和正在上传的文件的总数。
      // 超过数量限制的文件的状态将被修改为错误状态，即通知组件不再上传该文件
      const index = this.fileList.concat(fileList)
        .filter(item => item.status !== 'error')
        .findIndex(item => item.uid === file.uid)

      if (index >= this.limit) {
        file.status = 'error'
        file.error = new Error('文件上传数量超过限制，上传失败')
        file.response = '文件上传数量超过限制，上传失败'

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
      let _fileList = [...fileList]

      _fileList = _fileList.map(file => {
        if (file.status === 'done' && file.response?.status) {
          file.url = file.response.url
        }

        return file
      })

      // 为上传组件赋值
      this.fileList = _fileList
      // 缓存值
      this.fileListBackup = [..._fileList]

      if (this.isError) {
        // 只要存在错误，就清空回传的文件
        this.$emit('change', [])
      } else {
        // 没有报错的文件，回传已经上传成功的文件
        this.$emit('change', this.fileList.filter(item => item.status === 'done'))
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
              ? rcUploadResponse => this.customRequest(rcUploadResponse)
              : null
          }
        >
          {
            this.limit > this.fileList.length ? (
              this.listType === 'picture-card'
                ? (
                  <div>
                    <Icon type="plus"></Icon>
                    <p>{this.placeholder}</p>
                  </div>
                )
                : (
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
