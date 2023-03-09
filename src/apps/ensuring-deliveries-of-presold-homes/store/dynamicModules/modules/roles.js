import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        menuTree: {
          loading: false,
          list: []
        },

        visibilityOfMenu: false,
        organTree: {
          loading: false,
          list: []
        },
        // 配置菜单弹窗内的角色权限菜单数据
        privilege: {
          loading: false,
          list: []
        }
      }
    },
    ['treeIdField', 'sortFieldList', 'details']
  )
