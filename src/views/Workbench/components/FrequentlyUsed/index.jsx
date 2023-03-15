import TGContainer from '@/components/TGContainer'
import { Card, Empty, Spin } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import { mapGetters } from 'vuex'

const ModalOfSetUpUsedFunctionsFrequently = () => import( '../ModalOfSetUpUsedFunctionsFrequently')

export default {
  mixins: [forIndex],
  inject: ['moduleName'],
  data() {
    return { ModalOfSetUpUsedFunctionsFrequently: undefined }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    usedFunctionsFrequently() {
      return this.getState('usedFunctionsFrequently', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'usedFunctionsFrequently',
      customApiName: 'getListOfUsedFunctionsFrequently'
    })
  },
  methods: {
    async setUpUsedFunctionsFrequently() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        stateName: 'treeOfSetUpUsedFunctionsFrequently',
        customApiName: 'getTreeOfUsedFunctionsFrequently'
      })

      await this._setVisibilityOfModal(null, 'visibilityOfSetUpUsedFunctionsFrequently')
    },
    async onCardClick(routeName) {
      await this.$router.push({ name: routeName })
    }
  },
  render() {
    return (
      <TGContainer
        width={'100%'}
        modalTitle={
          <div class={'container-title'}>
            <IconFont type={'icon-home-cygn-fill'} />
            常用功能
          </div>
        }
        showMore
        rightIcon={
          <IconFont
            onClick={this.setUpUsedFunctionsFrequently}
            title={'设置'}
            type={'icon-home-pz-fill'}
          />
        }
        showBoxShadow={false}
        contentClass="frequently-used-container"
      >
        <Spin spinning={this.usedFunctionsFrequently.loading}>
          {
            this.usedFunctionsFrequently.list.length
              ? this.usedFunctionsFrequently.list.map(item => (
                <Card.Meta title={item.functionName} onClick={() => this.onCardClick(item.routeName)}>
                  <IconFont type={item.functionIcon} slot={'avatar'} />
                </Card.Meta>
              ))
              : (
                <div class={'ant-empty-container'}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'您设置的功能将在这里显示'} />
                </div>
              )
          }
        </Spin>
        <ModalOfSetUpUsedFunctionsFrequently
          modalTitle={'设置常用功能'}
          visibilityFieldName={'visibilityOfSetUpUsedFunctionsFrequently'}
        />
      </TGContainer>
    )
  }
}
