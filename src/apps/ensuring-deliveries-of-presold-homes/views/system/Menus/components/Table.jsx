import forTable from '@/mixins/forTable'
import { Button, Space, Switch, Tag } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '菜单标题',
            width: 160,
            dataIndex: 'menuName'
          },
          {
            title: '路由名称',
            width: 160,
            dataIndex: 'name'
          },
          {
            title: 'path',
            width: 160,
            dataIndex: 'menuUrl'
          },
          {
            title: '重定向',
            width: 160,
            dataIndex: 'extend1'
          },
          {
            title: '是否隐藏(客户端控制)',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'hide' }
          },
          {
            title: '是否显示(服务端控制)',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'isShow' }
          },
          {
            title: '是否首选',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'isDefault' }
          },
          {
            title: '缓存页面',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'keepAlive' }
          },
          {
            title: '需要登录',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'requiresAuth' }
          },
          {
            title: '隐藏面包屑',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'hideBreadCrumb' }
          },
          {
            title: '隐藏子级',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'hideChildren' }
          },
          {
            title: '排序',
            align: 'center',
            width: 100,
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            width: 100,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 130,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        serialNumber: (text, record, index) => {
          return <span>{index + 1}</span>
        },
        isShow: (text, record) => {
          return record.isShow === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        keepAlive: (text, record) => {
          return record.keepAlive === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        requiresAuth: (text, record) => {
          return record.requiresAuth === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        hideBreadCrumb: (text, record) => {
          return record.hideBreadCrumb === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        hideChildren: (text, record) => {
          return record.hideChildren === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        hide: (text, record) => {
          return record.hide === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        isDefault: (text, record) => {
          return record.isDefault === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
        },
        status: (text, record) => {
          return (
            <Switch
              checked={record.status === 1}
              onChange={checked => this.onStatusChange({ checked, record })}
            />
          )
        },
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  },
  computed: {
    // 学校及学校下级禁用新增、修改或删除等一切操作
    isFeatureDisabled() {
      const { type } = this.$store.state[this.moduleName].search

      // 类型（1.区 2.职能部门 3.街道 4.学校顶级 5.学校 6.年级 7.班级）
      return [4, 5, 6, 7].includes(type)
    },
    tableSelectedRowKeys() {
      if (this.getState('selectedRowKeys', this.moduleName).length > 0) {
        return false
      } else {
        return true
      }
    },
  }
}
