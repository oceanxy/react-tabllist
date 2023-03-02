import TGContainer from '@/components/TGContainer'
import { List, Tag } from 'ant-design-vue'

export default {
  computed: {
    dataSource() {
      return [
        {
          title: '您有新的审核任务，请及时处理',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 2',
          description: '发起人：陈思睿',
          status: 2,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          description: '发起人：陈思睿',
          status: 3,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
          description: '发起人：陈思睿',
          status: 1,
          time: '2023-02-23 15:06:06'
        }
      ]
    }
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
          dataSource={this.dataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta description={item.description}>
                <div slot={'avatar'} class={'calendar-for-list'}>
                  <p class={'datetime'}>2023-02</p>
                  <p class={'date'}>23</p>
                </div>
                <p slot={'title'}>
                  <Tag class={['warn', 'info', 'error'][item.status - 1]}>
                    {['待审核', '待审核', '紧急'][item.status - 1]}
                  </Tag>
                  {item.title}
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
