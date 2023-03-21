import TGContainer from '@/components/TGContainer'
import { Card, Empty } from 'ant-design-vue'
import ScrollingNumber from '@/components/ScrollingNumber'
// import forIndex from '@/mixins/forIndex'

// const ModalOfSetUpConcerns = () => import('../ModalOfSetUpConcerns')

export default {
  // mixins: [forIndex],
  inject: ['moduleName'],
  computed: {
    userConcern() {
      return this.$store.state[this.moduleName].userConcern
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'userConcern',
      customApiName: 'getListOfUserConcern'
    })
  },
  // methods: {
  //   async onClick() {
  //     await this._setVisibilityOfModal(null, 'visibilityOfSetUpConcerns')
  //   }
  // },
  render() {
    return (
      <TGContainer
        modalTitle={
          <div class={'container-title'}>
            <IconFont type={'icon-home-wdgz-fill'} />
            我的关注
          </div>
        }
        showMore
        // rightIcon={
        //   <IconFont
        //     title={'设置'}
        //     type={'icon-home-pz-fill'}
        //     onClick={this.onClick}
        //   />
        // }
        showBoxShadow={false}
        contentClass="concern-cards"
      >
        {
          this.userConcern.list.length
            ? this.userConcern.list.map(item => (
              <Card>
                <p class={'concern-cards-text'}>{item.name}</p>
                <p class={'concern-cards-value'}>
                  <ScrollingNumber value={+item.value} />
                  {item.unit}
                </p>
              </Card>
            ))
            : (
              <div class={'ant-empty-container'}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'您关注的模块将在这里显示'} />
              </div>
            )
        }
        {/* <ModalOfSetUpConcerns */}
        {/*   modalTitle={'设置我的关注'} */}
        {/*   visibilityFieldName={'visibilityOfSetUpConcerns'} */}
        {/* /> */}
      </TGContainer>
    )
  }
}
