import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule(
    {
      state: {
        countDate: {
          loading: false,
          monthList: [],
          yearList: []
        },
        threeChatList: {
          loading: false,
          list: [],
          cycleChat: [],
          ringChat: []
        },
        columnarChatList: {
          loading: false,
          list: []
        }
      }
    },
    ['treeIdField', 'sortFieldList', 'details']
  )
