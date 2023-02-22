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
    props: {
      /**
       * 用于替换 modalTitle 内的 {action} 的候选值
       */
      candidateTitle: {
        type: Array,
        default: () => ['编辑', '新增']
      }
    },
    data() {
      return {
        visibilityFieldName: 'visibilityOfEdit',
        modalProps: { okButtonProps: { props: { disabled: disableSubmitButton } } }
      }
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
          }
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
       * @param [isFetchList=true] {boolean} 是否在成功提交表单后刷新对应的列表，默认 true
       * @param [isResetSelectedRows] {boolean} 是否在成功提交表单后重置列表的选中行数据，默认 false
       * @param [customApiName] {string} 自定义请求API
       * @param [customAction='custom'] {string} 自定义请求 action。默认 'custom'，依赖 customApiName。
       *    (action 列表请在 /src/store/actions.js 内查看，TODO 目前只适配了部分 action)
       * @param [customValidation] {() => boolean} 自定义验证函数
       * @param [customDataHandler] {(values) => Object} 自定义参数处理
       * @param [done] {() => void} 提交成功后的回调函数
       */
      onSubmit({
        isFetchList = true,
        isResetSelectedRows,
        customApiName,
        customAction = 'custom',
        customValidation,
        customDataHandler,
        done
      } = {}) {
        this.form.validateFieldsAndScroll(async (err, values) => {
          let validation = true

          if (typeof customValidation === 'function') {
            validation = customValidation()
          }

          if (!err && validation) {
            this.modalProps.confirmLoading = true

            let action
            let payload = this.transformValue(values)

            // 根据 this.currentItem.id 判断当前表单的提交模式，
            // 如果存在 customApiName，则可自定义请求模式
            if (!customApiName) {
              if (this.currentItem?.id) {
                // 存在 ID 为编辑模式
                action = 'update'
                payload.id = this.currentItem.id
              } else {
                // 不存在 ID 则为新增模式
                action = 'add'
              }
            } else {
              // 自定义表单提交模式
              action = customAction || 'custom'
            }

            // 自定义处理请求参数
            if (typeof customDataHandler === 'function') {
              payload = customDataHandler(payload)
            }

            const status = await this.$store.dispatch(action, {
              moduleName: this.moduleName,
              visibilityFieldName: this.visibilityFieldName,
              isFetchList,
              customApiName,
              // 请求参数
              payload,

              // action 为 'custom' 是可用。是否重置表格行选择框的选中内容。
              isResetSelectedRows,
              // action 为 'export' 时可用。
              // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
              fileName: this.fileName,

              // 附加请求参数，获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
              // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
              additionalQueryParameters: {
                ...this.$route.query,
                ...(this.additionalQueryParameters || {})
              }
            })

            if (status) {
              // 操作提示消息
              message(status)

              // 成功回调
              if (typeof done === 'function') {
                done()
              }
            }

            this.modalProps.confirmLoading = false
          }
        })
      }
    }
  }
}
