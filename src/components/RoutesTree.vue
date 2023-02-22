<template>
  <div class="ten-gen-routes-tree">
    <div class="operation">
      <a-button
        :disabled="disableOperation"
        icon="plus"
        title="添加菜单"
        @click="addRootNode"
      />
      <a-button
        class="generator"
        @click="generateRoutes"
      >生成路由文件
      </a-button>
    </div>
    <a-tree
      :expandedKeys.sync="expandedKeys"
      :tree-data="nodes"
      blockNode
      class="draggable-tree"
      draggable
      showLine
      @dragenter="onDragEnter"
      @drop="onDrop"
    >
      <template v-slot:title="nodeData">
        <a-input
          v-show="nodeData.isOperation"
          :ref="`operationNode-${nodeData.key}`"
          v-model="currentNodeTitle"
          size="small"
        />
        <span v-show="!nodeData.isOperation">{{ nodeData.title }}</span>

        <a-button-group
          v-if="!nodeData.isOperation"
          class="tree-buttons"
        >
          <a-button
            :disabled="disableOperation"
            icon="plus"
            size="small"
            title="添加子级"
            @click="addNode(nodeData)"
          />
          <a-button
            :disabled="disableOperation"
            icon="edit"
            size="small"
            title="修改"
            @click="editNode(nodeData)"
          />
          <a-button
            :disabled="disableOperation"
            icon="delete"
            size="small"
            title="删除"
            @click="deleteNode(nodeData)"
          />
        </a-button-group>
        <a-button-group
          v-else
          class="tree-buttons"
        >
          <a-button
            :disabled="!currentNodeTitle"
            icon="check"
            size="small"
            title="确定"
            @click="insertNode(nodeData)"
          />
          <a-button
            icon="undo"
            size="small"
            title="取消"
            @click="cancel(nodeData)"
          />
        </a-button-group>
      </template>
    </a-tree>
  </div>
</template>

<script>
export default {
  name: 'RoutesTree',
  data: () => ({
    // 当前正在编辑的树节点名称
    currentNodeTitle: '',
    // 树节点渲染数据
    nodes: [
      {
        key: '0',
        title: '首页',
        children: [
          {
            key: '0-1',
            title: '子节点1'
          },
          {
            key: '0-2',
            title: '子节点2'
          }
        ]
      },
      {
        key: '1',
        title: '节点1'
      },
      {
        key: '2',
        title: '节点2'
      }
    ],
    // 当前展开的树节点的key集合
    expandedKeys: [],
    // 禁用树菜单操作
    disableOperation: false,
    // 当前是否是编辑操作
    isEdit: false
  }),
  methods: {
    generateKey() {
      return `${Math.round(Math.random() * 10 ** 10)}`
    },
    loop(data, key, callback) {
      if (!data) {
        data = this.nodes
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data)
          break
        }

        if (data[i].children && data[i].children.length) {
          this.loop(data[i].children, key, callback)
        }
      }
    },
    onDragEnter(info) {
      // console.log(info)
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop(info) {
      const dropKey = info.node.eventKey
      const dragKey = info.dragNode.eventKey
      const dropPos = info.node.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

      // Find dragObject
      let dragObj

      this.loop(null, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })

      if (!info.dropToGap) {
        // Drop on the content
        this.loop(null, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj)
        })
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        this.loop(null, dropKey, item => {
          item.children = item.children || []
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj)
        })
      } else {
        this.loop(null, dropKey, (item, index, arr) => {
          if (dropPosition === -1) {
            arr.splice(index, 0, dragObj)
          } else {
            arr.splice(index + 1, 0, dragObj)
          }
        })
      }
    },
    addNode(nodeData) {
      this.isEdit = false
      this.disableOperation = true
      const key = this.generateKey()

      this.loop(null, nodeData.key, (item, index, arr) => {
        if (!item.children) {
          this.$set(item, 'children', [])
        }

        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift({
          key,
          title: '',
          isOperation: true
        })

        nodeData = {
          ...nodeData, ...item 
        }
      })

      if (!nodeData.expanded) {
        this.expandedKeys.splice(0, 0, nodeData.key)
      }

      this.$nextTick(() => {
        this.$refs[`operationNode-${nodeData.children[0].key}`].focus()
      })
    },
    addRootNode() {
      this.isEdit = false
      this.disableOperation = true
      const key = this.generateKey()

      this.nodes.splice(0, 0, {
        title: this.currentNodeTitle,
        key,
        isOperation: true
      })

      this.$nextTick(() => {
        this.$refs[`operationNode-${key}`].focus()
      })
    },
    insertNode(nodeData) {
      this.loop(null, nodeData.key, (item, index, arr) => {
        arr.splice(index, 1, {
          title: this.currentNodeTitle,
          key: this.generateKey()
        })
      })

      this.currentNodeTitle = ''
      this.disableOperation = false
    },
    cancel(nodeData) {
      if (this.isEdit) {
        this.disableOperation = false

        this.loop(null, nodeData.key, (item, index, arr) => {
          this.currentNodeTitle = ''
          arr[index].isOperation = false
        })
      } else {
        this.onCancelAddNode(nodeData)
      }
    },
    onCancelAddNode(nodeData) {
      this.loop(null, nodeData.key, (item, index, arr) => {
        arr.splice(index, 1)
        this.disableOperation = false
        this.currentNodeTitle = ''
      })
    },
    editNode(nodeData) {
      this.disableOperation = true
      this.isEdit = true

      this.loop(null, nodeData.key, (item, index, arr) => {
        this.currentNodeTitle = arr[index].title
        arr[index].isOperation = true
      })

      this.$nextTick(() => {
        this.$refs[`operationNode-${nodeData.key}`].focus()
      })
    },
    deleteNode(nodeData) {
      this.loop(null, nodeData.key, (item, index, arr) => {
        arr.splice(index, 1)
      })
    },
    generateRoutes() {
      //
    }
  }
}
</script>

<style lang="scss">
.ten-gen-routes-tree {
  .operation {
    display: flex;

    .generator {
      margin-left: auto;
    }
  }

  .draggable-tree {
    width: 300px;

    & > li:first-child,
    & > li:last-child {
      padding: 0;
    }

    &.ant-tree-show-line li span.ant-tree-switcher {
      //color: white;
      background: none;
    }

    .ant-tree-child-tree > li:first-child,
    .ant-tree-child-tree > li:last-child {
      padding: 0;
    }

    .ant-tree-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .tree-buttons {
        margin-left: 20px;

        button {
          font-size: 12px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
