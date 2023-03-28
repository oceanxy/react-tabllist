import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import ModalOfRepayment from './components/ModalOfRepayment'
import ModalOfRepaymentPlan from '../realEstate/Projects/components/ModalOfRepaymentPlan'

export default {
  name: 'EmployerSideContracts',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTable>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}合同'} />
          <ModalOfRepayment modalTitle={'还款'} visibilityFieldName={'visibilityOfRepayment'} />
          <ModalOfRepaymentPlan modalTitle={'还款计划'} visibilityFieldName={'visibilityOfRepaymentPlan'} />
        </template>
      </TGContainerWithTable>
    )
  }
}
