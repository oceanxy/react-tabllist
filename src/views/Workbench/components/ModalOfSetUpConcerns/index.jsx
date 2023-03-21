import './index.scss'
import { Button, Spin, Tree } from 'ant-design-vue'
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
    userConcern() {
      return this.getState('userConcern', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this._visibilityFieldName),
          ok: async () => {
            // await this.$store.dispatch('custom', {
            //   moduleName: this.moduleName,
            //   payload: { },
            //   visibilityFieldName: this._visibilityFieldName,
            //   customApiName: '',
            //   isFetchList: true,
            //   parametersOfGetListAction: {
            //     stateName: '',
            //     customApiName: ''
            //   }
            // })
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
          //
        }
      }
    }
  },
  methods: {
    onCheck(value, e) {
      //
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'set-up-concerns'}>
        <Spin spinning={this.userConcern.loading}>
          <Tree
            replaceFields={{
              children: 'children',
              title: 'name',
              key: 'id'
            }}
            multiple
            draggable
            blockNode
            selectable={false}
            treeData={this.userConcern.list}
            onCheck={this.onCheck}
            scopedSlots={{
              title(nodeData) {
                return [
                  <span>{nodeData.name}</span>,
                  <Button size={'small'} class={'up-btn'}>
                    <Icon-Font type={'icon-global-up'} />
                  </Button>,
                  <Button size={'small'} class={'down-btn'}>
                    <Icon-Font type={'icon-global-down'} />
                  </Button>
                ]
              }
            }}
          />
        </Spin>
      </DragModal>
    )
  }
}
