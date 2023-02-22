import apis from '@/apis'
import { message } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        parkList: [],
        messageLoading: false,
        messageList: [],
        backLogLoading: false,
        backLogInfo: {}
      },
      mutations: {
        set_backLogInfo(state, payload) {
          state.backLogInfo = payload
        },
        set_backLogLoading(state, value) {
          state.backLogLoading = value
        },
        set_messageLoading(state, value) {
          state.messageLoading = value
        },
        set_messageList(state, payload) {
          state.messageList = payload
        }
      },
      actions: {
        async getMessage({ commit }) {
          const form = {
            pageIndex: 0,
            pageSize: 10,
            messagePlatform: 2
          }

          commit('set_messageLoading', true)
          const res = await apis.getNews(form)

          commit('set_messageLoading', false)

          if (res.status) {
            commit('set_messageList', res.data.rows || [])
          }

          return res
        },
        async getBackLogList({ commit }) {
          commit('set_backLogLoading', true)
          const res = await apis.getBackLogList({ messagePlatform: 2 })

          commit('set_backLogLoading', false)

          if (res.status) {
            commit('set_backLogInfo', res.data || {})
          }

          return res
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibilityOfEdit', 'state.pagination', 'state.search']
  )
