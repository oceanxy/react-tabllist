/**
 * 新增/编辑弹窗 依赖 forModal 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forModal from '@/mixins/forModal'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'
import { message } from '@/utils/message'

/**
 * @param [disableSubmitButton=true] {boolean} 加载表单后，在未修改表单内任一项的值之前，禁用提交按钮
 * @returns {Object}
 */
export default ({ disableSubmitButton = true } = {}) => {
  return {
    mixins: [forModal()],
    inject: {
      /**
       * 判断本页面是否存在侧边树组件
       * 来自于 @/src/components/TGContainerWithTreeSider 组件
       */
      inTree: { default: false },
      /**
       * 刷新侧边树的数据
       * 来自于 @/src/components/TGContainerWithTreeSider 组件
       */
      refreshTree: { default: null }
    },
    props: {
      /**
       * 用于替换 modalTitle 内的 {action} 的候选值
       */
      candidateTitle: {
        type: Array,
        default: () => ['编辑', '新增']
      },
      /**
       * 控制弹窗显示的字段（本混合默认为 “visibilityOfEdit”）
       */
      visibilityFieldName: {
        type: String,
        default: 'visibilityOfEdit'
      }
    },
    data() {
      return { modalProps: { okButtonProps: { props: { disabled: disableSubmitButton } } } }
    },
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.okButtonProps.props.disabled = disableSubmitButton
            this.modalProps.title = (this.$parent.$attrs.modalTitle || this.modalTitle).replace(
              '{action}',
              this.currentItem.id
                ? this.$parent.$attrs.candidateTitle?.[0] || this.candidateTitle[0]
                : this.$parent.$attrs.candidateTitle?.[1] || this.candidateTitle[1]
            )
          } else {
            this.form.resetFields()
          }
        }
      }
    },
    created() {
      // 进入表单弹窗时，做任何修改之前禁用提交按钮
      if (this.form && disableSubmitButton) {
        this.$watch(
          () => this.form?.isFieldsTouched(),
          () => {
            this.modalProps.okButtonProps.props.disabled = false
          },
          { deep: true }
        )
      }
    },
    methods: {
      // 此处仅处理共用字段。如 status, dateRange, datetimeRange 等。
      // 组件内独有字段请在 forFormModal 的 customDataHandler 回调函数内处理，
      // 也可以在 form.getFieldDecorator 内使用 getValueFromEvent 和 getValueProps 结合来处理。
      transformValue(values) {
        let temp = cloneDeep(values)

        if ('status' in temp) {
          temp.status = temp.status ? 1 : 2
        }

        if ('dateRange' in temp) {
          temp.startTime = moment(temp.dateRange[0]).format('YYYYMMDD')
          temp.endTime = moment(temp.dateRange[1]).format('YYYYMMDD')

          temp = omit(temp, 'dateRange')
        }

        return temp
      },
      /**
       * 提交表单
       * 注意 isResetSelectedRows 参数很重要，该清空 selectedRowKeys 一定要清空，不然会造成下次请求时的参数重叠。
       * 主要应用在“删除”等会减少列表数据量的操作中
       * @param [refreshTree=false] {boolean} 是否在成功提交表单后刷新对应的侧边树，默认 false。依赖 inject.inTree 和 inject.refreshTree()
       * @param [isFetchList=true] {boolean} 是否在成功提交表单后刷新对应的列表，默认 true
       * @param [isResetSelectedRows] {boolean} 是否在成功提交表单后重置列表的选中行数据，默认 false
       * @param [customApiName] {string} 自定义请求API
       * @param [customAction] {string} 自定义请求 action。
       *  可选值 'add'/'update'/'custom'：
       *  新增弹窗时的默认 'add'，编辑弹窗时的默认 'update'，非以上二者时默认为 'custom'，此时需要配合 customApiName 一起使用。
       *  特例（批量更新），需要明确指定为 'update'。
       *  默认值判断具体规则：
       *  优先根据当前被操作的数据是否存在 id 字段来判断，
       *  如果不存在，则根据 customAction 字段来判断。
       * @param [customValidation] {() => boolean} 自定义验证函数（请使用箭头函数）
       * @param [customDataHandler] {values => Object} 自定义参数处理（请使用箭头函数）
       * @param [done] {response => void} 提交成功后的回调函数（请使用箭头函数）
       */
      onSubmit({
        refreshTree,
        isFetchList = true,
        isResetSelectedRows,
        customApiName,
        customAction,
        customValidation,
        customDataHandler,
        done
      } = {}) {
        if (customAction && !['add', 'update', 'custom'].includes(customAction)) {
          customAction = 'custom'
        }

        this.form.validateFieldsAndScroll(async (err, values) => {
          let validation = true

          if (typeof customValidation === 'function') {
            validation = customValidation()
          }

          if (!err && validation) {
            this.modalProps.confirmLoading = true

            let action
            let payload = this.transformValue(values)

            // 优先根据 this.currentItem.id 判断当前表单的提交模式，customAction 字段次之。
            // 并为 request 的参数设置对应的 ID。
            if (this.currentItem?.id) {
              // 为编辑模式
              action = 'update'
              payload.id = this.currentItem.id
              payload.ids = payload.id // 兼容批量操作的情况
            } else {
              if (!customAction || customAction === 'add') {
                // 新增模式
                action = 'add'
              } else {
                // 默认为自定义模式
                // 这里存在一个特例——批量更新（update）——需要明确定义 customAction 为 'update' 才会触发更新操作，
                // 否则会触发自定义操作（custom）
                action = customAction || 'custom'
                payload.id = this.selectedRowKeys?.join?.(',')
                payload.ids = payload.id // 兼容批量操作的情况
              }
            }

            if (action === 'custom' && !customApiName) {
              throw new Error(`${this.moduleName}内有表单弹窗设置错误：未定义自定义的接口名称（customApiName）！`)
            }

            // 自定义处理请求参数
            if (typeof customDataHandler === 'function') {
              payload = customDataHandler(payload)
            }

            const options = {
              moduleName: this.moduleName,
              visibilityFieldName: this._visibilityFieldName,
              isFetchList,
              customApiName,
              // 请求参数
              payload,
              // 附加请求参数，获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
              // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
              additionalQueryParameters: {
                ...this.$route.query,
                ...(this.additionalQueryParameters || {})
              }
            }

            // action 为 'custom' 时可用。是否重置表格行选择框的选中内容。
            if (action === 'custom') {
              options.isResetSelectedRows = isResetSelectedRows
            }

            // action 为 'export' 时可用。
            // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
            if (action === 'export') {
              options.fileName = this.fileName
            }

            const response = await this.$store.dispatch(action, options)

            let status

            if (typeof response === 'boolean') {
              status = response
            } else {
              status = response?.status
            }

            if (status) {
              // 操作提示消息
              message(response.status)

              // 执行侧边树刷新操作
              if (refreshTree && this.inTree) {
                this.refreshTree()
              }

              // 执行回调
              if (typeof done === 'function') {
                done(response)
              }
            }

            this.modalProps.confirmLoading = false
          }
        })
      }
    }
  }
}
