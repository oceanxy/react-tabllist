import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    natureOfTheEnterprise: {
      list: [],
      loading: false
    }
  }
}, [
  'treeIdField',
  'sortFieldList',
  'details'
])
