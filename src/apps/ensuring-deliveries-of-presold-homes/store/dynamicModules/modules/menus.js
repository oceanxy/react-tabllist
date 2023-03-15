import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      treeIdField: '',
      roleTree: {
        loading: false,
        list: []
      },
      menuTree: {
        loading: false,
        list: []
      }
    }
  })
