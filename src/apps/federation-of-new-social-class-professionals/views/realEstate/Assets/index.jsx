import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTable from '@/components/TGContainerWithTable'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'Assets',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTable>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}资产'} />
      </TGContainerWithTable>
    )
  }
}
