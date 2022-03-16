import { Pagination } from 'ant-design-vue'
import pagination from '@/mixins/pagination'
import { omit } from 'lodash'
import '../assets/styles/index.scss'

export default {
  mixins: [pagination],
  render() {
    return (
      <Pagination
        class="uni-log-pages-pagination"
        {...{
          props: omit(this.$data, 'on'),
          on: this.$data.on
        }}
      />
    )
  }
}
