/**
 * 表格搜索 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { cloneDeep, isBoolean, omit } from 'lodash'
import moment from 'moment'
import { Button, Form, Space } from 'ant-design-vue'

/**
 * 生成用于表格搜索的混合
 * @param [isFetchList=true] {boolean} 是否通过本组件的搜索按钮来请求数据，默认 true。设置为 false 时，将隐藏搜索按钮。
 *  在一些特殊场景，搜索按钮只负责改变 store 内的值，例如：
 *  如果其他组件（如左侧树、页面列表等）有请求数据的逻辑，此处请设置为 false，搜索按钮仅仅用来控制 store.state.search 的值，
 *  发送请求的逻辑交由这些组件来完成。
 * @param [isInitializeFromStore=false] {boolean} 在组件加载成功时，是否把 store 内对应本组件的模块的搜索参数映射到 Form 组件内，默认 false
 * @param [buttonDisabled] {() => boolean} 禁用查询按钮的方法
 * @returns {Object}
 */
export default ({
  isFetchList = true,
  isInitializeFromStore = false,
  buttonDisabledFn
} = {}) => ({
  inject: {
    moduleName: { default: '' },
    submoduleName: { default: '' },
    /**
     * 注入树标识：判断当前组件是否启用侧边树
     * 来自于 @/components/TGContainerWithTreeSider
     */
    inTree: { default: false },
    /**
     * 注入弹窗标识：判断当前组件是否在弹窗内
     * 来自于 @/mixins/forModal
     */
    inModal: { default: false }
  },
  data() {
    return {
      // 为了缓存 onSubmit 的参数
      params: {},
      // 为了缓存 onSubmit 的参数
      options: {},
      // 搜索表单初始化值
      initialValues: {},
      // 按钮禁用状态
      buttonDisabled: false
    }
  },
  computed: {
    search: {
      get() {
        if (this.submoduleName) {
          return this.$store.state[this.moduleName][this.submoduleName].search
        }

        return this.$store.state[this.moduleName].search
      },
      set(value) {
        if (Object.keys(value || {}).length) {
          this.$store.commit('setState', {
            value: this.transformValue(value),
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            stateName: 'search',
            merge: true
          })
        }
      }
    },
    treeCollapsed: {
      get() {
        return this.$store.state['common'].treeCollapsed
      },
      async set(value) {
        this.$store.commit('setState', {
          value,
          moduleName: 'common',
          stateName: 'treeCollapsed'
        })
      }
    },
    sideToggle() {
      return (
        <div class={'tg-inquiry-side-toggle'}>
          <IconFont
            class={`tree-btn${this.treeCollapsed ? ' reverse' : ''}`}
            type={'icon-side-tree-toggle'}
            onClick={this.onTreeFold}
            title={!this.treeCollapsed ? '折叠树' : '展开树'}
          />
        </div>
      )
    },
    operationButtons() {
      return (
        <Space class={'tg-inquiry-form-buttons'}>
          <Button
            disabled={this.buttonDisabled}
            loading={this.loading}
            htmlType="submit"
            type="primary"
            icon="search"
          >
            查询
          </Button>
          <Button
            onClick={this.onClear}
            icon="reload"
          >
            重置并刷新
          </Button>
        </Space>
      )
    },
    content() {
      if (!this.forRender) {
        console.error(`未检测到 ${this.moduleName}${this.submoduleName
          ? `.${this.submoduleName}`
          : ''
        } 内 Inquiry 组件的 forRender 计算属性，请确认！`)

        return undefined
      }

      let content

      if (this.inTree && !this.inModal) {
        if (!Array.isArray(this.forRender)) {
          if (this.forRender?.tag?.includes('AFormItem')) {
            content = (
              <div class={'inquiry-row-for-fields'}>
                {this.sideToggle}
                {this.forRender}
              </div>
            )
          } else {
            this.forRender?.children.unshift(this.sideToggle)
            content = this.forRender
          }
        } else {
          // 至少存在一个表单项
          if (this.forRender.find(VNode => VNode?.tag?.includes('AFormItem'))) {
            content = (
              <div class={'inquiry-row-for-fields'}>
                {this.sideToggle}
                {this.forRender}
              </div>
            )
          } else {
            this.forRender[0]?.children?.unshift(this.sideToggle)

            content = this.forRender
          }
        }
      } else {
        content = (
          <div class={'inquiry-row-for-fields'}>
            {this.forRender}
          </div>
        )
      }

      if (isFetchList) {
        if (!Array.isArray(content)) {
          content?.children?.push(this.operationButtons)
        } else {
          content.at(-1)?.children?.push(this.operationButtons)
        }
      }

      return content
    }
  },
  created() {
    if (typeof buttonDisabledFn === 'function') {
      this.$watch(
        () => this.form?.getFieldsValue(),
        () => {
          this.buttonDisabled = buttonDisabledFn.call(this)

          this.$nextTick(() => {
            // 仅仅为了使用 Form 组件的检验功能来改变必填框的错误状态
            this.form.validateFields(() => {/*写一个空函数，不然控制台会有错误信息输出*/})
          })
        }
      )
    }

    // 同步 store.state.search 与 混入组件中定义的 initialValues，
    // 根据初始值的来源，可自行选择在混入组件的 computed 或 data 中定义 initialValues 对象
    if (isInitializeFromStore) {
      this.initialValues = { ...this.initialValues, ...cloneDeep(this.search) }
    }

    // 监听搜索表单的值的变化，与 store 做同步。以便其他组件执行表格查询时的参数统一
    this.$watch(
      () => this.form.getFieldsValue(),
      async value => {
        await this.$store.commit('setState', {
          value: this.transformValue(value),
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          stateName: 'search',
          merge: true
        })
      }
    )

    this.search = this.initialValues
  },
  mounted() {
    if (!isInitializeFromStore) {
      this.search = this.convertBoolean(cloneDeep(this.form.getFieldsValue()))
    }
  },
  methods: {
    convertBoolean(value) {
      const temp = {}

      Object.entries(value).forEach(([k, v]) => {
        if (isBoolean(v)) {
          temp[k] = v ? 1 : 0
        } else {
          temp[k] = v
        }
      }, {})

      return temp
    },
    /**
     * 此函数值保留一些高频共用类参数的处理
     * @param values
     * @returns {{}}
     */
    transformValue(values) {
      let temp = this.convertBoolean(cloneDeep(values))

      if ('dateRange' in temp) {
        temp.startTime = temp.dateRange[0] ? moment(temp.dateRange[0]).format('YYYYMMDD') : ''
        temp.endTime = temp.dateRange[1] ? moment(temp.dateRange[1]).format('YYYYMMDD') : ''

        temp = omit(temp, 'dateRange')
      }

      if ('datetimeRange' in temp) {
        temp.startTime = temp.datetimeRange[0] ? moment(temp.datetimeRange[0]).format('YYYYMMDDHHmm') : ''
        temp.endTime = temp.datetimeRange[1] ? moment(temp.datetimeRange[1]).format('YYYYMMDDHHmm') : ''

        temp = omit(temp, 'datetimeRange')
      }

      if ('monthRange' in temp) {
        temp.appointmentDateStartMonth = temp.monthRange[0] ? moment(temp.monthRange[0]).format('YYYYMM') : ''
        temp.appointmentDateEndMonth = temp.monthRange[1] ? moment(temp.monthRange[1]).format('YYYYMM') : ''

        temp = omit(temp, 'monthRange')
      }

      return temp
    },
    async onClear() {
      this.form.resetFields()
      await this.onSubmit(null, this.params, this.options)
    },
    async onSearch(payload, options) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        isResetSelectedRows: true,
        additionalQueryParameters: {
          ...this.$route.query,
          // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
          // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
          ...(this.additionalQueryParameters || {})
        },
        isFetchList,
        ...options,
        payload
      })
    },
    /**
     * 查询
     * @param [e] {Event}
     * @param [params] {Object} 其他自定义参数
     * @param [options] {Object} 配置
     */
    onSubmit(e, params, options) {
      e?.preventDefault()

      this.params = params
      this.options = options

      this.form.validateFields(async (err, values) => {
        if (!err) {
          const payload = this.transformValue(values)

          await this.onSearch({ ...payload, ...params }, options)
        }
      })
    },
    onTreeFold() {
      this.treeCollapsed = !this.treeCollapsed
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        {this.content}
      </Form>
    )
  }
})
