/**
 * 表格混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 16:08:37
 */

import { mapGetters } from 'vuex'
import { message, Table } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import { cloneDeep, omit } from 'lodash'
import { verificationDialog } from '@/utils/message'

/**
 * 用于 table 的混合
 * @param [isInject=true] {boolean} 是否从 inject 导入 moduleName 和 submoduleName，默认 true
 * @param [isFetchList=true] {boolean} 是否在组件初始化完成后立即获取列表数据，默认 true；
 *  如果 TGContainerWithTreeSider 组件向下级组件提供了 notInitList 属性，则 isFetchList 将被重置为 !notInitList；
 *  如果 forModal 混合向下级组件提供了 inModal=true 属性（即表示该表格存在于弹窗中），则 notInitList 失效，以 forTable.isFetchList 为准。
 * @param [stateName='list'] {string} 表格数据在 store.state 里对应的名称
 * @param [customApiName] {string} 自定义请求接口名。
 *  TODO：一般在弹窗内使用；如果弹窗内的列表有增删改操作，目前未适配执行这些操作后的列表刷新，所以当存在这些操作时不要使用该参数。
 * @param [injectQuery=true] {boolean} 是否自动注入路由的 query 参数，默认 true。注意此参数为 true 时，表格的请求参数会被路由 query 中的同名参数覆盖。
 * @returns {Object}
 */
export default ({
  isInject = true,
  isFetchList = true,
  stateName = 'list',
  customApiName,
  injectQuery = true
} = {}) => {
  const _stateName = stateName
  const forTable = {
    mixins: [forIndex],
    inject: {
      // 通知组件在初始化阶段是否自动请求数据。
      // 该变量与 isFetchList 是相同的作用，区别在于 provide 和 inject 可以不限层级的传递数据。
      // 来自于 @/components/TGContainerWithTreeSider 组件。
      notInitList: { default: null },
      // 通知组件是否是弹窗内组件。
      // 来自于 @/mixins/forModal 混合。
      inModal: { default: null },
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
    data() {
      return {
        tableProps: {
          columns: [],
          rowSelection: {
            selections: true,
            fixed: true,
            columnWidth: 50,
            onChange: this.onRowSelectionChange,
            selectedRowKeys: []
          },
          // tableLayout: 'fixed',
          dataSource: [],
          loading: false,
          pagination: false,
          scroll: {}, // 注意：此属性不要手动设置，在this.resize方法内已经自动分配
          size: 'middle',
          bordered: false,
          rowClassName(record, index) {
            return index % 2 === 1 ? 'table-row-background' : ''
          }
        },
        scopedSlots: { serialNumber: this.getConsecutiveSerialNumber },
        exportButtonDisabled: false,
        observer: null,
        timer: null
      }
    },
    computed: {
      ...mapGetters({ getState: 'getState' }),
      loading() {
        return this.getState('loading', this.moduleName, this.submoduleName, false)
      },
      currentItem() {
        return this.getState('currentItem', this.moduleName, this.submoduleName, false)
      },
      rowKey() {
        return this.getState('rowKey', this.moduleName, this.submoduleName, false) || 'id'
      },
      /**
       * 当前页起始序号（一般在存在分页的页面使用）
       * @returns {number}
       */
      currentPageStartNumber() {
        const pagination = this.getState('pagination', this.moduleName, this.submoduleName, false)

        return (pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 10)
      },
      selectedRowKeys() {
        return this.getState('selectedRowKeys', this.moduleName, this.submoduleName, false)
      },
      selectedRows() {
        return this.getState('selectedRows', this.moduleName, this.submoduleName, false)
      },
      sortFieldList() {
        return this.getState('sortFieldList', this.moduleName, this.submoduleName, false)
      },
      primaryColor() {
        return window.themeVariables?.primaryColor
      },
      attributes() {
        const events = {}

        if (this.sortFieldList?.length) {
          events.change = this.onChange
        }

        return {
          props: {
            ...this.tableProps,
            loading: this.loading
          },
          on: { ...events }
        }
      }
    },
    watch: {
      selectedRowKeys: {
        immediate: true,
        handler(value) {
          if (this.tableProps.rowSelection) {
            this.tableProps.rowSelection.selectedRowKeys = value
          }
        }
      },
      /**
       * 监听排序集合，根据后端返回的值初始化表头
       * @param value
       */
      sortFieldList(value) {
        value?.map(sortObj => {
          const index = this.tableProps.columns.findIndex(column => column.dataIndex === sortObj.fieldCode)

          if (index !== -1) {
            this.tableProps.columns.splice(index, 1, {
              ...this.tableProps.columns[index],
              sorter: true,
              sortCode: sortObj.fieldSortCode
            })
          }
        })
      }
    },
    beforeMount() {
      this.tableProps.rowKey = this.rowKey
    },
    created() {
      // this.notInitList: false 表示不在本 Table 组件内请求列表数据。
      // （使用了 @/components/TGContainerWithTreeSider 组件时，为了避免重复请求，会在该组件内请求列表数据，而非本组件）
      if (Object.prototype.toString.call(this.notInitList) === '[object Boolean]' && !this.inModal) {
        isFetchList = !this.notInitList
      }
    },
    async mounted() {
      // 为 list 创建动态侦听器
      if (!this.submoduleName) {
        this.$watch(
          () => this.$store.state[this.moduleName][_stateName],
          async list => {
            this.tableProps.dataSource = list
            this.resize()
          }
        )

        // 检测弹窗内的表格是否注册成为子模块
        if (this.inModal) {
          console.error(
            [
              `如果在弹窗内的 Table 组件中引用了 forTable 混合，请务必将该弹窗组件注册为 ${this.moduleName} 页面的子模块，`,
              '以防止弹窗内的表格组件和当前页面的表格组件的数据产生混淆。'
            ].join('')
          )
        }
      } else {
        this.$watch(
          () => this.$store.state[this.moduleName][this.submoduleName][_stateName],
          async list => {
            this.tableProps.dataSource = list
            this.resize()
          },
          { immediate: true }
        )
      }

      /**
       * 是否在本混合混入的组件的初始化阶段请求表格数据：
       *  · 不在弹窗或子模块内时的逻辑（submoduleName=false）：
       *    1、是 TGContainerWithTreeSider 的子级，isFetchList 被重置为 !notInitList；
       *    2、不是 TGContainerWithTreeSider 的子级，isFetchList 以传入本混合的值为准。
       *  · 在弹窗或子模块内时的逻辑：
       *    1、判断是否在弹窗内。（inModal=true，注意如果弹窗内存在列表，一定要将弹窗注册成为子模块，这是为了不和页面的主列表数据产生混淆）；
       *    2、判断是否在子模块内。（inModal=false，注意此时的 isFetchList 已被重置为 !notInitList）
       */
      if (isFetchList) {
        await this.fetchList()
      }

      window.addEventListener('resize', this.delayResize)

      this.$on('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.delayResize)

        if (this.observer) {
          this.timer = null
          this.observer.disconnect()
          this.observer.takeRecords()
          this.observer = null
        }
      })

      // row-inquiry 为可变高度的容器，这里监听一下该容器的高度变化，用来重置表格的高度
      this.$nextTick(() => {
        const rowInquiry = document.querySelector('.row-inquiry')
        const collapsedChart = document.querySelector('.tg-collapsed-chart')

        if (rowInquiry || collapsedChart) {
          const MutationObserver = window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver

          this.observer = new MutationObserver(() => {
            this.delayResize()
          })

          rowInquiry && this.observer.observe(rowInquiry, {
            attributes: true,
            attributeFilter: ['class']
          })

          collapsedChart && this.observer.observe(collapsedChart, {
            attributes: true,
            attributeFilter: ['class']
          })
        }
      })

      // 为上级组件注入获取 table ref 的逻辑
      if (this.getRefOfChild instanceof Function) {
        this.getRefOfChild(
          this.tableName
            ? this.$refs[this.tableName]
            : this.$refs[`${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`]
        )
      }
    },
    methods: {
      /**
       * 生成连续的序号
       * @param text
       * @param record
       * @param index
       * @returns {*}
       */
      getConsecutiveSerialNumber(text, record, index) {
        record._sn = index + 1 + this.currentPageStartNumber

        return record._sn
      },
      /**
       * 获取列表数据
       * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
       * @param [customApiName] {string} 自定义接口名
       * @returns {Promise<void>}
       */
      async fetchList({ merge, customApiName: apiName } = {}) {
        return await this.$store.dispatch('getList', {
          merge,
          customApiName: apiName || this.customApiName || customApiName,
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          /**
           * 关于 this.stateName 与 _stateName 的解释：
           *  this.stateName 是在混入组件内设置的，可以在 混入组件的 computed 或 data 内定义；
           *
           *  _stateName 为本“混合”的参数，详情见顶部注释。通过“混合”的参数传入，只能传递固定值，
           *  从 Vue.mixins 的特性可知，“混合”并不是在运行时中运行的。
           *  所以此处的 _stateName 只适合在事先确定好的，不会改变的混入组件内使用。
           */
          stateName: this.stateName || _stateName,
          additionalQueryParameters: {
            ...(injectQuery ? this.$route.query : {}),
            // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
            // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
            ...(this.additionalQueryParameters || {})
          }
        })
      },
      /**
       * 行内改变状态
       * @param checked {boolean} 当前状态
       * @param record {Object} 列表数据对象
       * @param [customFieldName='status'] {string} 自定义参数名，用于传递状态变更值。默认 'status'
       * @param [actualFieldName='status'] {string} 列表中实际用于保存该状态的字段名，主要用于被修改状态的字段名不为 'status' 的情况下更新本地数据。
       *  当修改的状态的字段名不为 status 时必传。默认 'status'
       * @param [idKey='id'] {string} 自定义参数ID的名称， 默认 'id'
       * @param [afferentKey='id'] {string} 配置传入接口参数ID的名称， 默认 'id'
       * @param [isBulkOperation] {Array} 'id'默认是传字符串，开启之后支持传数组， 默认 'false'
       * @param [nameKey='fullName'] {string} 自定义名称字段的键，主要用于页面提示。 默认 'fullName'
       * @param [customApiName] {string} 自定义请求接口名，一般在要修改状态字段的表格位于弹窗内时使用。
       * @param [stateName] {string} store.state 中存储该表格数据的字段名，默认 'list'
       * @param [optimisticUpdate=true] {string} 乐观更新，是否在成功调用更新接口后向服务器请求新的列表数据。
       * @param [submoduleName] 在submoduleName被stateName重置的时候可以传入submoduleName值重置
       * @param [custStatusParameter] {object} 自定义状态参数配置，默认{open：1，close：2}
       * 默认true，使用乐观更新，即不向服务器请求新的列表数据，前端执行乐观更新操作。
       * @returns {Promise<void>}
       */
      async onStatusChange({
        checked,
        record,
        customFieldName = 'status',
        actualFieldName = 'status',
        idKey = 'id',
        afferentKey = 'id',
        isBulkOperation = false,
        nameKey = 'fullName',
        customApiName,
        stateName,
        submoduleName,
        custStatusParameter = { open: 1, close: 2 },
        optimisticUpdate = true
      } = {}) {
        stateName = stateName || _stateName

        const status = await this.$store.dispatch('updateStatus', {
          moduleName: this.moduleName,
          customFieldName,
          customApiName,
          stateName: stateName !== 'list' ? stateName : '',
          submoduleName,
          payload: {
            [afferentKey]: isBulkOperation ? [record[this.tableProps.rowKey || 'id']] : record[this.tableProps.rowKey || 'id'],
            [customFieldName]: checked ? custStatusParameter.open : custStatusParameter.close
          }
        })

        const state = this.$store.state[this.moduleName]
        const _dataSource = cloneDeep((state[this.submoduleName] ?? state)[stateName])
        // _dataSource.list 取值是为了适配 store.state 中定义为 “{ loading: false, list: [] }” 结构的数据类型。
        // 如果遇到新的数据结构，可能需要另外的逻辑来适配，这里为了避免报错，赋值为空数组。
        const dataSource = Array.isArray(_dataSource) ? _dataSource : _dataSource.list || []
        const index = dataSource.findIndex(item => item[idKey] === record[idKey])

        if (status) {
          let name

          if (nameKey.includes('.')) {
            name = nameKey.split('.').reduce((prev, curr) => prev[curr], record)
          } else {
            name = record[nameKey]
          }

          message.success([
            <span style={{ color: `${this.primaryColor}` }}>
              {name}
            </span>,
            ' 的状态已更新！'
          ])
        }

        if (optimisticUpdate) {
          if (status) {
            // 更新当前行受控Switch组件的值
            dataSource[index][actualFieldName] = checked ? 1 : 2
          } else {
            // 调用接口失败时，还原值
            dataSource[index][actualFieldName] = checked ? 2 : 1
          }

          this.$store.commit('setState', {
            stateName,
            value: stateName !== 'list' ? { loading: false, list: dataSource } : dataSource,
            moduleName: this.moduleName,
            submoduleName: this.submoduleName
          })
        } else {
          await this.fetchList()
        }
      },
      /**
       * 行内新增
       * @param initialValue {Object} 初始化默认值
       * @param parentId {string} 父级ID
       * @returns {Promise<void>}
       */
      async onAddClick(initialValue, parentId) {
        await this._setVisibilityOfModal({
          parentId,
          ...omit(initialValue, 'id')
        })
      },
      /**
       * 编辑
       * @param record {Object} 列表数据对象
       * @returns {Promise<void>}
       */
      async onEditClick(record) {
        await this._setVisibilityOfModal(record)
      },
      /**
       * 审核或相关意见填写
       * @param record {Object}
       * @param visibilityFieldName {string}
       * @returns {Promise<void>}
       */
      async onAuditClick(record, visibilityFieldName) {
        await this._setVisibilityOfModal(record, visibilityFieldName)
      },
      /**
       * 查看详情
       * @param record {Object}
       * @returns {Promise<void>}
       */
      async onDetailsClick(record) {
        await this._setVisibilityOfModal({ ...record, _disabled: true })
      },
      /**
       * 删除
       * @param record {{_isFreshTree: boolean, [key: string]: any }} 列表数据对象
       *  {
       *    ...record,
       *    _isFreshTree: boolean // 是否刷新侧边树，默认false; 当在本表格组件处于侧边树的下级时默认true，所以此时需要显示定义该字段为 false
       *  }
       * @param [params] {Object} 删除参数，默认 { ids: [record.id] }
       * @param [done] {() => void} 成功执行删除的回调
       */
      async onDeleteClick(record, params = {}, done) {
        if (typeof params === 'function') {
          [params, done] = [{}, params]
        }

        await verificationDialog(
          async () => {
            const status = await this.$store.dispatch('delete', {
              payload: {
                ...params,
                ids: [record.id]
              },
              stateName: _stateName,
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              additionalQueryParameters: {
                ...(injectQuery ? this.$route.query : {}),
                // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
                // 请根据参数的取值和性质自行决定在 data 或 computed 内定义。
                ...(this.additionalQueryParameters || {})
              }
            })

            if (status) {
              // 执行侧边树数据更新
              if (this.inTree && (record._isFreshTree !== false)) {
                this.refreshTree()
              }

              if (typeof done === 'function') {
                done()
              }
            }

            return status
          },
          '确定要删除吗？',
          [
            <span style={{ color: this.primaryColor }}>{record.fullName}</span>,
            ' 已成功删除！'
          ]
        )
      },
      /**
       * 表格行change事件回调
       * @param selectedRowKeys {string[]} 当前所有页码中选中行的ID，翻页不影响选中数据
       * @param selectedRows {Object[]} 当前页选中的数据对象
       * @returns {Promise<void>}
       */
      async onRowSelectionChange(selectedRowKeys, selectedRows) {
        await this.$store.dispatch('setRowSelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {
            selectedRowKeys,
            selectedRows
          }
        })
      },
      /**
       * 导出数据
       * @param payload {Object} 参数
       * @param [fileName] {string} 文件名称，默认路由名称（route.meta.title）
       * @param [visibilityFieldName] 成功导出后需要关闭的弹窗控制字段，一般在弹出
       * @returns {Promise<void>}
       */
      async onExport({ payload, fileName, visibilityFieldName }) {
        message.loading({
          content: '正在导出，请稍候...',
          duration: 0
        })
        this.exportButtonDisabled = true

        await this.$store.dispatch('export', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          additionalQueryParameters: payload,
          fileName: fileName || this.$route.meta.title,
          visibilityFieldName
        })

        this.exportButtonDisabled = false
        message.destroy()
      },
      /**
       * antd vue Table 的 change 事件
       * 分页、排序、筛选变化时触发
       * @param pagination
       * @param filters
       * @param sorter
       * @returns {Promise<void>}
       */
      async onChange(pagination, filters, sorter) {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {
            orderBy: sorter.column.sortCode.replace(
              /\$\{orderby}/,
              sorter.order.substring(0, sorter.order.length - 3)
            )
          },
          isResetSelectedRows: true // 注意此参数要设置为 true。因为排序变了，序号也重新计算了，所以需要清空已选择的行数据
        })
      },
      /**
       * 重新布局，根据页面大小判断是否显示Table组件的滚动条
       * 当且仅当对应store内的state.list发生变化时会自动调用，其余情况请手动调用;
       * 调用方式：建议在监听渲染表格的数据变化时调用
       */
      resize() {
        const tableRef = this.tableName
          ? this.$refs[this.tableName]
          : this.$refs[`${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`]

        if (tableRef) {
          this.$nextTick(() => {
            // 表格元素
            const table = tableRef.$el
            const TABLE_CONTAINER_HEIGHT = table.clientHeight
            const TABLE_TITLE_HEIGHT = table.querySelector('.ant-table-title')?.clientHeight ?? 0

            const TABLE_BODY_WIDTH = table.querySelector('.ant-table-body')?.clientWidth ?? 0
            const HTML_TABLE_BODY_WIDTH = table.querySelector('.ant-table-body > table')?.clientWidth ?? 0
            const HTML_TABLE_BODY_HEIGHT = table.querySelector('.ant-table-body .ant-table-tbody')?.clientHeight ?? 0
            const HTML_TABLE_HEADER = table.querySelector('.ant-table-scroll .ant-table-header')
            // ant-design-vue Table 组件的内部结构会根据内容的多少而变化，以适应表格的内容区滚动，所以这里要分情况获取表格元素
            const HTML_TABLE_HEADER_HEIGHT = HTML_TABLE_HEADER?.clientHeight ??
              table.querySelector('.ant-table-thead')?.clientHeight ??
              0
            const FOOTER_HEIGHT = table.querySelector('.ant-table-footer')?.clientHeight ?? 0
            const scroll = { scrollToFirstRowOnChange: true }

            // 固定列时，需要设置 scroll.x
            if (HTML_TABLE_BODY_WIDTH > TABLE_BODY_WIDTH) {
              scroll.x = TABLE_BODY_WIDTH
            }

            // 这里配合了css的flex布局实现
            if (HTML_TABLE_BODY_HEIGHT + HTML_TABLE_HEADER_HEIGHT + TABLE_TITLE_HEIGHT > TABLE_CONTAINER_HEIGHT) {
              scroll.y = TABLE_CONTAINER_HEIGHT - HTML_TABLE_HEADER_HEIGHT - FOOTER_HEIGHT - TABLE_TITLE_HEIGHT - 2
            }

            this.tableProps.scroll = scroll
          })
        }
      },
      delayResize() {
        // 设置延迟是因为 .row-inquiry 容器 和 .tg-collapsed-chart 容器 的 css过渡动画时间为200ms
        this.timer = setTimeout(this.resize, 200)
      }
    },
    render() {
      return (
        <Table
          // 如果同一子模块内有多个表格时，请为每个表格组件设置唯一的 tableName props。
          // 如果子模块内有且仅有一个表格组件时， tableName props 不是必需的，此时组件会根据 submoduleName 自动生成 tableName props。
          ref={this.tableName || `${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`}
          scopedSlots={this.scopedSlots}
          class={`tg-table${this.tableProps.scroll.x ? '' : ' not-set-x-scroll'}`}
          {...this.attributes}
        />
      )
    }
  }

  if (isInject) {
    forTable.inject = {
      ...forTable.inject,
      // 模块名（页面组件使用 dynamicState 混合后会自动 provide 该属性）
      moduleName: { default: undefined },
      submoduleName: { default: undefined },
      // 获取本组件的ref，依赖 moduleName（从 /src/components/TGContainerWithSider 注入的函数）
      getRefOfChild: { default: () => undefined }
    }
  }

  return forTable
}
