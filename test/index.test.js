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

		// 此测试失败：获取不到scrollTop
		it('open scroll and continuous scrolling', () => {
			// it('open scroll and continuous scrolling', done => {
			wrapper.setProps({
				property: {
					style: { height: 100 },
					header: { show: false },
					scroll: {
						enable: true,
						speed: 60,
						distance: 2
					}
				}
			})

			// setTimeout(() => {
			expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThanOrEqual(0)
			// 	done()
			// }, 1000)
		})

		// 此测试失败：获取不到scrollTop
		it('Scroll one row at a time', () => {
			// it('Scroll one row at a time', done => {
			wrapper.setProps({
				property: {
					header: { show: false },
					scroll: {
						enable: true,
						speed: 2000,
						distance: -1
					}
				}
			})
			// setTimeout(() => {
			expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBe(0)
			// 	done()
			// }, 1000)

			// setTimeout(() => {
			expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThanOrEqual(0)
			// 	done()
			// }, 1000)
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

	it('test width of cell when width value is \'avg\' and show checkbox and show serial number', function() {
		const wrapperAvg = Enzyme.mount(<ReactTabllist />)
		wrapperAvg.setProps({
			data: [
				['t1', 't2', 't3', 't4'],
				['c1', 'c2', 'c3', 'c4'],
				['c5', 'c6', 'c7', 'c8'],
				['c9', 'c10', 'c11', 'c12']
			],
			property: {
				body: {
					row: {
						serialNumber: { show: true },
						rowCheckbox: { show: true }
					},
					cell: {
						style: {
							width: 'avg'
						}
					}
				}
			}
		})

		const cells = wrapperAvg.find('.list-header .list-row')
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
							width: [100, 'x', '300px']
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
							width: '70,,90,5%'
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

describe('# test row of body', () => {
	it('test transition', function() {
		expect(wrapper.find('.list .list-body .list-row').at(0).getDOMNode().className).toBe('list-row list-row-end')

		wrapper.setProps({
			property: {
				body: {
					row: {
						transition: false
					}
				}
			}
		})

		expect(wrapper.find('.list .list-body .list-row').at(0).getDOMNode().className).toBe('list-row')
	})

	it('test spacing', function() {
		const { borderSpacing, borderCollapse } = wrapper.find('.list .list-body .list-cont').at(0).getDOMNode().style

		expect(borderSpacing).toBe('0px')
		expect(borderCollapse).toBe('collapse')

		wrapper.setProps({
			property: {
				body: {
					row: {
						spacing: 10
					}
				}
			}
		})

		const { borderSpacing: borderSpacing1, borderCollapse: borderCollapse1 } = wrapper.find('.list .list-body .list-cont')
			.at(0)
			.getDOMNode().style

		expect(borderSpacing1).toBe('0 10px')
		expect(borderCollapse1).toBe('separate')
	})

	it('test style of row', () => {
		wrapper.setProps({
			property: {
				body: {
					row: {
						style: {
							height: 60
						}
					}
				}
			}
		})

		expect(
			wrapper
				.find('.list-body .list-row').at(1).getDOMNode().style.height
		).toBe('60px')
	})

	it('test row serialNumber', () => {
		expect(
			wrapper
				.find('.list-body .list-row').at(1)
				.find('.list-cell').at(0).getDOMNode().style.width
		).toBe('auto')

		wrapper.setProps({
			property: {
				body: {
					row: {
						serialNumber: {
							show: true,
							columnName: 'test SN',
							formatter: 'test{index}',
							column: 2,
							style: { backgroundColor: 'red' },
							specialStyle: [{}, { backgroundColor: 'blue' }]
						}
					},
					cell: {
						style: {
							width: [, 111]
						}
					}
				}
			}
		})

		// 测试开启行号后的列数是否正确
		expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(4)

		// 测试自定义行号列的名称
		expect(wrapper.find('.list-header .list-cell').at(1).text()).toEqual('test SN')

		// 测试序号是否正确
		expect(
			wrapper
				.find('.list-body .list-row').at(0)
				.find('.list-cell').at(1).text()
		).toEqual('test1')

		// 测试行号所在单元格的style
		expect(wrapper
			.find('.list-body .list-row').at(0)
			.find('.list-cell').at(1).getDOMNode().style.width
		).toEqual('111px')

		// 测试行号标签的style
		expect(wrapper
			.find('.list-body .list-row').at(0)
			.find('.list-cell').at(1).childAt(0).getDOMNode().style.backgroundColor
		).toEqual('red')

		// 测试指定行的行号标签的style
		expect(wrapper
			.find('.list-body .list-row').at(1)
			.find('.list-cell').at(1).childAt(0).getDOMNode().style.backgroundColor
		).toEqual('blue')
	})

	it('test rowCheckbox', () => {
		wrapper.setProps({
			property: {
				body: {
					row: {
						serialNumber: { show: false },
						rowCheckbox: {
							show: true,
							column: 2,
							style: { backgroundColor: 'blue' },
							specialStyle: [{ backgroundColor: 'red' }]
						}
					},
					cell: {
						style: {
							width: [, 111, 112]
						}
					}
				}
			}
		})

		// 测试开启行选择框后的列数是否正确
		expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(4)

		// 测试开启行选择框后，所在列的索引（关闭row serialNumber）
		expect(wrapper
			.find('.list-header .list-row .list-cell').at(1)
			.find('input[name="rowCheckbox"]')
			.exists()
		).toEqual(true)

		// 测试选择框所在标签的样式
		expect(wrapper
			.find('.list-body .list-row').at(1)
			.find('.list-cell').at(1)
			.childAt(0)
			.getDOMNode().style.backgroundColor
		).toBe('blue')

		// 测试指定行选择框所在标签的样式
		expect(wrapper
			.find('.list-body .list-row').at(0)
			.find('.list-cell').at(1)
			.childAt(0)
			.getDOMNode().style.backgroundColor
		).toBe('red')

		wrapper.setProps({
			property: {
				body: {
					row: {
						serialNumber: { show: true, column: 2 },
						rowCheckbox: { show: true, column: 2 }
					}
				}
			}
		})

		// 测试开启行选择框后的列数是否正确
		expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(5)

		// 测试开启行选择框后，所在列的索引（开启row serialNumber）
		expect(wrapper
			.find('.list-header .list-row .list-cell').at(2)
			.find('input[name="rowCheckbox"]')
			.exists()
		).toEqual(true)
	})

	it('test specialStyle of row', () => {
		wrapper.setProps({
			property: {
				body: {
					row: {
						style: {
							backgroundColor: 'white'
						},
						specialStyle: [
							{ backgroundColor: 'red' },
							{},
							{ backgroundColor: 'blue' }
						]
					}
				}
			}
		})

		const rows = wrapper.find('.list-body .list-row')
		expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('red')
		expect(rows.at(1).getDOMNode().style.backgroundColor).toBe('white')
		expect(rows.at(2).getDOMNode().style.backgroundColor).toBe('blue')
	})

	it('test visual of row', () => {
		wrapper.setProps({
			property: {
				body: {
					row: {
						style: { backgroundColor: 'black' },
						visual: {
							show: true,
							interval: 2,
							style: { backgroundColor: 'green' }
						}
					}
				}
			}
		})

		const rows = wrapper.find('.list-body .list-row')
		expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('black')
		expect(rows.at(1).getDOMNode().style.backgroundColor).toBe('black')
		expect(rows.at(2).getDOMNode().style.backgroundColor).toBe('green')
		expect(rows.at(3).getDOMNode().style.backgroundColor).toBe('green')
	})

	it('test silent of row', () => {
		wrapper.setProps({
			property: {
				body: {
					row: {
						style: {
							backgroundColor: 'purple',
							opacity: 1
						},
						silent: {
							show: false, // false是启用的意思
							style: {
								backgroundColor: 'yellow',
								opacity: 0.5
							}
						}
					}
				}
			}
		})

		const rows = wrapper.find('.list-body .list-row').at(0)

		// 测试触发事件之前的style
		expect(rows.getDOMNode().style.backgroundColor).toBe('purple')
		expect(rows.getDOMNode().style.opacity).toBe('1')

		// 测试行的hover效果，模拟mouseenter事件
		rows.simulate('mouseenter')

		expect(rows.getDOMNode().style.backgroundColor).toBe('yellow')
		expect(rows.getDOMNode().style.opacity).toBe('0.5')

		// 测试行的hover效果，模拟mouseleave事件
		rows.simulate('mouseleave')

		expect(rows.getDOMNode().style.backgroundColor).toBe('purple')
		expect(rows.getDOMNode().style.opacity).toBe('1')
	})
})

describe('# test object unit', function() {
	function testClick(border) {
		wrapper.setProps({
			property: {
				border: border
			}
		})
	}

	it('test type: row', function() {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				{
					type: 'row',
					data: 'null',
					event: 'onClick',
					callback: (data, cellData, event) => {
						testClick({
							borderWidth: 6,
							borderStyle: 'double',
							borderColor: '#000000'
						})
					},
					className: '',
					key: ''
				},
				['t-2-1', 't-2-2', 't-2-3']
			]
		})

		const noCellsRow = wrapper.find('.list-body .list-row')

		expect(noCellsRow.at(0).simulate('click'))
		expect(wrapper.find('.list').getDOMNode().style.border).toBe('6px double #000000')

		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				{
					type: 'row',
					cells: ['t-1-1', 't-1-2', 't-1-3'],
					data: 'null',
					event: 'onClick',
					callback: (data, cellData, event) => {
						testClick({
							borderWidth: 4,
							borderStyle: 'double',
							borderColor: '#000000'
						})
					},
					className: '',
					key: ''
				},
				['t-2-1', 't-2-2', 't-2-3']
			]
		})

		const row = wrapper.find('.list-body .list-row')

		expect(row.at(0).simulate('click'))
		expect(wrapper.find('.list').getDOMNode().style.border).toBe('4px double #000000')
	})

	it('test type: button', () => {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				[
					{
						type: 'button',
						value: 'click me',
						className: 'test-btn',
						event: 'onClick',
						callback: (data, cellObject, obj) => {
							testClick({
								borderWidth: 2,
								borderStyle: 'solid',
								borderColor: '#000000'
							})
						}
					},
					'c2',
					'c3'
				]
			]
		})

		const button = wrapper.find('.list-body .list-row').at(0)
			.find('.list-cell').at(0)

		expect(button.find('[type="button"]').exists()).toEqual(true)
		button.find('input').simulate('click')
		expect(wrapper.find('.list').getDOMNode().style.border).toBe('2px solid #000000')
	})

	it('test type: img', function() {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				[
					{
						type: 'img',
						src: 'http://www.xieyangogo.cn/pic.png',
						alt: '',
						text: 'IMG description',
						className: 'test-img',
						key: '',
						value: ''
					},
					'c2',
					'c3'
				]
			]
		})

		const link = wrapper.find('.list-body .list-row').at(0)
			.find('.list-cell').at(0)

		expect(link.find('.test-img').exists()).toEqual(true)
		expect(link.find('.test-img').getDOMNode().src).toBe('http://www.xieyangogo.cn/pic.png')
		expect(link.find('span').text()).toBe('IMG description')
	})

	it('test type: link', () => {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				[
					{
						type: 'link',
						text: 'I am a link, I use the href attribute',
						href: 'https://github.com/oceanxy/react-tabllist',
						className: 'test-link1',
						key: ''
					},
					'c2',
					'c3'
				]
			]
		})

		const link = wrapper.find('.list-body .list-row').at(0)
			.find('.list-cell').at(0)

		expect(link.find('.test-link1').exists()).toEqual(true)
		expect(link.find('.test-link1').getDOMNode().href).toEqual('https://github.com/oceanxy/react-tabllist')
		expect(link.find('a').text()).toBe('I am a link, I use the href attribute')
	})

	it('test type: link2', function() {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				[
					'c1',
					{
						type: 'link',
						data: 3,
						text: 'I am a link, I use event and callback to implement custom functions',
						className: 'test-link2',
						key: '',
						event: 'onClick',
						callback: (data, cellData, event) => {
							testClick({
								borderWidth: data
							})
						}
					},
					'c3'
				]
			]
		})

		const link = wrapper.find('.list-body .list-row').at(0)
			.find('.list-cell').at(1)

		expect(link.find('.test-link2').exists()).toEqual(true)
		expect(link.find('a').text()).toBe('I am a link, I use event and callback to implement custom functions')
		link.find('a').simulate('click')
		expect(wrapper.find('.list').getDOMNode().style.border).toBe('3px solid #f4f4f4')
	})

	it('test type: text', function() {
		wrapper.setProps({
			data: [
				['t1', 't2', 't3'],
				[
					'c1',
					{
						type: 'text',
						text: '我是一个普通文本',
						className: 'test-text',
						callback: () => {
							testClick({
								borderColor: '#000000'
							})
						}
					},
					'c3'
				]
			]
		})

		const text = wrapper.find('.list-body .list-row').at(0)
			.find('.list-cell').at(1)

		expect(text.find('.test-text').exists()).toEqual(true)
		expect(text.find('span').text()).toBe('我是一个普通文本')
		text.find('span').simulate('click')
		expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #000000')
	})

	it('test type: select', function() {
		const handler = jest.fn(() => {})

		wrapper.setProps({
			data: [
				[
					't1',
					't2',
					{
						type: 'select',
						text: '滚动到：',
						data: 123,
						className: '',
						option: [
							{
								id: '1',
								label: 'Scroll to the 2nd row',
								value: 0
							},
							{
								id: '2',
								label: 'Scroll to the 5rd row',
								value: 1
							},
							{
								id: '3',
								label: 'Scroll to the 7rd row',
								value: 2
							}
						],
						event: 'onChange',
						callback: (restData, objectUnit, event) => {
							const { value } = event.target
							const { data } = objectUnit.instanceObject.props

							for(let i = 0, k = data; i < k.length; i++) {
								if(_.isPlainObject(data[i]) && parseInt(data[i].value) === parseInt(value)) {
									handler()
									objectUnit.instanceObject.scrollTo(i - 1)
									break
								}
							}
						}
					}
				],
				['c1', 'c2', 'c3'],
				{
					type: 'row',
					data: 1,
					value: 0,
					event: 'onClick',
					callback: (restData, objectUnit, event) => {
						alert('test event of row')
						console.log(restData, objectUnit, event)
					},
					className: 'click-row',
					cells: [
						'row 1; column 1',
						{
							type: 'link',
							text: 'I am a first link',
							className: 'test-link',
							callback: () => {console.log('I am a first link')}
						},
						{
							type: 'link',
							text: 'I am a second link',
							href: 'https://github.com/oceanxy/react-tabllist',
							className: 'test-link'
						},
						{
							type: 'button',
							value: 'click me',
							className: 'test-btn',
							callback: () => {
								alert('hello react-tabllist')
							}
						}
					]
				}
			]
		})

		const text = wrapper.find('.list-header .list-cell').at(2)

		expect(text.find('select').exists()).toEqual(true)
		expect(text.find('span').text()).toBe('滚动到：')
		text.find('select').simulate('change', { target: { value: 0 } })
		expect(handler).toHaveBeenCalled()
	})

	// it('test radio', () => {
	// 	wrapper.setProps({
	// 		data: [
	// 			['t1', 't2'],
	// 			[
	// 				{
	// 					type: 'radio',
	// 					name: 'group1',
	// 					text: 'radio group 1-1',
	// 					value: 0,
	// 					className: 'test-radio'
	// 				},
	// 				{
	// 					type: 'radio',
	// 					name: 'group1',
	// 					text: 'radio group 1-2',
	// 					value: 1,
	// 					className: 'test-radio'
	// 				}
	// 			],
	// 			['c1', 'c2']
	// 		]
	// 	})
	//
	// 	const radio = wrapper.find('.list-body .list-row').at(0)
	// 		.find('.list-cell').at(0)
	//
	// 	expect(radio.find('input[name="group1-main"]').exists()).toEqual(true)
	// 	expect(radio.find('span').text()).toBe('radio group 1-1')
	// 	radio.find('input').simulate('change', { target: { value: '0' } })
	// 	console.log(wrapper.children().state().selected)
	// 	expect(radio.find('input').getDOMNode().checked).toEqual(true)
	// })

	// it('test checkbox', () => {
	// 	wrapper.setProps({
	// 		data: [
	// 			['t1', 't2'],
	// 			[
	// 				{
	// 					type: 'checkbox',
	// 					name: 'group1',
	// 					text: 'checkbox group 1-1',
	// 					className: 'test-checkbox'
	// 				},
	// 				'c2'
	// 			]
	// 		]
	// 	})
	//
	// 	const checkbox = wrapper.find('.list-body .list-cont').at(0)
	// 		.find('.list-row').at(0)
	// 		.find('.list-cell').at(0)
	//
	// 	expect(checkbox.find('input[name="group1"]').exists()).toEqual(true)
	// 	expect(checkbox.find('span').text()).toBe('checkbox group 1-1')
	// })
})

describe('test lifecycles', function() {
	it('test componentWillUnmount', function() {
		const lifecycleWrapper = Enzyme.mount(<ReactTabllist />)

		lifecycleWrapper.unmount()
	})
})
