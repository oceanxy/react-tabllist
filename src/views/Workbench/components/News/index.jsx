import TGContainer from '@/components/TGContainer'
import { List, Tag } from 'ant-design-vue'

export default {
  computed: {
    dataSource() {
      return [
        {
          title: '合同编号FWZO384729将于2022年12月30日到期，请及时处理',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 2',
          status: 2,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          status: 3,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 3',
          status: 1,
          time: '2023-02-23 15:06:06'
        },
        {
          title: 'Ant Design Title 4',
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
            <IconFont type={'icon-home-syxx-fill'} />
            审阅信息
          </div>
        }
        showBoxShadow={false}
        contentClass="news-container"
      >
        <List
          dataSource={this.dataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta description={item.time}>
                <Tag
                  slot={'avatar'}
                  class={`new-status ${['warn', 'info', 'error'][item.status - 1]}`}
                >
                  {['未读', '未读', '未读'][item.status - 1]}
                </Tag>
                <p slot={'title'}>{item.title}</p>
              </List.Item.Meta>
            </List.Item>
          )}
        />
      </TGContainer>
    )
  }
}
