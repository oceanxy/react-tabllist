/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: demo
 * @Date: 2019-01-14 17:47:41
 * @LastModified: Oceanxy（xyzsyx@163.com）
 * @LastModifiedTime: 2019-02-25 18:22:12
 */

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabllist from '../../src'
import demo7_header_bg from './images/demo7_header_bg.png'
import demo7_row_bg from './images/demo7_row_bg.png'
import demo8_header_bg from './images/demo8_row_bg.png'
import demo8_row_bg from './images/demo8_row_bg.png'
import rowBg from './images/row-bg.png'
import './index.scss'

hljs.initHighlightingOnLoad()

const Demo = () => {
	const option2 = {
		data: [
			['1st column title', '2nd column title', '3rd column title'],
			['row 1; column 1', 'row 1; column 2', 'row 1; column 3'],
			['row 2; column 1', 'row 2; column 2', 'row 2; column 3'],
			['row 3; column 1', 'row 3; column 2', 'row 3; column 3'],
			['row 4; column 1', 'row 4; column 2', 'row 4; column 3'],
			['row 5; column 1', 'row 5; column 2', 'row 5; column 3'],
			['row 6; column 1', 'row 6; column 2', 'row 6; column 3'],
			['row 7; column 1', 'row 7; column 2', 'row 7; column 3'],
			['row 8; column 1', 'row 8; column 2', 'row 8; column 3'],
			['row 9; column 1', 'row 9; column 2', 'row 9; column 3']
		],
		property: {
			// The style of the outermost container
			style: {
				width: '100%',
				margin: '0 auto',
				height: 200,
				border: '1px solid #999999'
			},
			border: {
				borderWidth: 0
			},
			header: {
				show: true,
				style: {
					borderBottom: '1px solid #999999'
				},
				cellStyle: {
					fontWeight: 'bolder',
					fontSize: 20,
					color: '#333333'
				}
			},
			isScroll: false
		}
	}
	const option3 = {
		data: [
			['row 1; column 1', 'row 1; column 2', 'row 1; column 3'],
			['row 2; column 1', 'row 2; column 2', 'row 2; column 3'],
			['row 3; column 1', 'row 3; column 2', 'row 3; column 3'],
			['row 4; column 1', 'row 4; column 2', 'row 4; column 3'],
			['row 5; column 1', 'row 5; column 2', 'row 5; column 3'],
			['row 6; column 1', 'row 6; column 2', 'row 6; column 3'],
			['row 7; column 1', 'row 7; column 2', 'row 7; column 3'],
			['row 8; column 1', 'row 8; column 2', 'row 8; column 3']
		],
		property: {
			// The style of the outermost container
			style: {
				width: '100%',
				margin: '0 auto',
				height: 300,
				border: '1px solid #999999'
			},
			border: {
				borderWidth: 1,
				borderStyle: 'solid',
				borderColor: '#999999'
			},
			header: {
				show: false
			},
			body: {
				row: {
					visual: {
						show: true,
						interval: 1,
						style: {
							backgroundColor: '#e8f4fc'
						}
					},
					silent: {
						show: false,
						style: {
							backgroundColor: '#bcf0fc'
						}
					}
				}
			},
			speed: 50,
			isScroll: true
		}
	}
	const option4 = {
		data: [
			['1st column', '2nd column', '3rd column', '4rd column'],
			['row 1; column 1', 'row 1; column 2', 'row 1; column 3', 'row 1; column 4'],
			['row 2; column 1', 'row 2; column 2', 'row 2; column 3', 'row 2; column 4'],
			['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
			['row 4; column 1', 'row 4; column 2', 'row 4; column 3', 'row 4; column 4'],
			['row 5; column 1', 'row 5; column 2', 'row 5; column 3', 'row 5; column 4'],
			['row 6; column 1', 'row 6; column 2', 'row 6; column 3', 'row 6; column 4'],
			['row 7; column 1', 'row 7; column 2', 'row 7; column 3', 'row 7; column 4'],
			['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
			['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
		],
		property: {
			// The style of the outermost container
			style: {
				width: '100%',
				margin: '0 auto',
				height: 300,
				border: '1px solid #999999'
			},
			border: {
				borderWidth: 1,
				borderStyle: 'solid',
				borderColor: '#ededed'
			},
			header: {
				show: true,
				style: {
					backgroundColor: '#1693ff',
					height: 40,
					borderBottom: '1px solid #999999'
				},
				cellStyle: {
					color: '#ffffff',
					fontWeight: 'bolder',
					fontSize: 20
				}
			},
			body: {
				row: {
					serialNumber: {
						show: true,
						formatter: 'No.{index}',
						style: {
							backgroundColor: '#1693ff',
							color: '#ffffff',
							width: 80
						}
					},
					style: {
						height: 34
					},
					visual: {
						show: true,
						style: {
							backgroundColor: '#e8f4fc'
						}
					},
					silent: {
						style: {
							backgroundColor: '#bcf0fc'
						}
					}
				},
				cell: {
					style: {
						fontSize: 16,
						minWidth: 50,
						color: '#000000',
						textAlign: 'center',
						border: '',
						width: 'auto'
					}
				}
			},
			speed: 40,
			isScroll: true
		}
	}
	const option5 = {
		data: [
			['1st column', '2nd column', '3rd column', '4rd column'],
			[
				'row 1; column 1',
				'row 1; column 2',
				{
					type: 'link',
					text: 'I am a link',
					event: 'onClick',
					href: 'https://github.com/oceanxy/react-tabllist',
					className: 'test-link'
				},
				{
					type: 'button',
					uid: '',
					value: 'click me',
					className: 'test-btn',
					callback: () => {
						alert('hello react-tabllist')
					}
				}
			],
			[
				'row 2; column 1', 'row 2; column 2',
				{
					type: 'link',
					text: 'I am a link',
					event: 'onClick',
					href: 'https://github.com/oceanxy/react-tabllist',
					className: 'test-link'
				},
				{
					type: 'button',
					uid: '',
					value: 'click me',
					className: 'test-btn',
					callback: () => {
						alert('hello react-tabllist')
					}
				}
			],
			['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
			[
				{
					type: 'link',
					text: 'I am a link',
					event: 'onClick',
					href: 'https://github.com/oceanxy/react-tabllist',
					className: 'test-link'
				},
				{
					type: 'button',
					uid: '',
					value: 'click me',
					className: 'test-btn',
					callback: () => {
						alert('hello react-tabllist')
					}
				}, 'row 4; column 3', 'row 4; column 4'
			],
			[
				[
					{
						type: 'radio',
						uid: '',
						name: 'group1',
						text: 'radio group 1-1',
						className: 'test-radio'
					},
					{
						type: 'radio',
						uid: '',
						name: 'group1',
						text: 'radio group 2-1',
						className: 'test-radio'
					}
				],
				'row 5; column 2',
				'row 5; column 3',
				'row 5; column 4'
			],
			[
				[
					{
						type: 'radio',
						uid: '',
						name: 'group2',
						text: 'radio group 2-1',
						className: 'test-radio'
					},
					{
						type: 'radio',
						uid: '',
						name: 'group2',
						text: 'radio group 2-2',
						className: 'test-radio'
					}
				],
				'row 6; column 2',
				'row 6; column 3',
				'row 6; column 4'
			],
			[
				'row 7; column 1', 'row 7; column 2',
				{
					type: 'link',
					text: 'I am a link',
					event: 'onClick',
					href: 'https://github.com/oceanxy/react-tabllist',
					className: 'test-link'
				},
				{
					type: 'button',
					uid: '',
					value: 'click me',
					className: 'test-btn',
					callback: (data, cellObject, cellElement) => {
						if(!data) {
							data = 'data of button is undefined'
						}

						cellElement.target.value = 'you clicked me!!'
						cellElement.target.style.width = '150px'

						console.log(data)
						console.log(cellObject)
						console.log(cellElement)

						alert('hello react-tabllist, Please check the console')
					}
				}
			],
			['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
			['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
		],
		property: {
			// The style of the outermost container
			style: {
				width: '100%',
				margin: '0 auto',
				height: 300,
				border: '1px solid #999999'
			},
			border: {
				borderWidth: 1,
				borderStyle: 'solid',
				borderColor: '#ededed'
			},
			header: {
				show: true,
				style: {
					backgroundColor: '#1693ff',
					height: 40,
					borderBottom: '1px solid #999999'
				},
				cellStyle: {
					color: '#ffffff',
					fontWeight: 'bolder',
					fontSize: 20
				}
			},
			body: {
				row: {
					rowCheckbox: true,
					style: {
						height: 34
					},
					specialStyle: [
						{ height: 60 },
						{ height: 40 },
						{ height: 80 },
						{ height: 100 },
						{ height: 50 },
						{ height: 80 }
					],
					visual: {
						show: true,
						style: {
							backgroundColor: '#e8f4fc'
						}
					},
					silent: {
						style: {
							backgroundColor: '#bcf0fc'
						}
					}
				},
				cell: {
					style: {
						fontSize: 16,
						minWidth: 50,
						color: '#000000',
						textAlign: 'center',
						border: '',
						width: [60, '50%', '25%', '10%']
					}
				}
			},
			speed: 40,
			isScroll: true
		}
	}
	const option6 = {
		className: 'demo6',
		data: _.range(7).map((i) => {
			return [
				{
					type: 'link',
					uid: '',
					text: `test title ${i + 1}`,
					event: 'onClick',
					className: 'link',
					data: {
						datetime: '2019-01-17 17:58',
						author: 'Oceanxy'
					},
					callback: (data) => {
						alert(` author: ${data.author},\n datetime: ${data.datetime}`)
					}
				},
				{
					type: 'button',
					uid: '',
					value: `test button ${i + 1}`,
					className: 'btn',
					data: {
						message: `you clicked button ${i + 1} !`
					},
					callback: (data) => {
						alert(`${data.message}`)
					}
				}
			]
		}),
		property: {
			style: {
				padding: 10,
				border: 'none',
				background: '#060719',
				width: 450,
				height: 410,
				margin: 0
			},
			border: {
				borderWidth: 0
			},
			header: {
				show: false
			},
			body: {
				row: {
					style: {
						height: 40,
						background: `url(${rowBg}) no-repeat center / 100% 100%`
					},
					spacing: 10
				},
				cell: {
					style: {
						textDecoration: 'none',
						color: '#ffffff',
						width: ',28%'
					}
				},
				cellOfColumn: {
					style: [{ textIndent: '2em', textAlign: 'left' }, { textAlign: 'center' }]
				}
			}
		}
	}
	const option7 = {
		className: 'demo7',
		data: (() => {
			const arr = _.range(7).map((i) => {
				return ['企业名称' + i, '积分' + i, '车牌' + i]
			})

			arr.unshift(['企业名称', '积分', '车牌'])

			return arr
		})(),
		property: {
			style: {
				padding: 10,
				border: 'none',
				background: '#060719',
				width: 558,
				height: 350,
				margin: 0
			},
			border: {
				borderWidth: 0
			},
			header: {
				show: true,
				style: {
					height: 50,
					background: `url(${demo7_header_bg}) no-repeat center / 100% 100%`
				},
				cellStyle: {
					color: '#ffffff'
				}
			},
			body: {
				row: {
					style: {
						height: 44,
						background: `url(${demo7_row_bg}) no-repeat center / 100% 100%`
					},
					spacing: 10
				},
				cell: {
					style: {
						color: '#ffffff',
						width: '35%,35%',
						textAlign: 'center'
					}
				}
			}
		}
	}
	const option8 = {
		className: 'demo8',
		data: (() => {
			const arr = _.range(7).map((i) => {
				return [Math.random() * 1000, '种类' + i, '车牌' + i, '归属地' + i, '行驶地' + i, '预警时间' + i]
			})

			arr.unshift(['序号', '种类', '车牌号', '归属地', '行驶地', '预警时间'])

			return arr
		})(),
		property: {
			style: {
				padding: 10,
				border: 'none',
				background: '#060719',
				width: 1180,
				height: 350,
				margin: 0
			},
			border: {
				borderWidth: 0
			},
			header: {
				show: true,
				style: {
					height: 50,
					background: `url(${demo8_header_bg}) no-repeat center / 100% 100%`
				},
				cellStyle: {
					color: '#ffffff'
				}
			},
			body: {
				row: {
					style: {
						height: 44,
						background: `url(${demo8_row_bg}) no-repeat center / 100% 100%`
					},
					spacing: 10
				},
				cell: {
					style: {
						color: '#ffffff',
						width: '16.6%, 16.6%, 16.6%, 16.6%, 16.6%',
						textAlign: 'center'
					}
				}
			}
		}
	}
	const option9 = {
		className: 'demo9',
		data: [
			[
				'1st column',
				'2nd column',
				'3rd column',
				{
					type: 'select',
					text: '4rd column',
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
						// step 1: Get the value of select
						const value = event.target.value
						// step 2: According to the value of select to match the value of the corresponding row in the data,
						// 				 and then get the index of the row
						const data = objectUnit.instanceObject.props.data
						for(let i = 0, k = data; i < k.length; i++) {
							if(_.isPlainObject(data[i]) && parseInt(data[i].value) === parseInt(value)) {
								// step 3: Call method scrolling list
								objectUnit.instanceObject.scrollTo(i - 1)
								break
							}
						}
					}
				}
			],
			[
				<span>I am span</span>,
				<div onClick={() => alert('test JSX event')}>test JSX event</div>,
				<a href='http://www.xieyangogo.cn/react-tabllist/'>I am link</a>,
				<div>I am div</div>
			],
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
			},
			[
				'row 2; column 1', 'row 2; column 2',
				{
					type: 'link',
					text: 'I am a link',
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
			],
			['row 3; column 1', 'row 3; column 2', 'row 3; column 3', 'row 3; column 4'],
			{
				type: 'row',
				data: 1,
				value: 1,
				event: 'onClick',
				callback: (restData, objectUnit, event) => {
					alert('test event of row')
					console.log(restData, objectUnit, event)
				},
				className: 'click-row',
				cells: [
					{
						type: 'link',
						text: 'I am a link',
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
					}, 'row 4; column 3', 'row 4; column 4'
				]
			},
			[
				[
					{
						type: 'radio',
						name: 'group1',
						text: 'radio group 1-1',
						className: 'test-radio'
					},
					{
						type: 'radio',
						name: 'group1',
						text: 'radio group 2-1',
						className: 'test-radio'
					}
				],
				'row 5; column 2',
				'row 5; column 3',
				'row 5; column 4'
			],
			{
				type: 'row',
				data: 1,
				value: 2,
				event: 'onClick',
				callback: (restData, objectUnit, event) => {
					alert('test event of row')
					console.log(restData, objectUnit, event)
				},
				className: 'click-row',
				cells: [
					[
						{
							type: 'radio',
							name: 'group2',
							text: 'radio group 2-1',
							className: 'test-radio'
						},
						{
							type: 'radio',
							name: 'group2',
							text: 'radio group 2-2',
							className: 'test-radio'
						}
					],
					'row 6; column 2',
					'row 6; column 3',
					'row 6; column 4'
				]
			},
			[
				[
					{
						type: 'checkbox',
						name: 'chkxxx',
						text: 'chk1'
					},
					{
						type: 'checkbox',
						name: 'chkxxx',
						text: 'chk2'
					},
					{
						type: 'checkbox',
						name: 'chkxxx',
						text: 'chk3'
					}
				],
				{
					type: 'link',
					text: 'I am a link',
					event: 'onClick',
					className: 'test-link',
					callback: () => {
						alert('clicked link')
					}
				},
				{
					type: 'button',
					value: 'click me',
					className: 'test-btn',
					callback: (data, cellObject, cellElement) => {
						if(!data) {
							data = 'data of button is undefined'
						}

						cellElement.target.value = 'you clicked me!!'
						cellElement.target.style.width = '150px'

						console.log(data)
						console.log(cellObject)
						console.log(cellElement)

						alert('hello react-tabllist, Please check the console')
					}
				}
			],
			['row 8; column 1', 'row 8; column 2', 'row 8; column 3', 'row 8; column 4'],
			['row 9; column 1', 'row 9; column 2', 'row 9; column 3', 'row 9; column 4']
		],
		property: {
			// The style of the outermost container
			style: {
				width: '100%',
				margin: '0 auto',
				height: 550,
				border: '1px solid #999999'
			},
			border: {
				borderWidth: 1,
				borderStyle: 'solid',
				borderColor: '#ededed'
			},
			header: {
				show: true,
				style: {
					backgroundColor: '#1693ff',
					height: 40,
					borderBottom: '1px solid #999999'
				},
				cellStyle: {
					color: '#ffffff',
					fontWeight: 'bolder',
					fontSize: 20
				}
			},
			body: {
				row: {
					rowCheckBox: true,
					onClick: () => {}, // 仅在1.2.0版本生效，此处用于测试控制台打印警告信息
					style: {
						height: 34
					},
					serialNumber: {
						show: true,
						formatter: 'No.{index}',
						style: {
							backgroundColor: 'red',
							width: 80,
							fontSize: 20,
							color: '#2cff41'
						},
						specialStyle: [
							{
								backgroundColor: 'blue'
							},
							{
								backgroundColor: 'black'
							},
							{
								backgroundColor: 'yellow'
							}
						]
					},
					specialStyle: [
						{ height: 60 },
						{ height: 40 },
						{ height: 80 },
						{ height: 100 },
						{ height: 50 },
						{ height: 80 }
					],
					visual: {
						show: true,
						style: {
							backgroundColor: '#e8f4fc'
						}
					},
					silent: {
						style: {
							backgroundColor: '#bcf0fc'
						}
					}
				},
				cell: {
					style: {
						fontSize: 16,
						minWidth: 50,
						color: '#000000',
						textAlign: 'center',
						border: '',
						width: [60, 60, '30%', '25%', '10%']
					}
				}
			},
			scroll: {
				enable: true
			}
		}
	}

	return (
		<div className='container'>
			<h1>demo1：default</h1>
			<Tabllist />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  data: [],\n' +
						'  property: {}\n' +
						'}'
					}
				</code>
			</pre>

			<h1>demo2：Basic use</h1>
			<Tabllist property={option2.property} data={option2.data} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  data: [\n' +
						'    [\'1st column title\', \'2nd column title\', \'3rd column title\'],\n' +
						'    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\'],\n' +
						'    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\'],\n' +
						'    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\'],\n' +
						'    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\'],\n' +
						'    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\'],\n' +
						'    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\'],\n' +
						'    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\'],\n' +
						'    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\'],\n' +
						'    [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\']\n' +
						'  ],\n' +
						'  property: {\n' +
						'    // The style of the outermost container\n' +
						'    style: {\n' +
						'      width: \'100%\',\n' +
						'      margin: \'0 auto\',\n' +
						'      height: 200,\n' +
						'      border: \'1px solid #999999\'\n' +
						'    },\n' +
						'    isScroll: false,\n' +
						'    border: {\n' +
						'      borderWidth: 0\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'        borderBottom: \'1px solid #999999\'\n' +
						'      },\n' +
						'      cellStyle: {\n' +
						'        fontWeight: \'bolder\',\n' +
						'        fontSize: 20,\n' +
						'        color: \'#333333\'\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h1>demo3：Cell border and row background color</h1>
			<Tabllist property={option3.property} data={option3.data} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  data: [\n' +
						'    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\'],\n' +
						'    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\'],\n' +
						'    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\'],\n' +
						'    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\'],\n' +
						'    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\'],\n' +
						'    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\'],\n' +
						'    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\'],\n' +
						'    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\']\n' +
						'  ],\n' +
						'  property: {\n' +
						'    // The style of the outermost container\n' +
						'    style: {\n' +
						'      width: \'100%\',\n' +
						'      margin: \'0 auto\',\n' +
						'      height: 300,\n' +
						'      border: \'1px solid #999999\'\n' +
						'    },\n' +
						'    speed: 50,\n' +
						'    isScroll: true,\n' +
						'    border: {\n' +
						'      borderWidth: 1,\n' +
						'      borderStyle: \'solid\',\n' +
						'      borderColor: \'#999999\'\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: false\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        visual: {\n' +
						'          show: true,\n' +
						'          interval: 1,\n' +
						'          style: {\n' +
						'            backgroundColor: \'#E8F4FC\'\n' +
						'          }\n' +
						'        },\n' +
						'        silent: {\n' +
						'          show: false,\n' +
						'          style: {\n' +
						'            backgroundColor: \'#bcf0fc\'\n' +
						'          }\n' +
						'        }\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h1>demo4：Serial number and scrollable list</h1>
			<Tabllist property={option4.property} data={option4.data} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  data: [\n' +
						'    [\'1st column\', \'2nd column\', \'3rd column\', \'4rd column\'],\n' +
						'    [\'row 1; column 1\', \'row 1; column 2\', \'row 1; column 3\', \'row 1; column 4\'],\n' +
						'    [\'row 2; column 1\', \'row 2; column 2\', \'row 2; column 3\', \'row 2; column 4\'],\n' +
						'    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
						'    [\'row 4; column 1\', \'row 4; column 2\', \'row 4; column 3\', \'row 4; column 4\'],\n' +
						'    [\'row 5; column 1\', \'row 5; column 2\', \'row 5; column 3\', \'row 5; column 4\'],\n' +
						'    [\'row 6; column 1\', \'row 6; column 2\', \'row 6; column 3\', \'row 6; column 4\'],\n' +
						'    [\'row 7; column 1\', \'row 7; column 2\', \'row 7; column 3\', \'row 7; column 4\'],\n' +
						'    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
						'    [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
						'  ],\n' +
						'  property: {\n' +
						'    // The style of the outermost container\n' +
						'    style: {\n' +
						'      width: \'100%\',\n' +
						'      margin: \'0 auto\',\n' +
						'      height: 300,\n' +
						'      border: \'1px solid #999999\'\n' +
						'    },\n' +
						'    speed: 40,\n' +
						'    isScroll: true,\n' +
						'    border: {\n' +
						'      borderWidth: 1,\n' +
						'      borderStyle: \'solid\',\n' +
						'      borderColor: \'#ededed\'\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'        backgroundColor: \'#1693ff\',\n' +
						'        height: 40,\n' +
						'        borderBottom: \'1px solid #999999\'\n' +
						'      },\n' +
						'      cellStyle: {\n' +
						'        color: \'#ffffff\',\n' +
						'        fontWeight: \'bolder\',\n' +
						'        fontSize: 20\n' +
						'      }\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        serialNumber: {\n' +
						'          show: true,\n' +
						'          formatter: \'No.{index}\',\n' +
						'          style: {\n' +
						'            backgroundColor: \'#1693ff\',\n' +
						'            color: \'#ffffff\',\n' +
						'            width: 80\n' +
						'          }\n' +
						'        },\n' +
						'        style: {\n' +
						'          height: 34\n' +
						'        },\n' +
						'        visual: {\n' +
						'          show: true,\n' +
						'          style: {\n' +
						'            backgroundColor: \'#E8F4FC\'\n' +
						'          }\n' +
						'        },\n' +
						'        silent: {\n' +
						'          style: {\n' +
						'            backgroundColor: \'#bcf0fc\'\n' +
						'          }\n' +
						'        }\n' +
						'      },\n' +
						'      cell: {\n' +
						'        style: {\n' +
						'          fontSize: 16,\n' +
						'          minWidth: 50,\n' +
						'          color: \'#000000\',\n' +
						'          textAlign: \'center\',\n' +
						'          border: \'\',\n' +
						'          width: \'auto\'\n' +
						'        }\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h1>demo5：Object cell: Add another tag to the cell</h1>
			<Tabllist property={option5.property} data={option5.data} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  data: [\n' +
						'    [\'1st column\', \'2nd column\', \'3rd column\', \'4rd column\'],\n' +
						'    [\n' +
						'      \'row 1; column 1\',\n' +
						'      \'row 1; column 2\',\n' +
						'      {\n' +
						'        type: \'link\',\n' +
						'        text: \'I am a link\',\n' +
						'        event: \'onClick\',\n' +
						'        href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'        className: \'test-link\'\n' +
						'      },\n' +
						'      {\n' +
						'        type: \'button\',\n' +
						'        uid: \'\',\n' +
						'        value: \'click me\',\n' +
						'        className: \'test-btn\',\n' +
						'        callback: () => {\n' +
						'          alert(\'hello react-tabllist\')\n' +
						'        }\n' +
						'      }\n' +
						'    ],\n' +
						'    [\n' +
						'      \'row 2; column 1\', \'row 2; column 2\',\n' +
						'      {\n' +
						'        type: \'link\',\n' +
						'        text: \'I am a link\',\n' +
						'        event: \'onClick\',\n' +
						'        href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'        className: \'test-link\'\n' +
						'      },\n' +
						'      {\n' +
						'        type: \'button\',\n' +
						'        uid: \'\',\n' +
						'        value: \'click me\',\n' +
						'        className: \'test-btn\',\n' +
						'        callback: () => {\n' +
						'          alert(\'hello react-tabllist\')\n' +
						'        }\n' +
						'      }\n' +
						'    ],\n' +
						'    [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
						'    [\n' +
						'      {\n' +
						'        type: \'link\',\n' +
						'        text: \'I am a link\',\n' +
						'        event: \'onClick\',\n' +
						'        href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'        className: \'test-link\'\n' +
						'      },\n' +
						'      {\n' +
						'        type: \'button\',\n' +
						'        uid: \'\',\n' +
						'        value: \'click me\',\n' +
						'        className: \'test-btn\',\n' +
						'        callback: () => {\n' +
						'          alert(\'hello react-tabllist\')\n' +
						'        }\n' +
						'      }, \'row 4; column 3\', \'row 4; column 4\'\n' +
						'    ],\n' +
						'    [\n' +
						'      [\n' +
						'        {\n' +
						'          type: \'radio\',\n' +
						'          uid: \'\',\n' +
						'          name: \'group1\',\n' +
						'          text: \'radio group 1-1\',\n' +
						'          className: \'test-radio\'\n' +
						'        },\n' +
						'        {\n' +
						'          type: \'radio\',\n' +
						'          uid: \'\',\n' +
						'          name: \'group1\',\n' +
						'          text: \'radio group 2-1\',\n' +
						'          className: \'test-radio\'\n' +
						'        }\n' +
						'      ],\n' +
						'      \'row 5; column 2\',\n' +
						'      \'row 5; column 3\',\n' +
						'      \'row 5; column 4\'\n' +
						'    ],\n' +
						'    [\n' +
						'      [\n' +
						'        {\n' +
						'          type: \'radio\',\n' +
						'          uid: \'\',\n' +
						'          name: \'group2\',\n' +
						'          text: \'radio group 2-1\',\n' +
						'          className: \'test-radio\'\n' +
						'        },\n' +
						'        {\n' +
						'          type: \'radio\',\n' +
						'          uid: \'\',\n' +
						'          name: \'group2\',\n' +
						'          text: \'radio group 2-2\',\n' +
						'          className: \'test-radio\'\n' +
						'        }\n' +
						'      ],\n' +
						'      \'row 6; column 2\',\n' +
						'      \'row 6; column 3\',\n' +
						'      \'row 6; column 4\'\n' +
						'    ],\n' +
						'    [\n' +
						'      \'row 7; column 1\', \'row 7; column 2\',\n' +
						'      {\n' +
						'        type: \'link\',\n' +
						'        text: \'I am a link\',\n' +
						'        event: \'onClick\',\n' +
						'        href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'        className: \'test-link\'\n' +
						'      },\n' +
						'      {\n' +
						'        type: \'button\',\n' +
						'        uid: \'\',\n' +
						'        value: \'click me\',\n' +
						'        className: \'test-btn\',\n' +
						'        callback: (data, cellObject, cellElement) => {\n' +
						'          if(!data) {\n' +
						'            data = \'data of button is undefined\'\n' +
						'          }\n' +
						'\n' +
						'          cellElement.target.value = \'you clicked me!!\'\n' +
						'          cellElement.target.style.width = \'150px\'\n' +
						'\n' +
						'          console.log(data)\n' +
						'          console.log(cellObject)\n' +
						'          console.log(cellElement)\n' +
						'\n' +
						'          alert(\'hello react-tabllist, Please check the console\')\n' +
						'        }\n' +
						'      }\n' +
						'    ],\n' +
						'    [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
						'    [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
						'  ],\n' +
						'  property: {\n' +
						'    // The style of the outermost container\n' +
						'    style: {\n' +
						'      width: \'100%\',\n' +
						'      margin: \'0 auto\',\n' +
						'      height: 300,\n' +
						'      border: \'1px solid #999999\'\n' +
						'    },\n' +
						'    speed: 40,\n' +
						'    isScroll: true,\n' +
						'    border: {\n' +
						'      borderWidth: 1,\n' +
						'      borderStyle: \'solid\',\n' +
						'      borderColor: \'#ededed\'\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'        backgroundColor: \'#1693ff\',\n' +
						'        height: 40,\n' +
						'        borderBottom: \'1px solid #999999\'\n' +
						'      },\n' +
						'      cellStyle: {\n' +
						'        color: \'#ffffff\',\n' +
						'        fontWeight: \'bolder\',\n' +
						'        fontSize: 20\n' +
						'      }\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        rowCheckbox: true,\n' +
						'        style: {\n' +
						'          height: 34\n' +
						'        },\n' +
						'        specialStyle: [\n' +
						'          { height: 60 },\n' +
						'          { height: 40 },\n' +
						'          { height: 80 },\n' +
						'          { height: 100 },\n' +
						'          { height: 50 },\n' +
						'          { height: 80 }\n' +
						'        ],\n' +
						'        visual: {\n' +
						'          show: true,\n' +
						'          style: {\n' +
						'            backgroundColor: \'#E8F4FC\'\n' +
						'          }\n' +
						'        },\n' +
						'        silent: {\n' +
						'          style: {\n' +
						'            backgroundColor: \'#bcf0fc\'\n' +
						'          }\n' +
						'        }\n' +
						'      },\n' +
						'      cell: {\n' +
						'        style: {\n' +
						'          fontSize: 16,\n' +
						'          minWidth: 50,\n' +
						'          color: \'#000000\',\n' +
						'          textAlign: \'center\',\n' +
						'          border: \'\',\n' +
						'          width: [60, \'50%\', \'25%\', \'10%\']\n' +
						'        }\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h1>demo6：object unit for select and scroll to the specified row</h1>
			<Tabllist {...option9} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  className: \'demo9\',\n' +
						'  data: [\n' +
						'   [\n' +
						'    \'1st column\',\n' +
						'    \'2nd column\',\n' +
						'    \'3rd column\',\n' +
						'    {\n' +
						'     type: \'select\',\n' +
						'     text: \'4rd column\',\n' +
						'     data: 123,\n' +
						'     className: \'\',\n' +
						'     option: [\n' +
						'      {\n' +
						'       id: \'1\',\n' +
						'       label: \'Scroll to the 2nd row\',\n' +
						'       value: 0\n' +
						'      },\n' +
						'      {\n' +
						'       id: \'2\',\n' +
						'       label: \'Scroll to the 5rd row\',\n' +
						'       value: 1\n' +
						'      },\n' +
						'      {\n' +
						'       id: \'3\',\n' +
						'       label: \'Scroll to the 7rd row\',\n' +
						'       value: 2\n' +
						'      }\n' +
						'     ],\n' +
						'     event: \'onChange\',\n' +
						'     callback: (restData, objectUnit, event) => {\n' +
						'      // step 1: Get the value of select\n' +
						'      const value = event.target.value\n' +
						'      // step 2: According to the value of select to match the value of the corresponding row in the data,\n' +
						'      //      and then get the index of the row\n' +
						'      const data = objectUnit.instanceObject.props.data\n' +
						'      for(let i = 0, k = data; i < k.length; i++) {\n' +
						'       if(_.isPlainObject(data[i]) && parseInt(data[i].value) === parseInt(value)) {\n' +
						'        // step 3: Call method scrolling list\n' +
						'        objectUnit.instanceObject.scrollTo(i - 1)\n' +
						'        break\n' +
						'       }\n' +
						'      }\n' +
						'     }\n' +
						'    }\n' +
						'   ],\n' +
						'   [\n' +
						'    <span>I am span</span>,\n' +
						'    <div onClick={() => alert(\'test JSX event\')}>test JSX event</div>,\n' +
						'    <a href=\'http://www.xieyangogo.cn/react-tabllist/\'>I am link</a>,\n' +
						'    <div>I am div</div>\n' +
						'   ],\n' +
						'   {\n' +
						'    type: \'row\',\n' +
						'    data: 1,\n' +
						'    value: 0,\n' +
						'    event: \'onClick\',\n' +
						'    callback: (restData, objectUnit, event) => {\n' +
						'     alert(\'test event of row\')\n' +
						'     console.log(restData, objectUnit, event)\n' +
						'    },\n' +
						'    className: \'click-row\',\n' +
						'    cells: [\n' +
						'     \'row 1; column 1\',\n' +
						'     {\n' +
						'      type: \'link\',\n' +
						'      text: \'I am a first link\',\n' +
						'      className: \'test-link\',\n' +
						'      callback: () => {console.log(\'I am a first link\')}\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'link\',\n' +
						'      text: \'I am a second link\',\n' +
						'      href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'      className: \'test-link\'\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'button\',\n' +
						'      value: \'click me\',\n' +
						'      className: \'test-btn\',\n' +
						'      callback: () => {\n' +
						'       alert(\'hello react-tabllist\')\n' +
						'      }\n' +
						'     }\n' +
						'    ]\n' +
						'   },\n' +
						'   [\n' +
						'    \'row 2; column 1\', \'row 2; column 2\',\n' +
						'    {\n' +
						'     type: \'link\',\n' +
						'     text: \'I am a link\',\n' +
						'     href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'     className: \'test-link\'\n' +
						'    },\n' +
						'    {\n' +
						'     type: \'button\',\n' +
						'     value: \'click me\',\n' +
						'     className: \'test-btn\',\n' +
						'     callback: () => {\n' +
						'      alert(\'hello react-tabllist\')\n' +
						'     }\n' +
						'    }\n' +
						'   ],\n' +
						'   [\'row 3; column 1\', \'row 3; column 2\', \'row 3; column 3\', \'row 3; column 4\'],\n' +
						'   {\n' +
						'    type: \'row\',\n' +
						'    data: 1,\n' +
						'    value: 1,\n' +
						'    event: \'onClick\',\n' +
						'    callback: (restData, objectUnit, event) => {\n' +
						'     alert(\'test event of row\')\n' +
						'     console.log(restData, objectUnit, event)\n' +
						'    },\n' +
						'    className: \'click-row\',\n' +
						'    cells: [\n' +
						'     {\n' +
						'      type: \'link\',\n' +
						'      text: \'I am a link\',\n' +
						'      href: \'https://github.com/oceanxy/react-tabllist\',\n' +
						'      className: \'test-link\'\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'button\',\n' +
						'      value: \'click me\',\n' +
						'      className: \'test-btn\',\n' +
						'      callback: () => {\n' +
						'       alert(\'hello react-tabllist\')\n' +
						'      }\n' +
						'     }, \'row 4; column 3\', \'row 4; column 4\'\n' +
						'    ]\n' +
						'   },\n' +
						'   [\n' +
						'    [\n' +
						'     {\n' +
						'      type: \'radio\',\n' +
						'      name: \'group1\',\n' +
						'      text: \'radio group 1-1\',\n' +
						'      className: \'test-radio\'\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'radio\',\n' +
						'      name: \'group1\',\n' +
						'      text: \'radio group 2-1\',\n' +
						'      className: \'test-radio\'\n' +
						'     }\n' +
						'    ],\n' +
						'    \'row 5; column 2\',\n' +
						'    \'row 5; column 3\',\n' +
						'    \'row 5; column 4\'\n' +
						'   ],\n' +
						'   {\n' +
						'    type: \'row\',\n' +
						'    data: 1,\n' +
						'    value: 2,\n' +
						'    event: \'onClick\',\n' +
						'    callback: (restData, objectUnit, event) => {\n' +
						'     alert(\'test event of row\')\n' +
						'     console.log(restData, objectUnit, event)\n' +
						'    },\n' +
						'    className: \'click-row\',\n' +
						'    cells: [\n' +
						'     [\n' +
						'      {\n' +
						'       type: \'radio\',\n' +
						'       name: \'group2\',\n' +
						'       text: \'radio group 2-1\',\n' +
						'       className: \'test-radio\'\n' +
						'      },\n' +
						'      {\n' +
						'       type: \'radio\',\n' +
						'       name: \'group2\',\n' +
						'       text: \'radio group 2-2\',\n' +
						'       className: \'test-radio\'\n' +
						'      }\n' +
						'     ],\n' +
						'     \'row 6; column 2\',\n' +
						'     \'row 6; column 3\',\n' +
						'     \'row 6; column 4\'\n' +
						'    ]\n' +
						'   },\n' +
						'   [\n' +
						'    [\n' +
						'     {\n' +
						'      type: \'checkbox\',\n' +
						'      name: \'chkxxx\',\n' +
						'      text: \'chk1\'\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'checkbox\',\n' +
						'      name: \'chkxxx\',\n' +
						'      text: \'chk2\'\n' +
						'     },\n' +
						'     {\n' +
						'      type: \'checkbox\',\n' +
						'      name: \'chkxxx\',\n' +
						'      text: \'chk3\'\n' +
						'     }\n' +
						'    ],\n' +
						'    {\n' +
						'     type: \'link\',\n' +
						'     text: \'I am a link\',\n' +
						'     event: \'onClick\',\n' +
						'     className: \'test-link\',\n' +
						'     callback: () => {\n' +
						'      alert(\'clicked link\')\n' +
						'     }\n' +
						'    },\n' +
						'    {\n' +
						'     type: \'button\',\n' +
						'     value: \'click me\',\n' +
						'     className: \'test-btn\',\n' +
						'     callback: (data, cellObject, cellElement) => {\n' +
						'      if(!data) {\n' +
						'       data = \'data of button is undefined\'\n' +
						'      }\n' +
						'\n' +
						'      cellElement.target.value = \'you clicked me!!\'\n' +
						'      cellElement.target.style.width = \'150px\'\n' +
						'\n' +
						'      console.log(data)\n' +
						'      console.log(cellObject)\n' +
						'      console.log(cellElement)\n' +
						'\n' +
						'      alert(\'hello react-tabllist, Please check the console\')\n' +
						'     }\n' +
						'    }\n' +
						'   ],\n' +
						'   [\'row 8; column 1\', \'row 8; column 2\', \'row 8; column 3\', \'row 8; column 4\'],\n' +
						'   [\'row 9; column 1\', \'row 9; column 2\', \'row 9; column 3\', \'row 9; column 4\']\n' +
						'  ],\n' +
						'  property: {\n' +
						'   // The style of the outermost container\n' +
						'   style: {\n' +
						'    width: \'100%\',\n' +
						'    margin: \'0 auto\',\n' +
						'    height: 550,\n' +
						'    border: \'1px solid #999999\'\n' +
						'   },\n' +
						'   border: {\n' +
						'    borderWidth: 1,\n' +
						'    borderStyle: \'solid\',\n' +
						'    borderColor: \'#ededed\'\n' +
						'   },\n' +
						'   header: {\n' +
						'    show: true,\n' +
						'    style: {\n' +
						'     backgroundColor: \'#1693ff\',\n' +
						'     height: 40,\n' +
						'     borderBottom: \'1px solid #999999\'\n' +
						'    },\n' +
						'    cellStyle: {\n' +
						'     color: \'#ffffff\',\n' +
						'     fontWeight: \'bolder\',\n' +
						'     fontSize: 20\n' +
						'    }\n' +
						'   },\n' +
						'   body: {\n' +
						'    row: {\n' +
						'     rowCheckBox: true,\n' +
						'     onClick: () => {},\n' +
						'     style: {\n' +
						'      height: 34\n' +
						'     },\n' +
						'     serialNumber: {\n' +
						'      show: true,\n' +
						'      formatter: \'No.{index}\',\n' +
						'      style: {\n' +
						'       backgroundColor: \'#3991ff\',\n' +
						'       width: 80,\n' +
						'       fontSize: 20,\n' +
						'       color: \'#2cff41\'\n' +
						'      },\n' +
						'      specialStyle: [\n' +
						'       {\n' +
						'        backgroundColor: \'#203d7b\'\n' +
						'       },\n' +
						'       {\n' +
						'        backgroundColor: \'#2f4c99\'\n' +
						'       },\n' +
						'       {\n' +
						'        backgroundColor: \'#3960c0\'\n' +
						'       }\n' +
						'      ]\n' +
						'     },\n' +
						'     specialStyle: [\n' +
						'      { height: 60 },\n' +
						'      { height: 40 },\n' +
						'      { height: 80 },\n' +
						'      { height: 100 },\n' +
						'      { height: 50 },\n' +
						'      { height: 80 }\n' +
						'     ],\n' +
						'     visual: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'       backgroundColor: \'#e8f4fc\'\n' +
						'      }\n' +
						'     },\n' +
						'     silent: {\n' +
						'      style: {\n' +
						'       backgroundColor: \'#bcf0fc\'\n' +
						'      }\n' +
						'     }\n' +
						'    },\n' +
						'    cell: {\n' +
						'     style: {\n' +
						'      fontSize: 16,\n' +
						'      minWidth: 50,\n' +
						'      color: \'#000000\',\n' +
						'      textAlign: \'center\',\n' +
						'      border: \'\',\n' +
						'      width: [60, 60, \'30%\', \'25%\', \'10%\']\n' +
						'     }\n' +
						'    }\n' +
						'   },\n' +
						'   scroll: {\n' +
						'    enable: true\n' +
						'   }\n' +
						'  }\n' +
						' }'
					}
				</code>
			</pre>

			<h1 style={{ color: 'blue', textAlign: 'center', margin: '4em 0 2em' }}>Use in actual projects</h1>
			<h2>Case 1</h2>
			<Tabllist {...option6} />
			<pre>
				<code className='javascript'>
					{
						'const option = {\n' +
						'  className: \'demo6\',\n' +
						'  data: _.range(7).map((i) => {\n' +
						'    return [\n' +
						'      {\n' +
						'        type: \'link\',\n' +
						'        uid: \'\',\n' +
						'        text: `test title ${i + 1}`,\n' +
						'        event: \'onClick\',\n' +
						'        className: \'link\',\n' +
						'        data: {\n' +
						'          datetime: \'2019-01-17 17:58\',\n' +
						'          author: \'Oceanxy\'\n' +
						'        },\n' +
						'        callback: (data) => {\n' +
						'          alert(` author: ${data.author},\\n datetime: ${data.datetime}`)\n' +
						'        }\n' +
						'      },\n' +
						'      {\n' +
						'        type: \'button\',\n' +
						'        uid: \'\',\n' +
						'        value: `test button ${i + 1}`,\n' +
						'        className: \'btn\',\n' +
						'        data: {\n' +
						'          message: `you clicked button ${i + 1} !`\n' +
						'        },\n' +
						'        callback: (data) => {\n' +
						'          alert(`${data.message}`)\n' +
						'        }\n' +
						'      }\n' +
						'    ]\n' +
						'  }),\n' +
						'  property: {\n' +
						'    style: {\n' +
						'      padding: 10,\n' +
						'      border: \'none\',\n' +
						'      background: \'#060719\',\n' +
						'      width: 450,\n' +
						'      height: 410,\n' +
						'      margin: 0\n' +
						'    },\n' +
						'    border: {\n' +
						'      borderWidth: 0\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: false\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        style: {\n' +
						'          height: 40,\n' +
						'          background: `url(${rowBg}) no-repeat center / 100% 100%`\n' +
						'        },\n' +
						'        spacing: 10\n' +
						'      },\n' +
						'      cell: {\n' +
						'        style: {\n' +
						'          textDecoration: \'none\',\n' +
						'          color: \'#ffffff\',\n' +
						'          width: \',28%\'\n' +
						'        }\n' +
						'      },\n' +
						'      cellOfColumn: {\n' +
						'        style: [{ textIndent: \'2em\', textAlign: \'left\' }, { textAlign: \'center\' }]\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h2>Case 2</h2>
			<Tabllist {...option7} />
			<pre>
				<code className='javascript'>
					{
						'const option7 = {\n' +
						'  className: \'demo7\',\n' +
						'  data: (() => {\n' +
						'    const arr = _.range(7).map((i) => {\n' +
						'      return [\'企业名称\' + i, \'积分\' + i, \'车牌\' + i]\n' +
						'    })\n' +
						'\n' +
						'    arr.unshift([\'企业名称\', \'积分\', \'车牌\'])\n' +
						'\n' +
						'    return arr\n' +
						'  })(),\n' +
						'  property: {\n' +
						'    style: {\n' +
						'      padding: 10,\n' +
						'      border: \'none\',\n' +
						'      background: \'#060719\',\n' +
						'      width: 558,\n' +
						'      height: 350,\n' +
						'      margin: 0\n' +
						'    },\n' +
						'    border: {\n' +
						'      borderWidth: 0\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'        height: 50,\n' +
						'        background: `url(${demo7_header_bg}) no-repeat center / 100% 100%`\n' +
						'      },\n' +
						'      cellStyle: {\n' +
						'        color: \'#ffffff\'\n' +
						'      }\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        style: {\n' +
						'          height: 44,\n' +
						'          background: `url(${demo7_row_bg}) no-repeat center / 100% 100%`\n' +
						'        },\n' +
						'        spacing: 10\n' +
						'      },\n' +
						'      cell: {\n' +
						'        style: {\n' +
						'          color: \'#ffffff\',\n' +
						'          width: \'35%,35%\',\n' +
						'          textAlign: \'center\'\n' +
						'        }\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>

			<h2>Case 3</h2>
			<Tabllist {...option8} />
			<pre>
				<code className='javascript'>
					{
						'const option8 = {\n' +
						'  className: \'demo8\',\n' +
						'  data: (() => {\n' +
						'    const arr = _.range(7).map((i) => {\n' +
						'      return [Math.random() * 1000, \'种类\' + i, \'车牌\' + i, \'归属地\' + i, \'行驶地\' + i, \'预警时间\' + i]\n' +
						'    })\n' +
						'\n' +
						'    arr.unshift([\'序号\', \'种类\', \'车牌号\', \'归属地\', \'行驶地\', \'预警时间\'])\n' +
						'\n' +
						'    return arr\n' +
						'  })(),\n' +
						'  property: {\n' +
						'    style: {\n' +
						'      padding: 10,\n' +
						'      border: \'none\',\n' +
						'      background: \'#060719\',\n' +
						'      width: 1180,\n' +
						'      height: 350,\n' +
						'      margin: 0\n' +
						'    },\n' +
						'    border: {\n' +
						'      borderWidth: 0\n' +
						'    },\n' +
						'    header: {\n' +
						'      show: true,\n' +
						'      style: {\n' +
						'        height: 50,\n' +
						'        background: `url(${demo8_header_bg}) no-repeat center / 100% 100%`\n' +
						'      },\n' +
						'      cellStyle: {\n' +
						'        color: \'#ffffff\'\n' +
						'      }\n' +
						'    },\n' +
						'    body: {\n' +
						'      row: {\n' +
						'        style: {\n' +
						'          height: 44,\n' +
						'          background: `url(${demo8_row_bg}) no-repeat center / 100% 100%`\n' +
						'        },\n' +
						'        spacing: 10\n' +
						'      },\n' +
						'      cell: {\n' +
						'        style: {\n' +
						'          color: \'#ffffff\',\n' +
						'          width: \'16.6%, 16.6%, 16.6%, 16.6%, 16.6%\',\n' +
						'          textAlign: \'center\'\n' +
						'        }\n' +
						'      }\n' +
						'    }\n' +
						'  }\n' +
						'}'
					}
				</code>
			</pre>
		</div>
	)
}

ReactDOM.render(
	<Demo />,
	document.getElementById('root')
)
