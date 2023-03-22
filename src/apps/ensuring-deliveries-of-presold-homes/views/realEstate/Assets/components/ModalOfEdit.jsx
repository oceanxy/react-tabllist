import { Button, Empty, Form, Input, InputNumber, Select, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce } from 'lodash'
import { defineAsyncComponent } from 'vue'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 900,
        destroyOnClose: true
      },
      keywordOfSearchDevelopers: '',
      keywordOfSearchProjects: ''
    }
  },
  computed: {
    natureOfAssets() {
      return this.$store.state[this.moduleName].natureOfAssets
    },
    enumOfDevelopers() {
      return this.$store.state[this.moduleName].enumOfDevelopers
    },
    enumOfProjects() {
      return this.$store.state[this.moduleName].enumOfProjects
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler: value => {
              const data = cloneDeep(value)

              data.easteDicId = value.natureOfAssets.easteDicId
              data.easteDicName = value.natureOfAssets.easteDicName

              return data
            }
          })
        }
      }
    },
    /**
     * 获取异步组件
     * 注意该计算属性在 render 内的调用（计算属性的调用使用了括号，是因为这里返回了一个函数）
     * @returns {function(): *}
     */
    modalOfDeveloper() {
      const ModalOfDeveloper = defineAsyncComponent(() => import('../../Developers/components/ModalOfEdit'))

      return () => (
        <ModalOfDeveloper modalTitle={'{action}开发商'} visibilityFieldName={'visibilityOfDeveloper'} />
      )
    },
    modalOfProject() {
      const ModalOfProject = defineAsyncComponent(() => import('../../Projects/components/ModalOfEdit'))

      return () => (
        <ModalOfProject modalTitle={'{action}项目'} visibilityFieldName={'visibilityOfProject'} />
      )
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // 初始化表单内的模糊查询结果，编辑模式下用列表的值作为默认值
          this.setState(
            'enumOfDevelopers',
            this.currentItem.id
              ? [
                {
                  id: this.currentItem.developerId,
                  fullName: this.currentItem.developerName
                }
              ]
              : []
          )

          this.setState(
            'enumOfProjects',
            this.currentItem.id
              ? [
                {
                  id: this.currentItem.projectId,
                  projectName: this.currentItem.projectName
                }
              ]
              : []
          )
        }
      }
    }
  },
  methods: {
    setState(stateName, value = []) {
      this.$store.commit('setState', {
        value: { loading: false, list: value },
        moduleName: this.moduleName,
        stateName
      })
    },
    async onSearchForDeveloper(keyword) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('enumOfDevelopers')

      this.keywordOfSearchDevelopers = keyword

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'enumOfDevelopers',
        customApiName: 'getEnumOfDevelopers',
        payload: { fullName: keyword }
      })
    },
    async onSearchForProject(keyword) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('enumOfProjects')

      this.keywordOfSearchProjects = keyword

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'enumOfProjects',
        customApiName: 'getEnumOfProjects',
        payload: { projectName: keyword }
      })
    },
    async onAddDeveloper() {
      await this._setVisibilityOfModal({
        fullName: this.keywordOfSearchDevelopers,
        _currentItem: this.currentItem
      }, 'visibilityOfDeveloper')
    },
    async onAddProject() {
      await this._setVisibilityOfModal({
        projectName: this.keywordOfSearchProjects,
        _currentItem: this.currentItem
      }, 'visibilityOfProject')
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="开发商" class={'half'}>
            {
              this.form.getFieldDecorator('developerId', {
                initialValue: this.currentItem.developerId,
                rules: [
                  {
                    required: true,
                    message: '请输入开发商名称！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  showSearch
                  placeholder={'请选择开发商（可搜索）'}
                  onSearch={debounce(this.onSearchForDeveloper, 300)}
                  filterOption={false}
                  notFoundContent={
                    this.enumOfDevelopers.loading
                      ? <Spin />
                      : this.keywordOfSearchDevelopers && !this.enumOfDevelopers.list.length
                        ? (
                          <span>查无此开发商，<Button
                            type={'link'}
                            onClick={this.onAddDeveloper}
                          >
                            新增开发商
                          </Button>。</span>
                        )
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  }
                >
                  {
                    this.enumOfDevelopers.list.map(item => (
                      <Select.Option value={item.id}>{item.fullName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="项目名称" class={'half'}>
            {
              this.form.getFieldDecorator('projectId', {
                initialValue: this.currentItem.projectId,
                rules: [
                  {
                    required: true,
                    message: '请输入项目名称！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  showSearch
                  placeholder={'请选择项目（可搜索）'}
                  onSearch={debounce(this.onSearchForProject, 300)}
                  filterOption={false}
                  notFoundContent={
                    this.enumOfProjects.loading
                      ? <Spin />
                      : this.keywordOfSearchProjects && !this.enumOfProjects.list.length
                        ? (
                          <span>查无此项目，<Button
                            type={'link'}
                            onClick={this.onAddProject}
                          >
                            新增项目
                          </Button>。</span>
                        )
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  }
                >
                  {
                    this.enumOfProjects.list.map(item => (
                      <Select.Option value={item.id}>{item.projectName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="资产名称" class={'half'}>
            {
              this.form.getFieldDecorator('easteName', {
                initialValue: this.currentItem.easteName,
                rules: [
                  {
                    required: true,
                    message: '请输入资产名称！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入资产名称" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Form.Item label="资产性质" class={'half'}>
            {
              this.form.getFieldDecorator('natureOfAssets', {
                initialValue: this.currentItem.easteDicId
                  ? { easteDicId: this.currentItem.easteDicId, easteDicName: this.currentItem.easteDicName }
                  : undefined,
                getValueFromEvent: value => ({ easteDicId: value.key, easteDicName: value.label }),
                getValueProps: value => ({
                  value: value
                    ? {
                      key: value.easteDicId || value.key,
                      label: value.easteDicName || value.label
                    }
                    : undefined
                }),
                rules: [
                  {
                    required: true,
                    type: 'object',
                    message: '请选择资产性质！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder="请选择企业性质"
                  labelInValue
                >
                  {
                    this.natureOfAssets.list?.map(item => (
                      <Select.Option value={item.dicCode}>{item.dicName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="所在楼层" class={'half'}>
            {
              this.form.getFieldDecorator('floorNum', { initialValue: this.currentItem.floorNum })(
                <Input
                  placeholder="请输入所在楼层"
                  maxLength={100}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="用途" class={'half'}>
            {
              this.form.getFieldDecorator('useType', { initialValue: this.currentItem.useType })(
                <Input placeholder="请输入资产用途" allowClear maxLength={30} />
              )
            }
          </Form.Item>
          <Form.Item label="租售状态" class={'half'}>
            {
              this.form.getFieldDecorator('salesStatus', { initialValue: this.currentItem.salesStatus || 4 })(
                <Select placeholder={'请请选择销售状态'}>
                  <Select.Option value={1}>已售</Select.Option>
                  <Select.Option value={2}>未售</Select.Option>
                  <Select.Option value={3}>已租</Select.Option>
                  <Select.Option value={4}>未知</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="建筑面积(㎡)" class={'half'}>
            {
              this.form.getFieldDecorator('buildArea', {
                initialValue: this.currentItem.buildArea ? +this.currentItem.buildArea : undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入建筑面积！单位：平方米',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  placeholder="请输入建筑面积"
                  style={'width: 100%'}
                  allowClear
                  max={10000}
                />
              )
            }
          </Form.Item>
          <Form.Item label="套内面积(㎡)" class={'half'}>
            {
              this.form.getFieldDecorator('indoorArea', {
                initialValue: this.currentItem.indoorArea ? +this.currentItem.indoorArea : undefined
              })(
                <InputNumber
                  placeholder="请输入套内面积"
                  style={'width: 100%'}
                  allowClear
                  max={10000}
                />
              )
            }
          </Form.Item>
          <Form.Item label="详细地址" class={'half'}>
            {
              this.form.getFieldDecorator('address', { initialValue: this.currentItem.address })(
                <Input placeholder="请输入备注" allowClear max={100} />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', { initialValue: this.currentItem.remark })(
                <Input.TextArea placeholder="请输入备注" allowClear max={10000} />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序" max={10000} />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
        {this.modalOfDeveloper()}
        {this.modalOfProject()}
      </DragModal>
    )
  }
})
