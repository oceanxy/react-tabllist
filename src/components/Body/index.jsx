import './index.scss'

export default {
  render() {
    return (
      <div class="tg-body">
        {
          this.$slots.default
        }
      </div>
    )
  }
}
