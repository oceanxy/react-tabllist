import './index.scss'
import Property from '@/views/CommonComponentsDirectory/layouts/Property'
import { createNamespacedHelpers } from 'vuex'
import { Spin } from 'ant-design-vue'

const { mapState, mapActions } = createNamespacedHelpers('forExample')

export default {
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {
    ...mapState({
      householdVisit: 'householdVisit',
      districtId: 'districtId'
    })
  },
  watch: {
    householdVisit: {
      deep: true,
      handler(value) {
        if (value) {
          this.list = [
            {
              icon: 'grid-man',
              color: '#ffcd3e',
              name: value.griderName,
              value: +value.griderNum
            },
            {
              icon: 'household-index',
              color: '#ffcd3e',
              name: value.familyTargetName,
              value: +value.familyTargetNum
            },
            {
              icon: 'indicator-collection',
              color: '#ffcd3e',
              name: value.targetResultName,
              value: +value.targetResultNum
            }
          ]
        }
      }
    },
    async districtId() {
      await this.getData()
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    ...mapActions({ getHouseholdVisit: 'getHouseholdVisit' }),
    async getData() {
      this.loading = true
      await this.getHouseholdVisit()
      this.loading = false
    }
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class="tg-household-visit">
          {
            (this.list.length ? this.list : undefined)?.map(item => (
              <Property
                icon={item.icon}
                text={item.name}
                value={item.value}
                color={item.color}
              />
            )) ?? <div class="tg-empty">暂无数据</div>
          }
        </div>
      </Spin>
    )
  }
}
