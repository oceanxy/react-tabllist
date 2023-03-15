import TGContainer from '@/components/TGContainer'
import { List, Tag } from 'ant-design-vue'
import forModuleName from '@/mixins/forModuleName'
import moment from 'moment'

export default {
  name: 'Todo',
  inject: ['moduleName'],
  mixins: [forModuleName(true)],
  computed: {
    todo() {
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
  render() {
    return (
      <TGContainer
        modalTitle={
          <div class={'container-title'}>
            <IconFont type={'icon-home-sbsx-fill'} />
            待办事项
          </div>
        }
        showBoxShadow={false}
        contentClass="to-do-container"
      >
        <List
          dataSource={this.todo}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta description={item.description}>
                <div slot={'avatar'} class={'calendar-for-list'}>
                  <p class={'datetime'}>{moment(item.createTime).format('YYYYMM')}</p>
                  <p class={'date'}>{moment(item.createTime).format('DD')}</p>
                </div>
                <p slot={'title'}>
                  <Tag class={['warn', 'info', 'error'][item.status - 1]}>
                    {['待审核', '待审核', '紧急'][item.status - 1]}
                  </Tag>
                  {item.noticeTitle}
                </p>
              </List.Item.Meta>
              <div slot={'extra'} class={'ant-list-item-meta-time'}>{item.time}</div>
            </List.Item>
          )}
        />
      </TGContainer>
    )
  }
}
