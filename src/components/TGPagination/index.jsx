import './index.scss'
import { Pagination } from 'ant-design-vue'
import forPagination from '@/mixins/forPagination'

export default {
  name: 'TGPagination',
  mixins: [forPagination],
  render() {
    return <Pagination class="tg-pagination" {...this.attributes} />
  }
}
