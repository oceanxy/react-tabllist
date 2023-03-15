import { message, Spin, Tree } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 500,
        destroyOnClose: true
      },
      // 树组件的选中数据（可能包含父节点，但不包含半选结点）
      checkedKeys: [],
      // 从 checkedKeys 筛选，只包含叶子节点
      checkedValidKeys: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    usedFunctionsFrequently() {
      return this.getState('usedFunctionsFrequently', this.moduleName)
    },
    treeOfSetUpUsedFunctionsFrequently() {
      return this.getState('treeOfSetUpUsedFunctionsFrequently', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this._visibilityFieldName),
          ok: async () => {
            await this.$store.dispatch('custom', {
              moduleName: this.moduleName,
              payload: { menuIds: this.checkedValidKeys },
              visibilityFieldName: this._visibilityFieldName,
              customApiName: 'updateUsedFunctionsFrequently',
              isFetchList: true,
              parametersOfGetListAction: {
                stateName: 'usedFunctionsFrequently',
                customApiName: 'getListOfUsedFunctionsFrequently'
              }
            })
          }
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.checkedKeys = this.usedFunctionsFrequently.list.map(item => item.menuId)
          this.checkedValidKeys = this.checkedKeys
        }
      }
    }
  },
  methods: {
    onCheck(value, e) {
      this.checkedValidKeys = []

      for (const checkedNode of e.checkedNodes) {
        if (!checkedNode.data.props.isParent) {
          if (this.checkedValidKeys.length === 8) {
            message.warn('最多只能设置8个功能！')
            break
          }

          this.checkedValidKeys.push(checkedNode.data.props.id)
        }
      }

      this.checkedKeys = this.checkedValidKeys
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Spin spinning={this.treeOfSetUpUsedFunctionsFrequently.loading}>
          <Tree
            checkedKeys={this.checkedKeys}
            replaceFields={{
              children: 'children',
              title: 'name',
              key: 'id'
            }}
            multiple
            checkable
            autoExpandParent
            defaultExpandAll
            treeData={this.treeOfSetUpUsedFunctionsFrequently.list}
            onCheck={this.onCheck}
          />
        </Spin>
      </DragModal>
    )
  }
}
