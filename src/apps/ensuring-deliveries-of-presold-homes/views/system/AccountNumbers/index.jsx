import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfResetPwd from './components/ModalOfResetPwd'


export default {
  name: 'AccountNumbers',
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
        <TGContainerWithTable>
          <Functions slot={'functions'} />
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}角色'} />
            <ModalOfResetPwd modalTitle={'重置密码'} visibilityFieldName={'visibilityOfResetPwd'} />
          </template>
        </TGContainerWithTable>
      </TGContainerWithTreeSider>
    )
  }
}
