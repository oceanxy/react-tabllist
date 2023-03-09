import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfRemove from './components/ModalOfRemove'
import ModalOfImport from './components/ModalOfImport'


export default {
  name: 'AdvanceRegistration',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTable>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}登记'} />
          <ModalOfImport modalTitle={'数据导入'} visibilityFieldName={'modalOfImportVisible'} />
          <ModalOfRemove modalTitle={'解除操作'} visibilityFieldName={'modalOfRemoveVisible'} />
        </template>
      </TGContainerWithTable>
    )
  }
}
