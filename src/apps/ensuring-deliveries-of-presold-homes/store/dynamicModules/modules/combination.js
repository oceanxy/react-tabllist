import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        treeIdField: '',
        organTree: {
          loading: false,
          list: []
        }
      }
    },
    ['details']
  )
