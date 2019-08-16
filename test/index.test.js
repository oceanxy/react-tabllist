import 'jsdom-global/register'
import React from 'react'
import ReactTabllist from '../src'
import Enzyme from './enzyme.config'

const mockApp = (props) => {
	const wrapper = Enzyme.mount(<ReactTabllist {...props} />)
	// console.log(wrapper.debug())

	return { props, wrapper }
}

const { wrapper } = mockApp({
	// className: 'test',
	// data: [
	// 	['test1', 'test2', 'test3'],
	// 	['1-1', '1-2', '1-3'],
	// 	['2-1', '2-2', '2-3'],
	// 	['3-1', '3-2', '3-3']
	// ]
})

it('exports modules correctly', () => {
	expect(ReactTabllist).toMatchSnapshot()
})

it('change height of container', () => {
	wrapper.setProps({
		property: {
			style: {
				width: 500,
				height: 500
			}
		}
	})

	expect(wrapper.find('.list').getDOMNode().style.height).toBe('500px')
	expect(wrapper.find('.list').getDOMNode().style.width).toBe('500px')
})

describe('display header', () => {
  it('not display header', () => {
    wrapper.setProps({
      property: { header: { show: false } }
    })

    expect(wrapper.exists('.list-header')).toEqual(false)
  })

  it('change style for row of header', () => {
    wrapper.setProps({
      property: { header: { show: true } }
    })

    const headerHeight = wrapper.find('.list-header').getDOMNode().style.height

    expect(headerHeight).toBe('30px')

    wrapper.setProps({
      property: { header: { style: { height: 40 } } }
    })

    expect(wrapper.exists('.list-header')).toEqual(true)
    expect(wrapper.find('.list-header').getDOMNode().style.height).not.toBe(headerHeight)
  })

  it('change style for cell of header', () => {
    expect(wrapper.find('.list-header .list-cell').at(0).getDOMNode().style.color).toBe('rgb(0, 0, 0)')
  })
})

// describe('test data', () => {
//   it('data is null', () => {
//     wrapper.setProps({ data: [] })
//     expect(wrapper.find('.list-header .list-cell').length).toBe(0)
//   })
//
//   it('only title', () => {
//     wrapper.setProps({ data: [['t1', 't2', 't3', 't4', 't5']] })
//     expect(wrapper.find('.list-header .list-cell').length).toBe(5)
//   })
//
//   it('1 row and 2 column', () => {
//     wrapper.setProps({ data: [['t1', 't2'], ['c1', 'c2']] })
//     expect(wrapper.find('.list-header .list-cell')).toHaveLength(2)
//     expect(wrapper.find('.list-body').childAt(0).find('.list-row')).toHaveLength(1)
//   })
// })
//
// describe('change property', () => {
//   const { wrapper } = mockApp({ property: { style: { height: 300 } } })
//
//   it('change property.style', () => {
//     expect(wrapper.find('.list').getDOMNode().style.height).toBe('300px')
//     wrapper.setProps({ property: { style: { height: 400 } } })
//     expect(wrapper.find('.list').getDOMNode().style.height).toBe('400px')
//   })
//
//   it('change property.list.border', () => {
//     wrapper.setProps({ property: { border: { borderWidth: 2 } } })
//     expect(wrapper.find('.list').getDOMNode().style.borderWidth).toBe('2px')
//   })
//
//   it('close scroll', () => {
//     wrapper.setProps({ property: { isScroll: false } })
//     expect(wrapper.find('.list').getDOMNode().offsetTop).toBe(0)
//   })
//
//   it('open scroll', () => {
//     wrapper.setProps({ property: { speed: 60, isScroll: true } })
//     jest.setTimeout(1000)
//     expect(wrapper.find('.list').getDOMNode().offsetTop).toBeGreaterThanOrEqual(0)
//   })
// })
//
// describe('test cells', () => {
//   it('test style', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           cell: {
//             style: {
//               fontSize: 12
//             }
//           }
//         }
//       }
//     })
//
//     const rows = wrapper.find('.list-body .list-cont').at(0).find('.list-row')
//
//     expect(
//       rows.at(0)
//         .find('.list-cell').at(0)
//         .getDOMNode().style.fontSize)
//       .toBe('12px')
//   })
//
//   it('test width of cell when type of width is array', () => {
//     wrapper.setProps({
//       data: [
//         ['1st column', '2nd column', '3rd column'],
//         ['1st cell', '2nd cell', '3rd cell'],
//         ['1st cell', '2nd cell', '3rd cell']
//       ],
//       property: {
//         body: {
//           cell: {
//             style: {
//               width: [70, 80, 90]
//             }
//           }
//         }
//       }
//     })
//
//     const cells = wrapper
//       .find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell')
//
//     expect(cells.at(0).getDOMNode().style.width).toBe('70px')
//     expect(cells.at(1).getDOMNode().style.width).toBe('80px')
//   })
//
//   it('test width of cell when type of width is string', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           cell: {
//             style: {
//               width: '70,, 90'
//             }
//           }
//         }
//       }
//     })
//
//     const cells = wrapper
//       .find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell')
//
//     expect(cells.at(0).getDOMNode().style.width).toBe('70px')
//     expect(cells.at(1).getDOMNode().style.width).toBe('auto')
//     expect(cells.at(2).getDOMNode().style.width).toBe('90px')
//   })
//
//   it('test width of cell when type of width is number or invalid value', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           cell: {
//             style: {
//               width: 1
//             }
//           }
//         }
//       }
//     })
//
//     const cells = wrapper
//       .find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell')
//
//     expect(cells.at(0).getDOMNode().style.width).toBe('auto')
//     expect(cells.at(1).getDOMNode().style.width).toBe('auto')
//     expect(cells.at(2).getDOMNode().style.width).toBe('auto')
//
//     wrapper.setProps({
//       property: {
//         body: {
//           cell: {
//             style: {
//               width: 'xxxx'
//             }
//           }
//         }
//       }
//     })
//
//     expect(cells.at(0).getDOMNode().style.width).toBe('auto')
//     expect(cells.at(1).getDOMNode().style.width).toBe('auto')
//     expect(cells.at(2).getDOMNode().style.width).toBe('auto')
//   })
//
//   it('test width of cell when type of width is string and its value is "avg"', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           cell: {
//             style: {
//               width: 'avg'
//             }
//           }
//         }
//       }
//     })
//
//     const cells = wrapper
//       .find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell')
//
//     expect(cells.at(0).getDOMNode().style.width).toEqual('1px')
//     expect(cells.at(1).getDOMNode().style.width).toEqual('1px')
//     expect(cells.at(2).getDOMNode().style.width).toEqual('1px')
//   })
// })
//
// describe('change property of body', () => {
//   it('close row transition and display row serialNumber', () => {
//     expect(
//       wrapper
//         .find('.list-body .list-row').at(0)
//         .find('.list-cell').at(0).getDOMNode().style.width
//     ).toBe('1px')
//
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             transition: false,
//             serialNumber: {
//               show: true,
//               formatter: 'test{index}',
//               style: {
//                 backgroundColor: 'red'
//               },
//               specialStyle: [
//                 {
//                   width: 100
//                 }
//               ]
//             }
//           }
//         }
//       }
//     })
//
//     expect(
//       wrapper
//         .find('.list-body .list-row').at(0)
//         .find('.list-cell').at(0).text()
//     ).toEqual('test1')
//
//     expect(
//       wrapper
//         .find('.list-body .list-row').at(0)
//         .find('.list-cell').at(0).getDOMNode().style.width
//     ).toEqual('100px')
//   })
//
//   it('row spacing', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             spacing: 10
//           }
//         }
//       }
//     })
//
//     expect(
//       wrapper
//         .find('.list-body .list-cont').at(0)
//         .getDOMNode().style.borderSpacing
//     ).toBe('0 10px')
//   })
//
//   it('row checkbox', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             rowCheckBox: true
//           }
//         }
//       }
//     })
//
//     expect(
//       wrapper
//         .find('.list-body .list-cont').at(0)
//         .find('.list-row .list-cell').at(0)
//         .find('input[name="rowCheckbox"]')
//         .exists()
//     ).toEqual(true)
//   })
//
//   it('change style for row of body', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             style: {
//               height: 55
//             },
//             specialStyle: [
//               {
//                 backgroundColor: 'red'
//               },
//               {
//                 backgroundColor: 'blue'
//               }
//             ]
//           }
//         }
//       }
//     })
//
//     const rows = wrapper.find('.list-body .list-cont').at(0).find('.list-row')
//
//     expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('red')
//     expect(rows.at(1).getDOMNode().style.backgroundColor).toBe('blue')
//     expect(rows.at(0).getDOMNode().style.height).toBe('55px')
//   })
//
//   it('test visual of row', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             specialStyle: [
//               {
//                 backgroundColor: 'red'
//               }
//             ],
//             visual: {
//               show: true
//             }
//           }
//         }
//       }
//     })
//
//     const rows = wrapper.find('.list-body .list-cont').at(0).find('.list-row')
//     expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('red')
//   })
//
//   it('test silent of row', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           row: {
//             silent: {
//               style: {
//                 backgroundColor: 'yellow'
//               }
//             }
//           }
//         }
//       }
//     })
//
//     const rows = wrapper.find('.list-body .list-cont').at(0).find('.list-row')
//
//     rows.at(0).simulate('mouseenter')
//
//     expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('yellow')
//   })
//
//   it('test cells by column', () => {
//     wrapper.setProps({
//       property: {
//         body: {
//           cellOfColumn: {
//             style: [
//               {
//                 width: 100
//               },
//               {
//                 width: 200
//               }
//             ]
//           }
//         }
//       }
//     })
//
//     const rows = wrapper.find('.list-body .list-cont').at(0).find('.list-row')
//
//     expect(
//       rows.at(0)
//         .find('.list-cell').at(0)
//         .getDOMNode().style.width)
//       .toBe('100px')
//
//     expect(
//       rows.at(1)
//         .find('.list-cell').at(0)
//         .getDOMNode().style.width)
//       .toBe('100px')
//
//     expect(
//       rows.at(1)
//         .find('.list-cell').at(1)
//         .getDOMNode().style.width)
//       .toBe('200px')
//   })
// })
//
// describe('test object cell', () => {
//   it('test radio', () => {
//     wrapper.setProps({
//       data: [
//         ['t1', 't2'],
//         [
//           {
//             type: 'radio',
//             uid: '',
//             name: 'group1',
//             text: 'radio group 1-1',
//             className: 'test-radio'
//           },
//           'c2'
//         ]
//       ]
//     })
//
//     const radio = wrapper.find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell').at(0)
//
//     expect(radio.find('input[name="group1-main"]').exists()).toEqual(true)
//     expect(radio.find('span').text()).toBe('radio group 1-1')
//   })
//
//   it('test checkbox', () => {
//     wrapper.setProps({
//       data: [
//         ['t1', 't2'],
//         [
//           {
//             type: 'checkbox',
//             uid: '',
//             name: 'group1',
//             text: 'checkbox group 1-1',
//             className: 'test-checkbox'
//           },
//           'c2'
//         ]
//       ]
//     })
//
//     const checkbox = wrapper.find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell').at(0)
//
//     expect(checkbox.find('input[name="group1"]').exists()).toEqual(true)
//     expect(checkbox.find('span').text()).toBe('checkbox group 1-1')
//   })
//
//   it('test link', () => {
//     wrapper.setProps({
//       data: [
//         ['t1', 't2'],
//         [
//           {
//             type: 'link',
//             text: 'I am a link',
//             event: 'onClick',
//             href: 'https://github.com/oceanxy/react-tabllist',
//             className: 'test-link'
//           },
//           'c2'
//         ]
//       ]
//     })
//
//     const link = wrapper.find('.list-body .list-cont').at(0)
//       .find('.list-row').at(0)
//       .find('.list-cell').at(0)
//
//     expect(link.find('a[href="https://github.com/oceanxy/react-tabllist"]').exists()).toEqual(true)
//     expect(link.find('a').text()).toBe('I am a link')
//   })
//
//   it('test button', () => {
//     wrapper.setProps({
//       data: [
//         ['t1', 't2'],
//         [
//           {
//             type: 'button',
//             uid: '',
//             value: 'click me',
//             className: 'test-btn',
//             callback: (data, cellObject, obj) => {
//               obj.target.value = 'clicked'
//
//               const button = wrapper.find('.list-body .list-cont').at(0)
//                 .find('.list-row').at(0)
//                 .find('.list-cell').at(0)
//
//               expect(button.find('[type="button"]').exists()).toEqual(true)
//               button.find('input').simulate('click')
//
//               expect(button.find('input').getDOMNode().value).toBe('clicked')
//             }
//           },
//           'c2'
//         ]
//       ]
//     })
//   })
// })
