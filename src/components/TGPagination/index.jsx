import './index.scss'
import { Pagination } from 'ant-design-vue'
import forPagination from '@/mixins/forPagination'
import { omit } from 'lodash'

export default {
  mixins: [forPagination],
  render() {
    const attributes = {
      props: omit({
        ...this.paginationProps,
        ...this.pagination
      }, ['pageIndex']),
      on: this.paginationOn
    }

    return <Pagination class="tg-pagination" {...attributes} />
  }
}
