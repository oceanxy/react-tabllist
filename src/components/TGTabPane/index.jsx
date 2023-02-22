import { Icon, Tabs } from 'ant-design-vue'

export default {
  functional: true,
  render(h, { props, scopedSlots }) {
    return (
      <Tabs.TabPane key={props.tabKey}>
        <template slot="tab">
          <Icon type={props.icon} />
          <span>{props.name}</span>
        </template>
        {scopedSlots.default()}
      </Tabs.TabPane>
    )
  }
}
