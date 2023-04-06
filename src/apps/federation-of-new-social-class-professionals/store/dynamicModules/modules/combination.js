import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        organTree: {
          loading: false,
          list: []
        }
      }
    },
    ['details']
  )
