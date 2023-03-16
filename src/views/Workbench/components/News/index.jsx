import TGContainer from '@/components/TGContainer'
import { List, Tag } from 'ant-design-vue'
import forModuleName from '@/mixins/forModuleName'

export default {
  name: 'News',
  inject: ['moduleName'],
  mixins: [forModuleName(true)],
  computed: {
    news() {
      return this.$store.state[this.moduleName][this.submoduleName].list
    }
  },
  async created() {
    await this.$store.dispatch('setSearch', {
      moduleName: this.moduleName,
      submoduleName: this.submoduleName,
      payload: {}
    })
  },
  methods: {
    async onClick({ id, targetAddress }) {
      if (targetAddress) {
        const split = targetAddress.split('?')
        const path = this.$router.resolve({ name: split[0] }).href
        const paramArr = split[1].split('&')

        const query = paramArr.reduce((params, str) => {
          const p = str.split('=')

          return { ...params, [p[0]]: p[1] }
        }, {})

        await this.$store.dispatch('custom', {
          payload: { ids: id },
          customApiName: 'setMessageToRead'
        })

        await this.$router.push({ path, query })
      }
    }
  },
  render() {
    return (
      <TGContainer
        modalTitle={
          <div class={'container-title'}>
            <IconFont type={'icon-home-syxx-fill'} />
            审阅信息
          </div>
        }
        showBoxShadow={false}
        contentClass="news-container"
      >
        <List
          dataSource={this.news}
          renderItem={item => (
            <List.Item onClick={() => this.onClick(item)}>
              <List.Item.Meta description={item.createTimeStr}>
                <Tag slot={'avatar'} class={'new-status'}>
                  {['未读', '未读'][item.isRead]}
                </Tag>
                <p slot={'title'}>{item.noticeTitle}</p>
              </List.Item.Meta>
            </List.Item>
          )}
        />
      </TGContainer>
    )
  }
}
