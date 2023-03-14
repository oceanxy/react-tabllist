import './assets/styles/index.scss'

export default {
  render() {
    return (
      <div class="tg-container">
        {
          this.$slots.functions
            ? (
              <div class={'tg-content-title'}>
                <span class={'title'}>{this.$route.meta.title}</span>
                {this.$slots.functions}
              </div>
            )
            : null
        }
        <div class="tg-container-content">
          {this.$slots.inquiry || this.$slots.others}
          {
            this.$slots.chart
              ? (
                <div class={`tg-container-chart-container${this.$slots.table ? '' : ' no-table'}`}>
                  {this.$slots.chart}
                </div>
              )
              : null
          }
          {
            this.$slots.table
              ? (
                <div class={'tg-container-table-container'}>
                  {this.$slots.table}
                  {this.$slots.pagination}
                  {this.$slots.default}
                </div>
              )
              : null
          }
        </div>
        <div class="tg-container-modals">{this.$slots.modals}</div>
      </div>
    )
  }
}
