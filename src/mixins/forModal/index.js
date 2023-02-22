/**
 * 弹窗混合 依赖 forIndex。注意如果弹窗内存在列表，一定要将弹窗注册成为子模块，这是为了不和页面的主列表数据产生混淆
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:39:54
 */

import { mapGetters } from 'vuex'
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
      }
    },
    data() {
      return {
        inModal: true,
        visibilityFieldName: '',
        modalProps: {
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
      ...mapGetters({ getState: 'getState' }),
      currentItem() {
        return this.getState('currentItem', this.moduleName)
      },
      details() {
        return this.getState('details', this.moduleName) || {}
      },
      visible() {
        return this.getState(this.visibilityFieldName, this.moduleName) ??
          this.getState(this.visibilityFieldName, this.moduleName, this.submoduleName)
      },
      attributes() {
        return {
          attrs: this.modalProps,
          on: { cancel: () => this.onCancel(this.visibilityFieldName) }
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
          }

          this.modalProps.visible = value
        }
      }
    },
    methods: {
      /**
       * 取消/关闭 弹窗
       * @param [visibilityFieldName] {string} 对应store模块内控制该弹窗的字段名。默认为新增/编辑弹窗的字段名：visibilityOfEdit
       * @param [submoduleName] {string} 子模块名，必须通过参数传入（在需要时传入），否则会引起bug
       * @returns {Promise<void>}
       */
      async onCancel(visibilityFieldName, submoduleName) {
        await this._dispatch(
          'setModalVisible',
          {
            statusField: visibilityFieldName,
            statusValue: false
          },
          {
            root: true,
            submoduleName: submoduleName
          }
        )

        if ('disabled' in (this.modalProps.okButtonProps?.props || {})) {
          this.modalProps.okButtonProps = {
            ...this.modalProps.okButtonProps,
            props: {
              ...this.modalProps.okButtonProps?.props,
              disabled: true
            }
          }
        }
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
