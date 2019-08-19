import 'jsdom-global/register'
import _ from 'lodash'
import React from 'react'
import ReactTabllist from '../src'
import Enzyme from './enzyme.config'

const mockApp = (props) => {
	const wrapper = Enzyme.mount(<ReactTabllist {...props} />)

	return { props, wrapper }
}

const { wrapper } = mockApp({})

it('exports modules correctly', () => {
	expect(ReactTabllist).toMatchSnapshot()
})

describe('# test className', function() {
	it('use default className', function() {
		expect(wrapper.find('.list').getDOMNode().className).toBe('list list-no-spacing')
	})

	it('add className', function() {
		wrapper.setProps({ className: 'testClassName' })
		expect(wrapper.find('.list').getDOMNode().className).toBe('list list-no-spacing testClassName')
	})
})

describe('# test data', () => {
	it('data is null', () => {
		wrapper.setProps({ data: [] })
		expect(wrapper.find('.list-header .list-cell').length).toBe(0)
	})

	it('only title', () => {
		wrapper.setProps({ data: [['t1', 't2', 't3', 't4', 't5']] })
		expect(wrapper.find('.list-body .list-cont').at(0).children().length).toBe(0)
		expect(wrapper.find('.list-header .list-cell').length).toBe(5)
	})

	it('1 row and 2 column', () => {
		wrapper.setProps({ data: [['t1', 't2'], ['c1', 'c2']] })
		expect(wrapper.find('.list-header .list-cell')).toHaveLength(2)
		expect(wrapper.find('.list-body').childAt(0).find('.list-row')).toHaveLength(1)
	})

	describe('## object unit', function() {
		// TODO
	})
})

describe('# change property', () => {
	describe('## global border', function() {
		it('use default border', function() {
			expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #f4f4f4')
		})

		it('change border color', function() {
			wrapper.setProps({ property: { border: { borderColor: '#ededed' } } })
			expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #ededed')
		})

		it('change border style', function() {
			wrapper.setProps({ property: { border: { borderStyle: 'dotted' } } })
			expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px dotted #f4f4f4')
			expect(
				wrapper.find('.list .list-body .list-cont').at(0)
					.find('.list-row').at(0)
					.find('.list-cell').at(0)
					.getDOMNode().style.border
			).toBe('1px dotted #f4f4f4')
		})

		it('change border width', () => {
			wrapper.setProps({ property: { border: { borderWidth: 2 } } })
			expect(wrapper.find('.list').getDOMNode().style.borderWidth).toBe('2px')
		})
	})

	it('change style of container ', function() {
		expect(wrapper.find('.list').getDOMNode().style.height).toBe('300px')

		wrapper.setProps({
			property: {
				style: {
					width: 500,
					height: 500,
					margin: '100px'
				}
			}
		})

		const { width, height, margin } = wrapper.find('.list').getDOMNode().style

		expect(height).toBe('500px')
		expect(width).toBe('500px')
		expect(margin).toBe('100px')
	})

	describe('## change scroll', () => {
		const data = _.range(20).map(i => {
			return [`t-${i}-1`, `t-${i}-2`, `t-${i}-3`]
		})

		it('close scroll', () => {
			wrapper.setProps({ data, property: { isScroll: false } })
			expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBe(0)
		})

		it('open scroll and continuous scrolling', done => {
			wrapper.setProps({ property: { speed: 60, isScroll: true, distance: 2 } })

			setTimeout(() => {
				expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThanOrEqual(0)
				done()
			}, 1000)
		})

		it('Scroll one row at a time', done => {
			wrapper.setProps({ property: { speed: 2000, isScroll: true, distance: -1 } })
			setTimeout(() => {
				expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBe(0)
				done()
			}, 1000)

			setTimeout(() => {
				expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThanOrEqual(0)
				done()
			}, 1000)
		})
	})

	describe('## test header', () => {
		it('not display header', () => {
			wrapper.setProps({
				property: { header: { show: false } }
			})

			expect(wrapper.exists('.list-header')).toEqual(false)
		})

		describe('### display header', () => {
			it('is exists header', () => {
				wrapper.setProps({
					property: { header: { show: true } }
				})

				expect(wrapper.exists('.list-header')).toEqual(true)
			})

			it('use default style of header', () => {
				expect(wrapper.find('.list-header').getDOMNode().style.height).toBe('40px')
			})

			it('change style', function() {
				wrapper.setProps({
					property: { header: { style: { height: 60, backgroundColor: '#000000' } } }
				})

				const { height, backgroundColor } = wrapper.find('.list-header').getDOMNode().style

				expect(height).toBe('60px')
				expect(backgroundColor).toBe('rgb(0, 0, 0)')
			})

			it('change style for cell of header', () => {
				wrapper.setProps({
					property: {
						header: {
							cellStyle: {
								height: 60,
								backgroundColor: '#f4f4f4',
								color: 'red'
							}
						}
					}
				})

				const { color, backgroundColor, height } = wrapper.find('.list-header .list-cell').at(0).getDOMNode().style

				expect(color).toBe('red')
				expect(backgroundColor).toBe('rgb(244, 244, 244)')
				expect(height).toBe('60px')
			})
		})
	})
})

describe('# test cells of body', () => {
	it('test style', () => {
		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							fontSize: 12,
							minWidth: 80,
							color: 'blue',
							textAlign: 'left',
							border: '1px solid blue',
							width: 'auto'
						}
					}
				}
			}
		})

		const {
			fontSize,
			minWidth,
			color,
			textAlign,
			borderColor,
			width
		} = wrapper.find('.list-body .list-cont').at(0).find('.list-row').at(0)
			.find('.list-cell').at(2)
			.getDOMNode().style

		expect(fontSize).toBe('12px')
		expect(minWidth).toBe('80px')
		expect(color).toBe('blue')
		expect(textAlign).toBe('left')
		expect(borderColor).toBe('blue')
		expect(width).toBe('auto')
	})

	it('test width of cell when width value is \'avg\'', function() {
		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							width: 'avg'
						}
					}
				}
			}
		})

		const cells = wrapper.find('.list-body .list-cont').at(0).find('.list-row').at(1)
		const cell1 = cells.find('.list-cell').at(0).getDOMNode().style.width
		const cell2 = cells.find('.list-cell').at(1).getDOMNode().style.width

		expect(cell1).toBe(cell2)
	})

	it('test width of cell when type of width value is array', () => {
		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							width: [100, , 300]
						}
					}
				}
			}
		})

		const cells = wrapper
			.find('.list-body .list-cont').at(0)
			.find('.list-row').at(1)
			.find('.list-cell')

		expect(cells.at(0).getDOMNode().style.width).toBe('100px')
		expect(cells.at(1).getDOMNode().style.width).toBe('auto')
		expect(cells.at(2).getDOMNode().style.width).toBe('300px')
	})

	it('test width of cell when type of width is string', () => {
		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							width: '70,,90'
						}
					}
				}
			}
		})

		const cells = wrapper
			.find('.list-body .list-cont').at(0)
			.find('.list-row').at(0)
			.find('.list-cell')

		expect(cells.at(0).getDOMNode().style.width).toBe('70px')
		expect(cells.at(1).getDOMNode().style.width).toBe('auto')
		expect(cells.at(2).getDOMNode().style.width).toBe('90px')
	})

	it('test width of cell when type of width is number or invalid value', () => {
		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							width: 1
						}
					}
				}
			}
		})

		const cells = wrapper
			.find('.list-body .list-cont').at(1)
			.find('.list-row').at(0)
			.find('.list-cell')

		expect(cells.at(0).getDOMNode().style.width).toBe('auto')
		expect(cells.at(1).getDOMNode().style.width).toBe('auto')
		expect(cells.at(2).getDOMNode().style.width).toBe('auto')

		wrapper.setProps({
			property: {
				body: {
					cell: {
						style: {
							width: 'xxxx'
						}
					}
				}
			}
		})

		expect(cells.at(0).getDOMNode().style.width).toBe('auto')
		expect(cells.at(1).getDOMNode().style.width).toBe('auto')
		expect(cells.at(2).getDOMNode().style.width).toBe('auto')
	})
})

it('test style of body', function() {
	wrapper.setProps({
		property: {
			body: {
				style: {
					backgroundColor: 'blue'
				}
			}
		}
	})

	expect(wrapper.find('.list-body').getDOMNode().style.backgroundColor).toEqual('blue')
})

it('test style of cellOfColumn', function() {
	wrapper.setProps({
		property: {
			body: {
				cellOfColumn: {
					style: [
						{ backgroundColor: 'red' },
						{ backgroundColor: 'black' },
						{ backgroundColor: 'green' }
					]
				}
			}
		}
	})

	const cells = wrapper.find('.list-body .list-row').at(1).find('.list-cell')
	const cell1 = cells.at(0).getDOMNode().style.backgroundColor
	const cell2 = cells.at(1).getDOMNode().style.backgroundColor
	const cell3 = cells.at(2).getDOMNode().style.backgroundColor

	expect(cell1).toBe('red')
	expect(cell2).toBe('black')
	expect(cell3).toBe('green')
})

// describe('# change property of body', () => {
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
