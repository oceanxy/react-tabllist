import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      menuTree: {
        loading: false,
        list: []
      }
    }
  })
