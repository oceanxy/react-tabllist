import JSEncrypt from 'jsencrypt'
import config from '@/config'
import { message } from 'ant-design-vue'
import router from '@/router'
import moment from 'moment'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'

const appName = getFirstLetterOfEachWordOfAppName()

export default {
  namespaced: true,
  state: {
    // 加载用户信息的状态
    loading: false,
    // 最后一次登录时间，用来判断用户信息的新旧程度，实现前端主动在一个合适的时间重新验证 token 有效性
    lastLoginTime: undefined,
    // 最后一次登录 token，用来比较是否刷新用户信息
    lastLoginToken: '',
    // 用户信息
    userInfo: {},
    // 全局修改密码弹窗的显示状态
    visibilityOfEditPassword: false,
    // 验证码
    codeKey: '',
    // 用于保存当前页面内弹窗可能用到的临时数据
    currentItem: {}
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setLastLogin(state, payload) {
      state.lastLoginTime = payload.time
      state.lastLoginToken = payload.token
    },
    setAuthentication(state, payload) {
      if (payload) {
        localStorage.setItem(`${appName}-${config.tokenConfig.fieldName}`, payload)
      } else {
        localStorage.removeItem(`${appName}-${config.tokenConfig.fieldName}`)
      }
    },
    setSiteCache(state, payload) {
      if (payload) {
        localStorage.setItem(`${appName}-defaultRoute`, payload.defaultMenuUrl || '')
        localStorage.setItem(`${appName}-menu`, JSON.stringify(payload.menuList))
      } else {
        localStorage.removeItem(`${appName}-defaultRoute`)
        localStorage.removeItem(`${appName}-menu`)
      }
    }
  },
  actions: {
    async jump() {
      router.resetRoutes()

      // 检测query参数是否存在重定向
      const { redirect, ...query } = router.history.current.query
      // 检测本地存储是否存在保存的路由（意外退出的路由），如果有，则在登录成功后直接跳转到该路由
      const path = localStorage.getItem(`${appName}-selectedKey`)

      if (redirect) {
        await router.replace({ path: `${redirect}`, query })
      } else if (path) {
        await router.replace(path)
      } else {
        await router.replace({ name: 'home' })
      }
    },
    async login(
      {
        commit,
        state,
        dispatch
      },
      options
    ) {
      commit('setLoading', true)

      const { payload, config } = options
      const encryptor = new JSEncrypt()

      encryptor.setPublicKey(config.publicKey)

      const response = await this.apis.login({
        up: encryptor.encrypt(
          JSON.stringify({
            u: payload.username,
            p: payload.password
          })
        ),
        vck: payload.picCode,
        verifyCodeKey: state.codeKey
      })

      const { status } = response

      if (status) {
        const {
          userInfo,
          token,
          menuList,
          defaultMenuUrl
        } = response.data

        commit('setUserInfo', userInfo)
        commit('setLastLogin', {
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          token
        })
        commit('setAuthentication', token)
        commit('setSiteCache', { menuList, defaultMenuUrl })
        localStorage.setItem(`${appName}-theme`, userInfo.themeFileName || config.theme.default)

        dispatch('setParamsUseInHeader')
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async logout({ commit, dispatch }) {
      message.loading('正在注销，请稍候...', 0)
      commit('setLoading', true)

      const response = await this.apis.logout()

      // if (response.status) {
      dispatch('clear')
      message.destroy()
      // }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async getUserInfo({ commit, dispatch }, payload) {
      commit('setLoading', true)

      const response = await this.apis.getUserInfo(payload)

      const status = response.status

      if (status) {
        let userInfo

        try {
          if (USER_INFO_MAPPINGS) {
            // 适配非蓝桥后端框架的用户信息返回体
            const userInfoResponseData = USER_INFO_MAPPINGS.mapping(response.data)

            userInfo = userInfoResponseData.userInfo
            const menuList = userInfoResponseData.menuList
            const defaultMenuUrl = userInfoResponseData.defaultMenuUrl

            if (menuList) {
              commit('setSiteCache', { menuList, defaultMenuUrl })
            }
          } else {
            userInfo = response.data
          }
        } catch (e) {
          userInfo = response.data
        }

        commit('setAuthentication', payload.token)
        commit('setUserInfo', userInfo)
        commit('setLastLogin', {
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          token: payload.token
        })
        localStorage.setItem(`${appName}-theme`, userInfo.themeFileName || config.theme.default)

        dispatch('setParamsUseInHeader')
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    /**
     * 设置Header内需要使用的参数
     */
    setParamsUseInHeader({ state, commit }) {
      if (config.headerParams?.show) {
        localStorage.setItem(`${appName}-headerId`, state.userInfo.organId || '')

        commit('setState', {
          value: state.userInfo.organId,
          stateName: 'headerId',
          moduleName: 'common'
        }, { root: true })

        commit('setState', {
          value: { list: state.userInfo.organList },
          stateName: 'organListForHeader',
          moduleName: 'common',
          merge: true
        }, { root: true })
      }
    },
    /**
     * 清除 store 和本地存储的信息
     * @param commit
     * @param [isPassive=false] {boolean} - 是否是被动清除，除主动点击“注销”外的其他退出都是被动的
     * @returns {Promise<boolean>}
     */
    async clear({ commit }, isPassive) {
      commit('setUserInfo', {})
      commit('setLastLogin', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      // 主动注销
      if (!isPassive) {
        localStorage.removeItem(`${appName}-openKeys`)
        localStorage.removeItem(`${appName}-selectedKey`)
        localStorage.setItem(`${appName}-theme`, config.theme.default)

        if (config.headerParams?.show) {
          localStorage.removeItem(`${appName}-headerId`)

          commit('setState', {
            value: undefined,
            stateName: 'headerId',
            moduleName: 'common'
          }, { root: true })

          commit('setState', {
            value: { list: [] },
            stateName: 'organListForHeader',
            moduleName: 'common',
            merge: true
          }, { root: true })
        }
      }

      return Promise.resolve(true)
    },
    async getCodeKey({ commit }) {
      const response = await this.apis.getCodeKey()

      if (response.status) {
        commit('setState', {
          value: response.data,
          moduleName: 'login',
          stateName: 'codeKey'
        }, { root: true })
      } else {
        commit('setState', {
          value: '',
          moduleName: 'login',
          stateName: 'codeKey'
        }, { root: true })
      }
    }
  }
}
