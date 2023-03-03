import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({}, [
  'treeIdField',
  'sortFieldList',
  'details'
])
