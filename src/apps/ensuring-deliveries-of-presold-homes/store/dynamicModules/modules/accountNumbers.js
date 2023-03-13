import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        treeIdField: '',
        roleTree: {
          loading: false,
          list: []
        },
        visibilityOfResetPwd: false
      }
    },
    ['details']
  )
