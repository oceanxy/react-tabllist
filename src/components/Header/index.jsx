import './index.scss'
import config from '@/config'

export default {
  render() {
    return (
      <div class="tg-header">
        <div class="weather"></div>
        <div class="website">
          <span>{config.systemName}</span>
        </div>
        <div class="datetime"></div>
      </div>
    )
  }
}
