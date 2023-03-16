import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        roleTree: {
          loading: false,
          list: []
        },
        visibilityOfResetPwd: false
      }
    },
    ['details']
  )
