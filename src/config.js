export default {
	className: '',
	data: [
		['1st column', '2nd column', '3rd column'],
		['1st cell', '2nd cell', '3rd cell']
	],
	property: {
		border: {
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: '#f4f4f4'
		},
		style: {
			width: '100%',
			margin: '0 auto',
			height: 300
		},
		scroll: {
			enable: true,
			speed: 50,
			distance: 1
		},
		header: {
			show: true,
			style: {
				height: 30
			},
			cellStyle: {
				color: '#000000',
				border: ''
			}
		},
		body: {
			style: {
				backgroundImage: '',
				backgroundColor: ''
			},
			row: {
				transition: true,
				spacing: 0,
				style: {
					height: 30
				},
				serialNumber: {
					show: false,
					columnName: 'SN',
					formatter: '{index}.',
					column: 1,
					style: {
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '',
						backgroundImage: '',
						color: '#ffffff'
					},
					specialStyle: []
				},
				rowCheckbox: {
					show: false,
					column: 1,
					style: {},
					specialStyle: []
				},
				// visual样式高于row.style
				visual: {
					show: false,
					interval: 1,
					style: {
						backgroundColor: '#e8f4fc'
					}
				},
				// 注意：单独指定每一行的样式的优先级高于visual.style的优先级
				specialStyle: [],
				// silent的样式优先级高于specialStyle
				silent: {
					show: false, // false is open
					style: {
						opacity: 0.8
					}
				}
			},
			cellOfColumn: {
				style: []
			},
			cell: {
				style: {
					fontSize: 16,
					minWidth: 50,
					color: '#000000',
					textAlign: 'center',
					border: '',
					width: 'auto'
				},
				iconStyle: {
					width: 24,
					height: 'auto'
				}
			}
		}
	}
}

/**
 * 为过时的属性配置警告信息
 * @returns {{discard: string, version: string, replacement: string}[]}
 */
export function getWaringProperty() {
	return [
		{
			version: '1.0.0',
			discard: 'property.body.cell.iconStyle',
			warn: 'Used obsolete configuration in React-tabllist: \'property.body.cell.iconStyle\' will be completely removed in future releases.Please use the object unit ({type: img, ...}) instead.'
		},
		{
			version: '1.2.0',
			discard: 'property.body.row.onClick',
			warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.onClick\' can only be used in version 1.2.0, Please use the object unit ({type: row, ...}) instead.'
		},
		{
			version: '1.3.0',
			discard: 'property.body.row.rowCheckBox',
			replacement: 'property.body.row.rowCheckbox',
			warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.rowCheckBox\' has been deprecated in version 1.3.0 and will be completely removed in future releases. You should use \'property.body.row.rowCheckbox\' instead.'
		},
		{
			version: '1.4.0',
			discard: 'property.isScroll',
			replacement: 'property.scroll.enable',
			warn: 'Used obsolete configuration in React-tabllist: \'property.isScroll\' has been deprecated in version 1.4.0 and will be completely removed in future releases. You should use \'property.scroll.enable\' instead.'
		},
		{
			version: '1.4.0',
			discard: 'property.speed',
			replacement: 'property.scroll.speed',
			warn: 'Used obsolete configuration in React-tabllist: \'property.speed\' has been deprecated in version 1.4.0 and will be completely removed in future releases. You should use \'property.scroll.speed\' instead.'
		},
		{
			version: '1.5.0',
			discard: ['property.body.row.rowCheckbox', 'Object'],
			replacement: 'property.body.row.rowCheckbox.show',
			warn: 'Used obsolete configuration in React-tabllist: \'property.body.row.rowCheckbox\' is no longer directly set to a boolean value in version 1.5.0, but an object. For example: {show: boolean, style: cssProperties}.'
		}
	]
}
