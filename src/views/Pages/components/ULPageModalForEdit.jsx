import {
  Badge,
  Button,
  Form,
  Icon,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Statistic,
  Switch,
  Tooltip
} from 'ant-design-vue'
import editForm from '@/mixins/editForm'
import { mapState } from 'vuex'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [editForm],
  data() {
    return {
      modalProps: {
        width: 700
      }
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allPages: 'allPages',
    score() {
      return 0
    }
  }),
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllPages')
      }
    }
  },
  methods: {
    onConflictClick() {
      //
    }
  },
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
        title={`${this.title}页面`}
        visible={this.visible}
        {...attributes}
      >
        <Form
          class="uni-log-pages-edit-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          colon={false}
        >
          <Form.Item label="所属站点">
            {
              this.form.getFieldDecorator('appId', {
                initialValue: this.current.appId,
                rules: [{ required: true, message: '请选择所属站点!', trigger: 'change' }]
              })(
                <Select placeholder="请选择所属站点" allowClear>
                  {
                    this.allSiteApps.map(item => (
                      <Select.Option value={item.id}>
                        {item.appName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="父级页面">
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.current.parentId,
                rules: [{ required: true, message: '请选择父级页面!', trigger: 'change' }]
              })(
                <Select placeholder="请选择父级页面" allowClear>
                  {
                    this.allPages.map(item => (
                      <Select.Option value={item.id}>
                        {item.pageName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="页面名称">
            {
              this.form.getFieldDecorator('pageName', {
                initialValue: this.current.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="页面路径">
            {
              this.form.getFieldDecorator('pagePathList', {
                initialValue: this.current.pagePathList,
                rules: [{ required: true, message: '请输入页面路径!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面路径" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="页面类型">
            {
              this.form.getFieldDecorator('classify', {
                initialValue: this.current.classify || 1,
                rules: [{ required: true, message: '请选择页面类型!', trigger: 'change' }]
              })(
                <Select placeholder="请选择页面类型" allowClear>
                  <Select.Option value={1}>综合页面</Select.Option>
                  <Select.Option value={2}>资源页面-公共</Select.Option>
                  <Select.Option value={3}>资源页面-专有</Select.Option>
                  <Select.Option value={4}>专题应用页面</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="开启监控">
            {
              this.form.getFieldDecorator('isMonitor', {
                initialValue: +this.current.status === 1 || false,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="开启同组">
            <Space>
              {
                this.form.getFieldDecorator('isSameGroup', {
                  initialValue: +this.current.isSameGroup === 1 || false,
                  valuePropName: 'checked'
                })(
                  <Switch />
                )
              }
              <Tooltip
                class="uni-log-pages-tool-tip"
                overlayClassName="uni-log-pages-overlay"
              >
                <template slot="title">
                  1. 使用通配符 <span>*</span> 来代替任意字符
                  <br />
                  例如：页面 1 的地址是 <span>www.a.com/page?id=1</span>，
                  页面 2 的地址是 <span>www.a.com/page?id=2</span>，
                  同组路径填写为 <span>www.a.com/page?id=*</span>
                  <br />
                  2. 匹配域名及域名下所有路径使用 <span>/*</span>
                  <br />
                  例如：<span>http://www.a.com/*</span>
                  <br />
                  3. 匹配子路径使用 <span>/*</span>
                  <br />
                  例如：<span>http://www.a.com/b/*</span>，用来匹配 b 路径下所有页面
                  <br />
                  4. 匹配本路径及子路径使用 <span>*</span>
                  <br />
                  例如：<span>http://www.a.com/b*</span>，用来匹配 b 路径及 b 路径下所有子路径
                </template>
                <Icon type="question-circle" /> 如何定义同组页面？
              </Tooltip>
            </Space>
          </Form.Item>
          <Form.Item label="匹配权重">
            <Space>
              {
                this.form.getFieldDecorator('score', {
                  initialValue: this.current.score || 0
                })(
                  <InputNumber />
                )
              }
              <Tooltip overlayClassName="uni-log-pages-overlay">
                <template slot="title">
                  1. 匹配权重：手动设置匹配规则权重（-100 ~ 999），值越大越优先匹配。
                  <br />
                  2. 计算权重：系统根据页面路径规则计算得出权重，值越大越优先匹配。
                  <br />
                  3. 匹配权重优先级大于计算权重。
                  <br />
                  4. 当存在冲突页面时，只要当前计算权重大于冲突页面匹配权重最大值即可优先匹配；
                  否则请适当调整匹配权重或者修改页面路径规则。
                  <br />
                  5. 点击冲突页面查看与本规则冲突页面列表，如需修改请点击修改。
                </template>
                <Icon type="question-circle" /> 如何调整匹配权重？
              </Tooltip>
              <Statistic title="计算权重：" value={this.score} class="uni-log-pages-statistic" />
              <Badge count={this.score} showZero>
                <Button onClick={() => this.onConflictClick()}>冲突页面</Button>
              </Badge>
            </Space>
          </Form.Item>
          <Form.Item label="页面描述">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.current.remark
              })(
                <Input placeholder="请输入页面描述" type="textarea" />
              )
            }
          </Form.Item>
          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.current.sortIndex || 0
              })(
                <Input placeholder="请输入排序" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
})
