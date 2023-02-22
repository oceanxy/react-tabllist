/**
 * 搜索栏关于活动的查询混合逻辑
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-03 周四 17:44:28
 */

import { mapGetters } from 'vuex'

export default () => ({
  inject: {
    // 通知组件在初始化阶段是否自动请求数据。
    // 来自于 @/components/TGContainerWithTreeSider 组件。
    notInitList: { default: false }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)
    },
    organizations() {
      return this.getState('organizations', this.moduleName)
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForSelect'
    })

    if (status) {
      await Promise.all([
        // 检测是否从其他页面跳转过来并携带了 activityId，存在则把该 ID 设置为默认值，否则设置接口返回数据的第一项为默认值
        this.setSearch(this.$route.query.activityId || this.activities.list[0].id, !this.notInitList),
        this.getOrganizations(this.$route.query.activityId || this.activities.list[0].id)
      ])
    }
  },
  methods: {
    async getOrganizations(activityId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'organizations',
        customApiName: 'getOrganizationsForSelect',
        payload: { activityId }
      })
    },
    async setSearch(activityId, isFetchList) {
      await this.$store.dispatch('setSearch', {
        payload: {
          activityId,
          activityOrgId: ''
        },
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        isFetchList
      })
    },
    async onActivityChange(activityId) {
      // 活动变动后，清空已选中的组织
      this.form.setFieldsValue({ activityOrgId: '' })

      await Promise.all([
        // 重新获取组织数据
        this.getOrganizations(activityId),
        // 重新获取列表数据
        this.setSearch(activityId, true)
      ])
    }
  }
})
