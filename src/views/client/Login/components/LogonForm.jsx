import { Button, Col, Form, Input, message, Row } from 'ant-design-vue'
import BNContainer from '@/components/TGModule'
import Upload from '@/components/BNUploadPictures'
import apis from '@/apis'

export default Form.create({})({
  data() {
    return { loading: false }
  },
  methods: {
    async onSubmit(values) {
      this.loading = true
      const form = { ...values }
      const [businessLicense] = form.businessLicense

      form.businessLicense = businessLicense ? businessLicense.response.data[0].key : ''
      const [legalPersonIdCardFront] = form.legalPersonIdCardFront

      form.legalPersonIdCardFront = legalPersonIdCardFront ? legalPersonIdCardFront.response.data[0].key : ''
      const [legalPersonIdCardReverse] = form.legalPersonIdCardReverse

      form.legalPersonIdCardReverse = legalPersonIdCardReverse ? legalPersonIdCardReverse.response.data[0].key : ''
      const res = await apis.notifyMessageEnterprisesIncome(form)

      this.loading = false

      if (res.status) {
        message.success('申请成功')
        this.$router.go(-1)
      }
    },
    validateFieldsAndScroll(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) return

        this.onSubmit(values)
      })
    }
  },
  render() {
    return (
      <BNContainer modalTitle="申请入驻" width="auto">
        <Form class="bn-logon-form" onSubmit={this.validateFieldsAndScroll}>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="企业名称">
                {this.form.getFieldDecorator('companyName', {
                  rules: [
                    {
                      required: true, message: '请输入名称!'
                    }
                  ]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="组织代码">
                {this.form.getFieldDecorator('uscc', {
                  rules: [
                    {
                      required: true, message: '请输入组织代码!'
                    }
                  ]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所在行业">
                {this.form.getFieldDecorator('industry', {
                  rules: [
                    {
                      required: true, message: '请输入所在行业!'
                    }
                  ]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="主营业务">
                {
                  this.form.getFieldDecorator('mainBusiness', {
                    rules: [
                      {
                        required: true,
                        message: '请输入主营业务!'
                      }
                    ]
                  })(
                    <Input.TextArea
                      placeholder="请输入"
                      auto-size={{ minRows: 6 }}
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="营业证照">
                {this.form.getFieldDecorator('businessLicense', {
                  rules: [
                    {
                      required: true, type: 'array', message: '请上传营业证照!', trigger: 'change'
                    }
                  ]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="法人姓名">
                {this.form.getFieldDecorator('legalPerson', {
                  rules: [
                    {
                      required: true, message: '请输入法人姓名!', trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="法人身份证号">
                {this.form.getFieldDecorator('legalPersonIdCard', {
                  rules: [
                    {
                      required: true, message: '请输入法人身份证号!', trigger: 'blur'
                    }
                  ]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证照片(正面)">
                {this.form.getFieldDecorator('legalPersonIdCardFront', {
                  rules: [
                    {
                      required: true, type: 'array', message: '请上传身份证照片(正面)!', trigger: 'change'
                    }
                  ]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证照片（反面）">
                {this.form.getFieldDecorator('legalPersonIdCardReverse', {
                  rules: [
                    {
                      required: true, type: 'array', message: '请上传身份证照片（反面）!', trigger: 'change'
                    }
                  ]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.loading}>
              申请入驻
            </Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
