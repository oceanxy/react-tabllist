/**
 * 表格功能按钮混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forIndex from '@/mixins/forIndex'
import { verificationDialog, verifySelected } from '@/utils/message'
import { mapGetters } from 'vuex'
import { Button, message, Space } from 'ant-design-vue'

/**
 * 为表格功能按钮生成 mixin
 * @param [controlButtonPermissions] {function} 用于控制按钮禁用权限的回调函数。
 *  接收一个参数。当前选中行数组。
 *  返回一个对象，对象的键为控制禁用权限的字段名，对象的值为布尔值。
 *  默认不传，相当于至少勾选了一行列表即解除禁用。
 * @param [overrideDefaultButtons] {boolean} 混入组件内 forRender 函数的返回值是否覆盖本混合内 render 函数的内容。默认 false
 * @returns {Object}
 */
export default ({ controlButtonPermissions, overrideDefaultButtons } = {}) => ({
  inject: {
    moduleName: { default: null },
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
  mixins: [forIndex],
  data() {
    return {
      editButtonDisabled: true,
      deleteButtonDisabled: true,
      auditButtonDisabled: true,
      exportButtonDisabled: false,
      editedRow: {},
      ids: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName)
    },
    selectedRows() {
      return this.getState('selectedRows', this.moduleName)
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].selectedRows,
      selectedRows => {
        this.editButtonDisabled = selectedRows.length !== 1
        this.deleteButtonDisabled = !selectedRows.length
        this.auditButtonDisabled = !selectedRows.length

        if (typeof controlButtonPermissions === 'function') {
          Object.entries(controlButtonPermissions(selectedRows)).forEach(([key, value]) => {
            this[key] = value
          })
        }

        if (selectedRows.length === 1) {
          this.editedRow = selectedRows[0]
        } else {
          this.editedRow = {}
        }

        this.ids = selectedRows.map(item => item.id).join()
      }
    )
  },
  methods: {
    /**
     * 新增
     * @param [initialValue] {Object} 初始化默认值
     * @returns {Promise<void>}
     */
    async onCustomAddClick(initialValue = {}) {
      await this._setVisibilityOfModal({ ...initialValue })
    },
    /**
     * 编辑
     * @returns {Promise<void>}
     */
    async onCustomEditClick() {
      await this._setVisibilityOfModal(this.editedRow)
    },
    /**
     * 审核或相关意见填写的批量操作
     * @param [visibilityFieldName] {string} 弹窗控制字段 默认 visibilityOfEdit
     * @returns {Promise<void>}
     */
    async onCustomAuditClick(visibilityFieldName) {
      await this._setVisibilityOfModal({ ids: this.ids }, visibilityFieldName)
    },
    /**
     * 删除
     * @param [done] {() => void} 成功执行删除的回调
     * @returns {Promise<void>}
     */
    async onCustomDeleteClick(done) {
      await verificationDialog(
        async () => {
          const status = await this.$store.dispatch('delete', { moduleName: this.moduleName })

          if (status && this.inTree) {
            this.refreshTree()
          }

          if (status && typeof done === 'function') {
            done()
          }

          return Promise.resolve(status)
        },
        <div>
          <div>确定要批量删除已选中的数据吗？</div>
          <div style={{ color: '#b9b9b9' }}>
            当前已勾选的序号为：
            {
              this.selectedRows
                .map(item => item._sn)
                .sort((a, b) => a - b)
                .join('，')
            }
          </div>
        </div>
      )
    },
    /**
     * 批量操作之前的询问，并验证是否勾选了表格数据
     * @param visibilityFieldName {string}
     * @param [params] {Object}
     */
    async onBulkOperations(visibilityFieldName, params) {
      await verifySelected(this.selectedRowKeys, () => {
        this._setVisibilityOfModal(
          {
            ids: this.selectedRowKeys,
            ...params
          },
          visibilityFieldName
        )
      })
    },
    /**
     * 导出功能
     * @param [fileName] {string} 导出文件名 默认为本页面的 title
     * @param [payload] {Object} 自定义导出参数，会联合该模块的 store.state.search 一起传递给接口
     * @param [customApiName] {string} 自定义导出接口名
     * @returns {Promise<void>}
     */
    async onCustomExport(fileName, payload, customApiName) {
      message.loading({
        content: '正在导出，请稍候...',
        duration: 0
      })

      this.exportButtonDisabled = true

      await this.$store.dispatch('export', {
        moduleName: this.moduleName,
        additionalQueryParameters: this.$route.query,
        fileName: fileName || this.$route.meta.title,
        payload,
        customApiName
      })

      this.exportButtonDisabled = false
      message.destroy()
    }
  },
  render() {
    return (
      <Space class="tg-function">
        {
          !overrideDefaultButtons
            ? (
              <Button
                type="primary"
                onClick={() => this.onCustomAddClick()}
                icon="plus"
              >
                新增
              </Button>
            )
            : null
        }
        {this.forRender}
      </Space>
    )
  }
})
