import { Form } from 'ant-design-vue'
import TGContainer from '@/components/TGContainer'

export default Form.create({})({
  data() {
    return { loading: false }
  },
  render() {
    return (
      <BNContainer modalTitle="申请入驻" width="auto"></BNContainer>
    )
  }
})
