import ULContainers from '@/layouts/ULContainers'
import ULAppForm from './components/ULAppForm'
import ULAppTable from './components/ULAppTable'
import ULAppButtons from './components/ULAppButtons'
import dynamicState from '@/mixins/dynamicState'
import ULAppModalForEdit from '@/views/sites/Apps/components/ULAppModalForEdit'
import ULAppPagination from '@/views/sites/Apps/components/ULAppPagination'
import './assets/styles/index.scss'

export default {
  name: 'SiteApps',
  mixins: [dynamicState],
  provide() {
    return { moduleName: this.moduleName }
  },
  render() {
    return (
      <ULContainers class="uni-log-sites-apps">
        <ULAppForm slot="form" />
        <ULAppButtons slot="buttons" />
        <ULAppTable slot="table" />
        <ULAppPagination slot="pagination" />

        <ULAppModalForEdit slot="modals" />
      </ULContainers>
    )
  }
}
