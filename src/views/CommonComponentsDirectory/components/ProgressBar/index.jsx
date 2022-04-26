import './index.scss'

export default {
  data() {
    return {
      show: true
    }
  },
  render() {
    return (
      <div class="tg-visit-completion-ranking">
        <div class="shape-item-container">
          <div class="shape-name-container">
            <span>名称</span>
            <span>50%</span>
          </div>
          <div
            class="shape-content"
            style={
              {
                '--container-width': this.show
                  ? '100%'
                  : 0,
                '--width': this.show
                  ? '50%'
                  : 0
              }
            }
          />
        </div>
      </div>
    )
  }
}
