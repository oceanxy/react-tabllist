import './assets/styles/index.scss'
import Concern from './components/Concern'
import UserInfo from './components/UserInfo'
import FrequentlyUsed from '@/views/Workbench/components/FrequentlyUsed'
import News from './components/News'
import TGContainer from '@/components/TGContainer'
import forModuleName from '@/mixins/forModuleName'

export default {
  name: 'Workbench',
  mixins: [forModuleName()],
  render() {
    return (
      <TGContainer class={'tg-workbench'} contentClass={'tg-workbench-container'}>
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
          {/* <Todo class={'tg-workbench-to-do'} /> */}
          {/* 审阅消息 */}
          <News class={'tg-workbench-news'} />
        </div>
      </TGContainer>
    )
  }
}
