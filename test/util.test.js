import { setColWidth } from '../src/util'

// it('closest', () => {
//   console.log(closest)
//   expect(closest()).toBe(undefined)
// })
//
// it('setScrollHeight', () => {
//   console.log(closest)
//   expect(setColWidth()).toBe(undefined)
// })

describe('util func setColWidth: return expected value: array', () => {
  it('argument is array ', () => {
    expect(setColWidth([100, 100, 100])).toEqual([100, 100, 100])
  })

  it('argument is string', () => {
    expect(setColWidth('100,10,,70')).toEqual([100, 10, 'auto', 70])
  })

  it('argument is number', () => {
    expect(setColWidth(100)).toBe('auto')
  })

  it('argument is \'avg\'', () => {
    expect(setColWidth('avg')).toEqual(new Array(100).fill(1))
  })

  it('argument is invalid value', () => {
    expect(setColWidth('xxx')).toBe('auto')
  })
})

