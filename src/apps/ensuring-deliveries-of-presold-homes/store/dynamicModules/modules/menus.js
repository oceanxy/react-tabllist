import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      treeIdField: '',
      menuTree: {
        loading: false,
        list: []
      }
    }
  })
