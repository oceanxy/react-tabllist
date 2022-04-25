import './index.scss'
import Scroll from '@/components/Property/Scroll'

export default {
  render() {
    return (
      <div class="tg-household-label">
        <div class="item">
          <div class="name">名称</div>
          <div class="connecting-line">
            <div />
          </div>
          {
            '1,436,346'.split('').map(numStr => {
              return !isNaN(+numStr)
                ? <Scroll
                  class="value"
                  targetNumber={+numStr}
                />
                : <div style={{ color: '#45d2ff' }}>{numStr}</div>
            })
          }
        </div>
      </div>
    )
  }
}
