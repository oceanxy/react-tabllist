import './assets/styles/index.scss'

export default {
  render() {
    return (
      <div class="uni-log-container">
        {this.$slots.form}
        {this.$slots.buttons}
        {this.$slots.table}
      </div>
    )
  }
}
