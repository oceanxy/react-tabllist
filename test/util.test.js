import { closest } from '../src/util'
// import { closest, setColWidth, setScrollHeight } from '../src/util'

it('closest func return expected value', () => {
  expect(closest()).toBe(null)
})

// describe('setScrollHeight func return expected value', () => {
//   it('show header', () => {
//     expect(setScrollHeight({
//       property: {
//         style: { height: 300 },
//         list: {
//           header: { show: true, style: { height: 100 } }
//         }
//       }
//     })).toBe(200)
//   })
//
//   it('do not show header', () => {
//     expect(setScrollHeight({
//       property: {
//         style: { height: 300 },
//         list: {
//           header: { show: false, style: { height: 100 } }
//         }
//       }
//     })).toBe(300)
//   })
// })
//
// describe('setColWidth func return expected value', () => {
//   it('argument is array ', () => {
//     expect(setColWidth([100, 100, 100])).toEqual([100, 100, 100])
//   })
//
//   it('argument is string', () => {
//     expect(setColWidth('100,10,,70')).toEqual([100, 10, 'auto', 70])
//   })
//
//   it('argument is number', () => {
//     expect(setColWidth(100)).toBe('auto')
//   })
//
//   it('argument is \'avg\'', () => {
//     expect(setColWidth('avg')).toEqual(new Array(100).fill(1))
//   })
//
//   it('argument is invalid value', () => {
//     expect(setColWidth('xxx')).toBe('auto')
//   })
// })
