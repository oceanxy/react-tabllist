import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfMenu from './components/ModalOfMenu'


export default {
  name: 'Roles',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        apiOptions={{
          apiName: 'getOrganTree',
          stateName: 'organTree',
          moduleName: 'combination'
        }}
      >
        <TGContainerWithTable class={'tg-container-with-sider-padding'}>
          <Functions slot={'functions'} />
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}角色'} />
            <ModalOfMenu modalTitle={'配置权限'} visibilityFieldName={'visibilityOfMenu'} />
          </template>
        </TGContainerWithTable>
      </TGContainerWithTreeSider>
    )
  }
}
