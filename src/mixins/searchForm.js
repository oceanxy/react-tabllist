/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: 表格搜索
 * @Date: 2022-03-14 周一 15:33:20
 */

import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  created() {
    // 为 search 创建动态侦听器
    this.$watch(
      () => this.$store.state[this.moduleName].search,
      () => dispatch(this.moduleName, 'getList')
    )
  },
  methods: {
    async onClear() {
      await dispatch(this.moduleName, 'setSearch')
      this.form.resetFields()
    },
    onSubmit(e) {
      e.preventDefault()

      this.form.validateFields(async(err, values) => {
        if (!err) {
          await dispatch(this.moduleName, 'setSearch', values)
        }
      })
    }
  }
}
