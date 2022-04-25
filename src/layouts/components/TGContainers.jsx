import './assets/styles/index.scss'

export default {
  render() {
    return (
      <div class="tg-container">
        <div class="tg-container-content">
          {this.$slots.form}
          {this.$slots.buttons}
          {this.$slots.table}
          {this.$slots.pagination}
        </div>
        <div class="tg-container-modals">
          {this.$slots.modals}
        </div>
      </div>
    )
  }
}
