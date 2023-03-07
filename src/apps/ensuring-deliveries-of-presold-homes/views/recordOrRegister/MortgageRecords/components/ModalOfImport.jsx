import { Form, Icon, Button, message, Progress, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 1000 },
      visibilityFieldName: 'modalOfImportVisible',
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
        },
      ]
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel('modalOfImportVisible'),
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
    async uploadFile() {
      const imFile = this.$refs.imFile

      imFile.click()

    },

    async importFile(info) {
      if (!info.target.files || info.target.files.length === 0) {
        return
      }

      const flie = info.target.files[0]
      const suffix = flie.name.split('.')[1]

      if (suffix !== 'xls' && suffix !== 'xlsx') {
        message.warning('导入的文件可是不正确')

        return
      }

      this.tablLoading = true
      const formData = new FormData()

      console.log('flie', flie)

      formData.append('file', flie)
      // const { status, data } = await apis.schoolImportFile(formData)

      // if (status) {
      //   this.tableData = data
      //   this.newTableData = data.allData.map((item, index) => {
      //     item.id = index

      //     return item
      //   })

      //   this.tablLoading = false
      //   this.defaultPage = false
      // }

      this.$refs.imFile.value = ''

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
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form>
          <div class={'import-box'}>
            <input type="file" ref="imFile" style="display: none" onChange={this.importFile} accept="xlsx" />
            <Button class={'import-btn-box'} type="dashed" onClick={() => this.uploadFile()} loading={this.tablLoading}>
              <Icon class={'icon'} type="cloud-upload"></Icon>
              <div>单击或拖动文件到此区域以上传</div>
            </Button>
            <div class={'progress-box'}>
              <Icon type="link" class={'link'}></Icon>
              <div>
                <div class={'progress'}>
                  <div>2021年预告登记数据.xlsx</div>
                  <Icon class={'icon'} type="close"></Icon>
                </div>
                <Progress percent={10} show-info={false} size="small"></Progress>
              </div>
            </div>
            <div class={'point-out'}>
              <div>注意：</div>
              <div>
                <p>1、请按指定格式导入数据，可 <Button type="link">下载模板文件 </Button>以作格式参考</p>
                <p>2、支持xlsx，xls，csv格式</p>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div>
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
