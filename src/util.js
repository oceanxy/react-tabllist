/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: util
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-06-19 17:35:16
 */

import _ from 'lodash'
import { getWaringProperty } from './config'

/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element} el DOM元素
 * @param {string} selector 选择器
 * @return {Element} 按照选择器筛选后的元素
 */
export function closest(el, selector) {
	if(el) {
		const matchesSelector = el.matches ||
			el.webkitMatchesSelector ||
			el.mozMatchesSelector ||
			el.msMatchesSelector

		while(el) {
			if(matchesSelector.call(el, selector)) {
				break
			}
			el = el.parentNode || el.parentElement
		}

		return el
	}

	return null
}

/**
 * 设置屏幕滚动区域可见高度
 * @param {object} props props
 * @param {=} listComponent 列表组件实例对象
 * @returns {*} 列表滚动区域可见高度
 */
export function getScrollHeight(props, listComponent) {
	const {
		header: { show, style },
		style: { height }
	} = props.property

	if(listComponent) {
		const { paddingTop, paddingBottom, borderTopWidth, borderBottomWidth } = getComputedStyle(listComponent, null)
		const result = parseInt(height) - parseInt(paddingTop) - parseInt(paddingBottom) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)

		if(show) {
			return result - parseInt(style.height)
		}

		return result
	}

	// 如果启用了表头
	if(show) {
		return parseInt(height) - parseInt(style.height)
	}

	return parseInt(height)
}

/**
 * 将用户设置的每一列单元格宽度值解析为组件程序需要的值，同时处理不合法数据
 * @param {string|array|number} width props传入的宽度数据
 * @param {array} data 用于渲染组件的数据
 * @returns {*} 用于渲染每列单元格的宽度值
 */
export function handleColWidth(width, data) {
	function isString(widthValue) {
		if(widthValue.indexOf('px') > -1) {
			return `${parseFloat(widthValue)}px`
		} else if(widthValue.indexOf('%') > -1) {
			return `${parseFloat(widthValue)}%`
		} else if(widthValue * 1) {
			return parseFloat(widthValue)
		}

		return 'auto'
	}

	// 处理数组形式的多列宽度数值
	if(Array.isArray(width)) {
		return width.map(o => {
			if(o === 0 || !o) {
				return 'auto'
			} else if(typeof o === 'string') {
				if(width.indexOf(',') >= 0) {
					return width.split(',').map(o => isString(o))
				} else if(width === 'avg') {
					return new Array(getMaxCellOfRow(data)).fill(1)
				}
			}

			return o
		})
	}
	// 处理字符串形式的多列宽度数值
	else if(typeof width === 'string') {
		return isString(width)
	}

	return 'auto'
}

/**
 * 从渲染数据中获取每行的单元格数量（以最多单元格的一行为准）
 * @param data 用于渲染的数据
 * @returns {number}
 */
export function getMaxCellOfRow(data) {
	const cellsOfRow = []

	// 获取每一行的数据量，存入数组 cellsOfRow 内
	_.range(data.length).map(i => {
		// 如果行数据是一个对象，保证该对象内一定有一个cells字段
		if(_.isPlainObject(data[i]) && !data[i].cells) {
			data[i].cells = []
		}

		cellsOfRow.push(_.isArray(data[i]) ? data[i].length : data[i].cells.length)
	})

	// 获取数据量最多的一行的数值
	return Math.max(...cellsOfRow)
}

/**
 * 补齐单元格
 * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
 * @param {object} data 新数据
 * @param {object} state 组件当前状态
 * @returns {Array} 补齐后的用于生成单元格的数据
 */
export function fillRow(data, state) {
	const { row: { rowCheckbox, serialNumber } } = state.property.body
	const cloneData = [...data]
	// 获取数据量最多的一行的数值
	const maxCellValue = getMaxCellOfRow(cloneData)
	const newData = []

	function specifiedColumn(insertedRow, row, cloneRow) {
		const rowCheck = {
			type: 'checkbox',
			text: '',
			key: `rowCheck${row}`,
			name: 'rowCheckbox'
		}

		const SNCell = {
			type: 'text',
			text: serialNumber.formatter.replace('{index}', row),
			key: `listSN${row}`
		}

		insertedRow = [
			...cloneRow,
			...new Array(maxCellValue - cloneRow.length).fill('')
		]

		// 检测是否开启行选择功能
		if(rowCheckbox.show) {
			insertedRow.unshift(rowCheck)
		}

		// 检测是否开启行序号功能
		if(serialNumber.show) {
			insertedRow.unshift(SNCell)
		}

		return insertedRow
	}

	// 补齐空数据到缺失的行
	cloneData.forEach((row, ind) => {
		if(_.isArray(cloneData[ind])) {
			newData.push(specifiedColumn(newData[ind], ind, cloneData[ind]))
		} else {
			newData[ind] = { ...cloneData[ind] }
			newData[ind].cells = specifiedColumn(newData[ind].cells, ind, cloneData[ind].cells)
		}
	})

	return newData
}

/**
 * 组件内部元素的事件处理
 * @param _objectUnit {object} 渲染组件结构的对象单元
 * @param _func {function} 内部逻辑函数
 * @param event event对象
 */
export function handleEvent([_objectUnit, _func], event) {
	event.stopPropagation()

	if(_func && _.isFunction(_func)) {
		_func(event)
	}

	// 开放方法
	_objectUnit = { ..._objectUnit, instanceObject: this }

	if(_objectUnit && _objectUnit.callback && _.isFunction(_objectUnit.callback)) {
		_objectUnit.callback(_objectUnit.data, _objectUnit, event)
	}
}

/**
 * 在控制台打印警告
 * @param property 用户的配置属性对象
 * @returns {*} 新的property
 */
export function waring(property) {
	const waringProperty = getWaringProperty()

	/**
	 * 检测指定key是否被用户定义
	 * @param discard 被定义的过时属性
	 * @param property 用户定义的整个配置对象
	 * @returns {{isExist: boolean}|{isExist: boolean, value: *}} isExist:是否使用了过时属性 value:过时属性的值
	 */
	function isKeyExists(discard, property) {
		if(!property || !discard || !discard[0]) {
			return { isExist: false }
		}

		// 将传入的对象路径字符串拆分为数组
		const isDiscardArray = Array.isArray(discard)
		const pathList = isDiscardArray ? discard[0].split('.') : discard.split('.')
		// 如果使用了过时的属性，则此变量用来保存用户设置的属性值
		let value

		// 检测用户的配置对象是否存在警告
		for(let i = 1; i < pathList.length; i++) {
			if(typeof property[pathList[i]] === 'undefined') {
				return { isExist: false }
			}

			if(i !== pathList.length - 1) {
				property = property[pathList[i]]
			} else {
				value = property[pathList[i]]

				if(isDiscardArray && Object.prototype.toString.apply(value) === `[object ${discard[1]}]`) {
					return { isExist: false }
				} else {
					property = pathList[i]
				}
			}
		}

		return { isExist: true, value }
	}

	/**
	 * 将用户使用的过时key赋值到正确的key
	 * @param replacement 正确的key
	 * @param property 用户定义的整个配置对象
	 * @param valueOfDiscard 用户使用的过时key的值
	 */
	function createNewProperty(replacement, property, valueOfDiscard) {
		if(!replacement) {
			return
		}

		// 将传入的对象路径字符串拆分为数组
		const pathList = replacement.split('.')

		// 替换过时属性，同时配置相对应的属性（如果存在）
		for(let i = 1; i < pathList.length; i++) {
			if(i !== pathList.length - 1) {
				// 确保给定的属性路径是对象的形式，防止报错：获取未定义的对象的属性
				if(property[pathList[i]] === 'undefined' || !_.isPlainObject(property[pathList[i]])) {
					property[pathList[i]] = {}
				}

				property = property[pathList[i]]
			} else {
				property[pathList[i]] = valueOfDiscard
			}
		}
	}

	waringProperty.map(_obj => {
		const result = isKeyExists(_obj.discard, property)
		if(result.isExist) {
			createNewProperty(_obj.replacement, property, result.value)

			if(process.env.NODE_ENV === 'development') {
				if(_obj.warn) {
					console.warn(_obj.warn)
				} else {
					console.warn('Used obsolete configuration in React-tabllist')
				}
			}
		}
	})

	return property
}

/**
 * @desc 获取组件每次滚动的距离。
 - 如果值为正整数，单位为`像素`；
 - 为`0`，表示停用滚动，同`scroll.enable:false`；
 - 如果为负整数，则以行为单位进行滚动，行数等于该值的绝对值。
 - 如果为正小数，则向上取整。
 - 如果为负小数，则向下取整。
 - 如果为非数字或，则取`0`。
 * @param distanceConfig {number} 用户设置的滚动距离
 * @param rows {Array} 包含所有行的数组
 * @param counter {number} 当前可视区域第一行的索引
 * @returns {*} 处理后的滚动距离
 */
export function getScrollTop(distanceConfig, rows, counter) {
	if(this === 'switch') {
		if(!counter) {
			return 0
		}

		return rows[counter].offsetTop - rows[counter].parentElement.offsetTop
	} else {
		if(isNaN(distanceConfig)) {
			return 0
		} else {
			if(distanceConfig >= 0) {
				return Math.ceil(distanceConfig)
			}

			let nextRow = (counter + 1) * -distanceConfig

			// 当设置一次滚动多行后，如果某一次递增的索引大于了总行数，则直接返回父容器的高度
			// 即接下来的一次滚动直接滚动到主容器最后的位置
			if(nextRow > rows.length - 1) {
				return rows[0].parentElement.offsetHeight
			}

			return rows[nextRow].offsetTop - rows[0].offsetTop
		}
	}
}

/**
 * 获取下一次滚动的速度(px/ms)
 * @param targetScrollTop {number} 滚动目标值
 * @param scroll {object} 滚动容器对象
 * @returns {number}
 */
export function getSpeed(targetScrollTop, scroll) {
	const distance = targetScrollTop - scroll.scrollTop

	if(distance > 0) {
		return Math.ceil(distance / 30)
	} else if(distance < 0) {
		return Math.floor(distance / 30)
	}

	return 1
}

/**
 * 根据props及data获取过渡动画的样式表名
 * @param transition {boolean} 是否开启了过渡动画
 * @param isEqual {boolean} props数据
 * @returns {string}
 */
export function getTransitionName(transition, isEqual) {
	if(transition) {
		if(!isEqual) {
			return 'list-row-start'
		} else {
			return 'list-row-end'
		}
	}

	return ''
}

/**
 * lodash.isEqualWith方法的第三个参数
 * https://www.lodashjs.com/docs/latest#_isequalwithvalue-other-customizer
 * @param objValue
 * @param othValue
 * @returns {boolean}
 */
export function customizer(objValue, othValue) {
	if(typeof objValue === 'function' || typeof othValue === 'function') {
		return true
	}
}

/**
 * 获取行的样式
 * 行样式的优先级顺序：row.style < row.visual.style < row.specialStyle < silent.style
 * @param rowState
 * @param event
 */
export function getRowStyle(rowState, event) {
	const { data, property } = rowState
	const { body, header } = property
	const { show: headerShow } = header
	const { row } = body
	const {
		style,
		visual: {
			show: visualShow,
			style: visualStyle,
			interval
		},
		specialStyle,
		silent: {
			show: silentShow,
			style: silentStyle
		}
	} = row

	let rowStyle = []

	_.range(headerShow ? data.length - 1 : data.length).map(index => {
		let tempStyle = style

		if(visualShow && interval && !Number.isNaN(interval) && index % (interval * 2) >= interval) {
			tempStyle = {
				...tempStyle,
				...visualStyle
			}
		}

		if(specialStyle && _.isArray(specialStyle)) {
			tempStyle = {
				...tempStyle,
				...specialStyle[index]
			}
		}

		if(event) {
			const rowElement = closest(event.target, '.list-row')
			const rowIndex = Array.prototype.indexOf.call(rowElement.parentNode.childNodes, rowElement)

			if(!silentShow && index === rowIndex && event.type === 'mouseenter') {
				tempStyle = {
					...tempStyle,
					...silentStyle
				}
			}
		}

		rowStyle.push(tempStyle)
	})

	return rowStyle
}
