/**
 * 弹窗混合 依赖 forIndex。注意如果弹窗内存在列表，一定要将弹窗注册成为子模块，这是为了不和页面的主列表数据产生混淆
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:39:54
 */

import forIndex from '@/mixins/forIndex'

export default customModuleName => {
  const mixinForModal = {
    inject: {
      moduleName: { default: '' },
      submoduleName: { default: '' }
    },
    mixins: [forIndex],
    props: {
      /**
       * 标题（可定义占位符）
       * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
       */
      modalTitle: {
        type: String,
        default: '{action}'
      },
      /**
       * 控制弹窗显示的字段
       */
      visibilityFieldName: {
        type: String,
        default: ''
      },
      /**
       * 在弹窗初始化阶段不清空 store 内存储的详情数据（如果 details 字段存在于 store 内）
       */
      notClear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inModal: true,
        modalProps: {
          loading: false,
          visible: false,
          title: '',
          okText: '提交',
          maskClosable: false,
          confirmLoading: false,
          width: 600,
          style: {
            overflow: 'auto'
            // maxHeight: 'calc(90vh - 100px)'
          }
        }
      }
    },
    computed: {
      loading() {
        return this.$store.state[this.moduleName].loadingDetails
      },
      currentItem() {
        return this.$store.state[this.moduleName].currentItem
      },
      selectedRowKeys() {
        return this.$store.state[this.moduleName].selectedRowKeys
      },
      details() {
        return this.$store.state[this.moduleName].details
      },
      _visibilityFieldName() {
        return this.$parent.$attrs.visibilityFieldName || this.visibilityFieldName
      },
      visible() {
        return this.$store.state[this.moduleName][this._visibilityFieldName] ??
          this.$store.state[this.moduleName][this.submoduleName][this._visibilityFieldName]
      },
      attributes() {
        return {
          attrs: this.modalProps,
          on: { cancel: () => this.onCancel(this._visibilityFieldName) }
        }
      }
    },
    // 通知下层组件，当前处于弹窗中
    provide() {
      return { inModal: this.inModal }
    },
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.title = this.$parent.$attrs.modalTitle || this.modalTitle

            // 如果存在未清空的详情数据，则清空
            if (this.details && !this.notClear) {
              this.$store.commit('setState', {
                value: {},
                moduleName: this.moduleName,
                stateName: 'details'
              })
            }
          }

          this.modalProps.visible = value
        }
      },
      loading() {
        this.modalProps.loading = this.loading
      }
    },
    methods: {
      /**
       * 取消/关闭 弹窗
       * @param [visibilityFieldName] {string} 对应store模块内控制该弹窗的字段名。默认为新增/编辑弹窗的字段名：visibilityOfEdit
       * @param [submoduleName] {string} 子模块名，必须通过参数传入（在需要时传入），否则会引起bug
       * @param [callback] {Function} 关闭后的回调函数
       * @returns {Promise<void>}
       */
      async onCancel(visibilityFieldName, submoduleName, callback) {
        if ('disabled' in (this.modalProps.okButtonProps?.props || {})) {
          this.modalProps.okButtonProps = {
            ...this.modalProps.okButtonProps,
            props: {
              ...this.modalProps.okButtonProps?.props,
              disabled: true
            }
          }
        }

        await this._hideVisibilityOfModal(this._visibilityFieldName || visibilityFieldName, submoduleName)

        if (typeof callback === 'function') {
          callback()
        }
      },
      /**
       * 为弹窗的按钮增加loading状态
       * @param callback {() => Promise<any>} 点击弹窗要执行的逻辑
       * @returns {Promise<void>}
       */
      async onConfirmLoading(callback) {
        this.modalProps.confirmLoading = true

        await callback?.()

        this.modalProps.confirmLoading = false
      }
    }
  }

  // 根据是否传递customModuleName来判断该混合是否需要重置moduleName（使用该 moduleName 把使用本混合的组件连接到其他store模块）
  if (!customModuleName) {
    mixinForModal.inject = ['moduleName']
  } else {
    mixinForModal.computed.moduleName = () => {
      return customModuleName
    }
  }

  return mixinForModal
}
