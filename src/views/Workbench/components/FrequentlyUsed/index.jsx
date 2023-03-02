import TGContainer from '@/components/TGContainer'
import { Card } from 'ant-design-vue'

export default {
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
        rightIcon={<IconFont title={'设置'} type={'icon-home-pz-fill'} />}
        showBoxShadow={false}
        contentClass="frequently-used-container"
      >
        <Card.Meta title={'资产录入'}>
          <IconFont type={'icon-cygn-zclr-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'资产价值'}>
          <IconFont type={'icon-cygn-zcjz-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'资产审核'}>
          <IconFont type={'icon-cygn-zcsh-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'租赁合同'}>
          <IconFont type={'icon-cygn-zlht-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'在线招聘'}>
          <IconFont type={'icon-cygn-zxzp-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'预约信息'}>
          <IconFont type={'icon-cygn-yyxx-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'我的申请'}>
          <IconFont type={'icon-cygn-wdsq-line'} slot={'avatar'} />
        </Card.Meta>
        <Card.Meta title={'我的待办'}>
          <IconFont type={'icon-cygn-wddb-line'} slot={'avatar'} />
        </Card.Meta>
      </TGContainer>
    )
  }
}
