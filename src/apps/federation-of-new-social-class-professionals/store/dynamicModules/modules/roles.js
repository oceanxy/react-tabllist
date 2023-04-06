import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      privilegeTreeList: {
        loading: false,
        list: []
      },
      roleMergerMenuList: {
        loading: false,
        list: []
      },

      visibilityOfMenu: false,
      roleTree: {
        loading: false,
        list: []
      },
      // 配置菜单弹窗内的角色权限菜单数据
      privilege: {
        loading: false,
        list: []
      },
      menuTree: {
        loading: false,
        list: []
      }
    }
  })
