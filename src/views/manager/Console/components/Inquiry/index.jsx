import './index.scss'
import { mapGetters } from 'vuex'
import forInquiry from '@/mixins/forInquiry'
import { Empty, Form, Icon, Select, Spin } from 'ant-design-vue'
import ICON from '@/assets/activity-mark-icon.svg'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForSelect'
    })

    if (status) {
      await this.setSearch(this.activities.list?.[0].id)
    }
  },
  methods: {
    async setSearch(activityId) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: { activityId }
      })
    }
  },
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        class={'tg-inquiry fe-console-inquiry'}
      >
        <div class={'row-up'}>
          <Icon class={'icon'} component={ICON} />
          <Form.Item class={'activity'}>
            <Spin spinning={this.activities.loading}>
              {
                this.activities.list?.length
                  ? this.form.getFieldDecorator(
                    'activityId',
                    { initialValue: this.activities.list[0]?.id ?? undefined }
                  )(
                    <Select
                      suffixIcon={<Icon type="caret-down" />}
                      notFoundContent={<Empty />}
                      onChange={this.setSearch}
                    >
                      {
                        this.activities.list.map(item => (
                          <Select.Option
                            value={item.id}
                            title={item.activityName}
                          >
                            {item.activityName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                  : <span style={'padding: 8px 0'}>暂无活动数据</span>
              }
            </Spin>
          </Form.Item>
        </div>
      </Form>
    )
  }
})
