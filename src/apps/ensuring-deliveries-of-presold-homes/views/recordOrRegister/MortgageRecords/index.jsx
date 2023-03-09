import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfPurchase from './components/ModalOfPurchase'
import ModalOfImport from './components/ModalOfImport'


export default {
  name: 'MortgageRecords',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTable>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}抵押记录'} />
          <ModalOfImport modalTitle={'数据导入'} visibilityFieldName={'modalOfImportVisible'} />
          <ModalOfPurchase modalTitle={'收购资产'} visibilityFieldName={'modalOfPurchaseVisible'} />
        </template>
      </TGContainerWithTable>
    )
  }
}
