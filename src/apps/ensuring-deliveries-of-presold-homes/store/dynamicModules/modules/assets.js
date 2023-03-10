import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfDeveloper: false,
    visibilityOfProject: false,
    natureOfAssets: {
      list: [],
      loading: false
    },
    enumOfDevelopers: {
      list: [],
      loading: false
    },
    enumOfProjects: {
      list: [],
      loading: false
    },
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
