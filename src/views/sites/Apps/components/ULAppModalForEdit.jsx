import { Col, Form, Input, Modal, Row, Select, Switch } from 'ant-design-vue'
import editForm from '@/mixins/editForm'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [editForm],
  render() {
    const attributes = {
      props: this.modalProps,
      on: {
        cancel: this.onCancel,
        ok: this.onSubmit
      }
    }

    return (
      <Modal
        title={`${this.title}站点`}
        visible={this.visible}
        {...attributes}
      >
        <Form
          class="uni-log-app-edit-form"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          colon={false}
        >
          <Form.Item label="站点名称">
            {
              this.form.getFieldDecorator('appName', {
                rules: [{ required: true, message: '请输入站点名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入站点名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="域名">
            {
              this.form.getFieldDecorator('domain', {
                rules: [{ required: true, message: '请输入域名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入域名" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="首页">
            {
              this.form.getFieldDecorator('defaultUrl', {
                rules: [{ required: true, message: '请输入首页路由!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入首页地址" allowClear />
              )
            }
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="框架类型" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('frameType', {
                    initialValue: 1,
                    rules: [{ required: true, message: '请输入框架类型' }]
                  })(
                    <Select placeholder="请选择框架类型" allowClear>
                      <Select.Option value={1}>Vue</Select.Option>
                      <Select.Option value={2}>React</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('status', {
                    initialValue: true,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="采集类型" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('collectType', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择采集类型" allowClear>
                      <Select.Option value={1}>全量采集</Select.Option>
                      <Select.Option value={2}>可视化埋点</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="协议类型" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('protocol', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择协议类型" allowClear>
                      <Select.Option value={1}>https</Select.Option>
                      <Select.Option value={2}>http</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="平台类型" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('platformType', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择平台类型" allowClear>
                      <Select.Option value={1}>web</Select.Option>
                      <Select.Option value={2}>h5</Select.Option>
                      <Select.Option value={3}>android</Select.Option>
                      <Select.Option value={4}>ios</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="功能分类" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('siteType', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择功能分类" allowClear>
                      <Select.Option value={1}>综合性站点</Select.Option>
                      <Select.Option value={2}>专题应用类站点</Select.Option>
                      <Select.Option value={3}>搜索站点</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="页面模式" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('pageMode', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择页面模式" allowClear>
                      <Select.Option value={1}>多页面模式</Select.Option>
                      <Select.Option value={2}>单页面模式</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="路径大小写" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('pathCaseSensitivity', {
                    initialValue: 1
                  })(
                    <Select placeholder="请选择页面模式" allowClear>
                      <Select.Option value={1}>区分大小写</Select.Option>
                      <Select.Option value={2}>不区分大小写</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark')(
                <Input placeholder="请输入备注" type="textarea" />
              )
            }
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="排序" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {
                  this.form.getFieldDecorator('sortIndex', {
                    initialValue: 0
                  })(
                    <Input placeholder="请输入排序" allowClear />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
})
