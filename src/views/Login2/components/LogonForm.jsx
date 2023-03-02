import { Form } from 'ant-design-vue'
import TGContainer from '@/components/TGContainer'

export default Form.create({})({
  data() {
    return { loading: false }
  },
  render() {
    return (
      <TGContainer modalTitle="申请入驻" width="auto"></TGContainer>
    )
  }
})
