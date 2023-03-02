import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import Concern from './components/Concern'
import UserInfo from './components/UserInfo'
import FrequentlyUsed from '@/views/Workbench/components/FrequentlyUsed'
import Todo from './components/Todo'
import News from './components/News'

export default {
  name: 'Workbench',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'tg-workbench'}>
        <div class={'row-1'}>
          {/* 我的关注 */}
          <Concern class={'tg-workbench-concern'} />
          {/* 用户信息 */}
          <UserInfo class={'tg-workbench-userinfo'} />
        </div>
        {/* 常用功能 */}
        <FrequentlyUsed class={'row-2 tg-workbench-frequently-used'} />
        <div class={'row-3'}>
          {/* 待办事项 */}
          <Todo class={'tg-workbench-to-do'} />
          {/* 审阅消息 */}
          <News class={'tg-workbench-news'} />
        </div>
      </div>
    )
  }
}
