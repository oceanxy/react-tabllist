import { Empty, Form, message, Spin, Tree } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 500,
        destroyOnClose: true
      },
      checkedNodes: [],
      checkedKeys: [],
      halfCheckedKeys: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    menuTree() {
      return this.getState('menuTree', this.moduleName)
    },
    roleMergerMenuList() {
      return this.getState('roleMergerMenuList', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit({
            isFetchList: false,
            customApiName: 'setPrivilege',
            customDataHandler: values => {
              // 从选中节点中查找并生成后台需要数据结构
              const checkedNodes = this.checkedNodes.map(item => ({
                objId: item.key,
                plType: item.data.props.tag
              }))

              // 从半选节点key数组中查找并生成后台需要数据结构
              const halfCheckedNodes = this.halfCheckedKeys.map(key => {
                const halfCheckedNode = this.deepQuery(this.menuTree.list, key)

                return {
                  objId: halfCheckedNode.id,
                  plType: halfCheckedNode.tag
                }
              })

              // 合并数据
              const privilegeInfoList = [].concat(checkedNodes, halfCheckedNodes)

              return {
                roleId: values.id || this.currentItem.id,
                privilegeInfoList
              }
            },
            done() {
              message.success('角色权限菜单配置成功！')
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([
            // 获取菜单树
            this.$store.dispatch('getListWithLoadingStatus', {
              moduleName: this.moduleName,
              stateName: 'menuTree',
              customApiName: 'getMenuTree',
              payload: { roleId: this.currentItem.id }
            }),
            // 获取权限菜单（已分配给角色的菜单）
            this.$store.dispatch('getListWithLoadingStatus', {
              moduleName: this.moduleName,
              stateName: 'roleMergerMenuList',
              customApiName: 'getRoleMergerMenuList',
              payload: { roleId: this.currentItem.id }
            })
          ])
        } else {
          // 清空数据

          this.$store.commit('setList', {
            value: [],
            moduleName: this.moduleName,
            stateName: 'menuTree'
          })

          this.$store.commit('setList', {
            value: [],
            moduleName: this.moduleName,
            stateName: 'roleMergerMenuList'
          })
        }
      }
    },
    'roleMergerMenuList.list'(value) {
      this.checkedKeys = value
    }
  },
  methods: {
    onCheck(checkedKeys, e) {
      this.checkedKeys = checkedKeys
      this.checkedNodes = e.checkedNodes
      this.halfCheckedKeys = e.halfCheckedKeys

      // 未知原因导致 forFormModal 内 this.form.isFieldsTouched() 监听未触发，这里手动更新提交按钮状态
      this.modalProps.okButtonProps.props.disabled = false
    },
    deepQuery(tree, id) {
      let isGet = false
      let retNode = null

      function deepSearch(tree, id) {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].children && tree[i].children.length > 0) {
            deepSearch(tree[i].children, id)
          }

          if (id === tree[i].id || isGet) {
            isGet || (retNode = tree[i])
            isGet = true
            break
          }
        }
      }

      deepSearch(tree, id)

      return retNode
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item>
            {
              this.menuTree.list.length && !this.menuTree.loading && !this.roleMergerMenuList.loading
                ? (
                  this.form.getFieldDecorator('privilegeInfoList', {
                    initialValue: this.checkedKeys,
                    valuePropName: 'checkedKeys'
                  })(
                    <Tree
                      replaceFields={{
                        children: 'children',
                        title: 'name',
                        key: 'id'
                      }}
                      checkable={true}
                      selectable={false}
                      treeData={this.menuTree.list}
                      onCheck={this.onCheck}
                      defaultExpandedKeys={[this.menuTree.list?.[0]?.id]}
                      showLine
                    />
                  )
                )
                : (
                  <Spin spinning={this.menuTree.loading || this.roleMergerMenuList.loading}>
                    <Empty />
                  </Spin>
                )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
