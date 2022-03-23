import './assets/styles/index.scss'
import ULContainers from '@/layouts/ULContainers'
import ULPageForm from './components/ULPageForm'
import ULPageTable from './components/ULPageTable'
import ULPagePagination from './components/ULPagePagination'
import ULPageModalForEdit from './components/ULPageModalForEdit'
import ULPageButtons from './components/ULPageButtons'
import dynamicState from '@/mixins/dynamicState'
import ULPageModalForConflictPage from '@/views/Pages/components/ULPageModalForConflictPage'

export default {
  name: 'Pages',
  mixins: [dynamicState],
  render() {
    return (
      <ULContainers class="uni-log-pages">
        <ULPageForm slot="form" />
        <ULPageButtons slot="buttons" />
        <ULPageTable slot="table" />
        <ULPagePagination slot="pagination" />

        <div slot="modals">
          <ULPageModalForEdit />
          <ULPageModalForConflictPage />
        </div>
      </ULContainers>
    )
  }
}
