import { Form, Icon, Button, Space, Table, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 1000 },
      accept: '.xls,.xlsx',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      fileList: [],
      previewImage: '',
      previewVisible: false,
      name: 'files',
      headers: { token: localStorage.getItem('token') },
      columns: [
        {
          title: '开发商',
          dataIndex: 'fullName'
        },
        {
          title: '项目',
          dataIndex: 'schoolType'
        },
        {
          title: '不动产名称',
          dataIndex: 'schoolNo'
        },
        {
          title: '资产性质',
          align: 'center',
          dataIndex: 'category'
        },
        {
          title: '建面㎡',
          align: 'center',
          dataIndex: 'urbanRuralType'
        },
        {
          title: '套内㎡',
          align: 'center',
          dataIndex: 'isBoardingSchool'
        },
        {
          title: '备案总价(万元)',
          align: 'center',
          dataIndex: 'isBranchSchool'
        },
        {
          title: '备案单价(万元)',
          align: 'center',
          dataIndex: 'isContainKindergarten'
        },
        {
          title: '签约日期',
          scopedSlots: { customRender: 'errRemark' }
        }
      ],
      tableList: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        },
        {
          id: 3,
          name: '2'
        },
        {
          id: 4,
          name: '1'
        },
        {
          id: 5,
          name: '1'
        },
        {
          id: 6,
          name: '1'
        }
      ]
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit(
            {
              isFetchList: false,
              customApiName: 'rescindContract',
              customDataHandler: this.customDataHandler,
              done: this.done
            })
        }
      }
    }
  },
  methods: {

    // 上传文件
    handleChange({ file, fileList }) {
      this.fileList = fileList

      if (this.fileList.length >= this.limit) {
        this.fileList = this.fileList.slice(0, this.limit)
      }

      if (file.status === 'done') {
        this.$emit('change', this.fileList)
      }
    },

    async done() {
      await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        customApiName: this.customApiName
      })
    },
    customDataHandler(values) {
      const data = cloneDeep(values)
      const str = data.rescindContract.replaceAll('-', '')

      data.id = this.currentItem.id
      data.rescindContract = Number(str)

      return data
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value && value.length) {
          this.fileList = value.map((item, index) => {
            if ('uid' in item) {
              return item
            } else {
              return {
                uid: item.key + index,
                key: item.key,
                url: item.path,
                status: 'done',
                name: item.fileName
              }
            }
          })
        } else {
          this.fileList = []
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form>
          <Space direction="vertical" class={'import-btn-box'}>
            <Upload.Dragger
              name="file"
              accept={this.accept}
              action={this.action}
              fileList={this.fileList}
              headers={this.headers}
              onChange={this.handleChange}
            >
              <Icon class={'icon'} type="cloud-upload"></Icon>
              <div>单击或拖动文件到此区域以上传</div>
            </Upload.Dragger>
            <div class={'point-out'}>
              <div style={'margin-top:4px'}>注意：</div>
              <div>
                <p>1、请按指定格式导入数据，可 <Button type="link">下载模板文件 </Button>以作格式参考</p>
                <p>2、支持xlsx，xls，csv格式</p>
              </div>
            </div>
          </Space>
          <div style={'margin-top:35px'}>
            <h3 style={'font-weight: bold;'}>导入数据</h3>
            <Table
              dataSource={this.tableList}
              columns={this.columns}
              rowKey={'id'}
              bordered
              {...{
                scopedSlots: {
                  errRemark: (text, record) => {
                    return (
                      <div style={{ color: 'red' }}>{record.errRemark}</div>
                    )
                  }
                }
              }}
            />
          </div>
        </Form>
      </DragModal>
    )
  }
})
