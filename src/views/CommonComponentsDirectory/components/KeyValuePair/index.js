import './index.scss'
import Scroll from '@/components/Property/Scroll'

export default {
  render() {
    return (
      <div class="tg-education">
        <div class="item">
          <div class="name">名称</div>
          <div class="value">
            {
              '2,435,455'.split('').map(numStr => {
                return !isNaN(+numStr)
                  ? <Scroll targetNumber={+numStr} />
                  : <div>{numStr}</div>
              })
            }
          </div>
          <div class="name unit">单位</div>
        </div>
      </div>
    )
  }
}
