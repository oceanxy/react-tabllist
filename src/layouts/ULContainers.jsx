import './assets/styles/index.scss'

export default {
  render() {
    return (
      <div class="uni-log-container">
        <div class="uni-log-container-content">
          {this.$slots.form}
          {this.$slots.buttons}
          {this.$slots.table}
          {this.$slots.pagination}
        </div>
        <div class="uni-log-container-modals">
          {this.$slots.modals}
        </div>
      </div>
    )
  }
}
