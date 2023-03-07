import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        estateType: {
          loading: false,
          list: []
        },
        modalOfPurchaseVisible: false, //解除弹窗
        modalOfImportVisible: false //导入弹窗
      }
    },
    ['treeIdField', 'sortFieldList', 'details']
  )
