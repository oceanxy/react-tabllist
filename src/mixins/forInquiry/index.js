/**
 * 表格搜索 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:33:20
 */

import { cloneDeep, omit } from 'lodash'
import moment from 'moment'

/**
 * 生成用于表格搜索的混合
 * @param isFetchList {boolean} 是否通过本组件的搜索按钮来请求数据，默认 true。
 *  在一些特殊场景，搜索按钮只负责改变 store 内的值，例如：
 *  如果其他组件（如左侧树、页面列表等）有请求数据的逻辑，此处请设置为 false，搜索按钮仅仅用来控制 store.state.search 的值
 * @param isInitializeFromStore {boolean} 在组件加载成功时，是否把 store 内对应本组件的模块的搜索参数映射到 Form 组件内，默认 false
 * @returns {Object}
 */
export default ({
  isFetchList = true,
  isInitializeFromStore = false
} = {}) => {
  return {
    inject: {
      moduleName: { default: '' },
      submoduleName: { default: '' }
    },
    data() {
      return {
        // 为了缓存 onSubmit 的参数
        params: {},
        // 为了缓存 onSubmit 的参数
        options: {},
        // 搜索表单初始化值
        initialValues: {}
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
              value: value,
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              stateName: 'search',
              merge: true
            })
          }
        }
      }
    },
    created() {
      // 同步 store.state.search 与 混入组件中定义的 initialValues，
      // 根据初始值的来源，可自行选择在混入组件的 computed 或 data 中定义 initialValues 对象
      if (isInitializeFromStore) {
        this.initialValues = { ...this.initialValues, ...cloneDeep(this.search) }
      }

      this.search = this.initialValues
    },
    mounted() {
      if (!isInitializeFromStore) {
        this.search = cloneDeep(this.form.getFieldsValue())
      }
    },
    methods: {
      /**
       * 此函数值保留一些高频共用类参数的处理
       * @param values
       * @returns {{}}
       */
      transformValue(values) {
        let temp = cloneDeep(values)

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
      }
    }
  }
}
