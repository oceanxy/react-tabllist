import './index.scss'
import Property from '@/views/CommonComponentsDirectory/layouts/Property'
import { createNamespacedHelpers } from 'vuex'
import { Spin } from 'ant-design-vue'

const { mapState, mapActions } = createNamespacedHelpers('forExample')

export default {
  data() {
    return {
      loading: false,
      icon: ['small-towns', 'village', 'grid', 'household-number', 'population'],
      color: ['#ff8d24', '#ffcd3e', '#60f7ff', '#45d2ff', '#a12bff']
    }
  },
  computed: {
    ...mapState({
      demographics: 'demographics',
      districtId: 'districtId'
    })
  },
  watch: {
    async districtId() {
      await this.getData()
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    ...mapActions({ getDemographics: 'getDemographics' }),
    async getData() {
      this.loading = true

      await this.getDemographics()

      this.loading = false
    }
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class="tg-demographics">
          {
            (this.demographics.length ? this.demographics : undefined)?.map((item, index) => (
              <Property
                icon={this.icon[index]}
                text={item.name}
                value={+item.count}
                color={this.color[index]}
              />
            )) ?? <div class="tg-empty">暂无数据</div>
          }
        </div>
      </Spin>
    )
  }
}
