import _ from 'lodash'
import React from 'react'
import config from './config'
import './index.scss'
import * as util from './util'

export default class extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			// 每列单元格的宽度数组
			colWidth: [],
			// body可见区域的高度
			scrollHeight: util.getScrollHeight(props),
			// 复选框、单选框等标签的默认状态
			defaultSelected: false,
			// 所有复选框和单选按钮的状态
			selected: { rowCheckbox: [] },
			// 行选择框的indeterminate状态
			indeterminate: false,
			// 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同
			// 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
			headerWidth: 0,
			// 列表行缓动动画的样式名
			transitionName: '',
			// 行样式
			rowStyle: [],
			// 配置属性
			property: config.property,
			// 渲染数据
			data: config.data,
			// 列表的自定义样式表名
			className: config.className
		}

		// 当一次滚动多行时可用，组件可视区域第一行的索引
		this.rowIndex = 0
	}

	static getDerivedStateFromProps(props, state) {
		let { property, data: stateData, className, ...restState } = state
		const { property: propsProperty, data: propsData, className: propsClassName } = props
		const isDataChanged = _.isEqualWith(propsData, stateData, util.customizer)

		// 检测本次渲染的数据是否有变化
		if(!_.isEqual(propsProperty, property) || !_.isEqual(propsClassName, className) || !isDataChanged) {
			const { height: propsHeight } = props.property.style
			const { height: stateHeight } = property.style
			const { width: propsCellWidth } = props.property.body.cell.style
			const { width: stateCellWidth } = property.body.cell.style
			const { row } = props.property.body

			const transitionName = !isDataChanged
				? util.getTransitionName(row.transition, isDataChanged)
				: state.transitionName

			return {
				...restState,
				...props,
				transitionName,
				rowStyle: util.getRowStyle(props),
				colWidth: propsCellWidth !== stateCellWidth ? util.handleColWidth(propsCellWidth, propsData) : state.colWidth,
				scrollHeight: propsHeight !== stateHeight ? util.getScrollHeight(props) : state.scrollHeight
			}
		}

		// 如果props未更新属性，则返回state。此state已包含setState更新的值。
		return state
	}

	/**
	 * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应
	 */
	componentDidMount() {
		const { scroll, props, listContMain } = this
		const colWidth = util.getColClientWidth(listContMain, props)

		// 如果列数为0，则停止后续操作
		if(colWidth.length) {
			// 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度以及组件滚动区域高度
			// width设置规则以props里面的width字段为准，详情见width字段说明
			const scrollHeight = util.getScrollHeight(props, util.closest(scroll, '.list'))

			this.setState({ colWidth, scrollHeight })

			// 列表滚动相关逻辑入口
			this.scrollList()

			// 检测浏览器当前标签页是否被激活，否则暂停滚动动画（如果启用了组件滚动）
			document.addEventListener('visibilitychange', () => {
				if(document.hidden) {
					this.scrollList(false)
				} else {
					this.scrollList(true, { type: 'mouseleave' })
				}
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqualWith(this.state, nextState, util.customizer)
	}

	/**
	 * 组件每次更新后执行
	 * @param {object} preProps prev props
	 * @param {object} preState prev state
	 */
	componentDidUpdate(preProps, preState) {
		const { listContMain, props } = this
		const colWidth = util.getColClientWidth(listContMain, props)

		if(colWidth.length) {
			const { width: colCellWidth, minWidth: cellMinWidth } = props.property.body.cell.style
			const { width: preColCellWidth, minWidth: preCellMinWidth } = preProps.property.body.cell.style
			const {
				property: {
					style: { width: conWidth, height },
					scroll: { enable },
					header: { show }, body
				},
				transitionName,
				indeterminate
			} = this.state
			const {
				body: preBody,
				header: { show: preShow },
				style: { width: preConWidth, height: preHeight }
			} = preState.property
			const { cell, row } = body
			const { width: iconWidth } = cell.iconStyle
			const { width: preIconWidth } = preBody.cell.iconStyle
			const { transition, rowCheckbox: { show: rowCheckboxShow } } = row

			// 当滚动条显示时，重新计算header的宽度，和列表主体对齐
			if(show && !enable && !_.isEqualWith(this.state, preState, util.customizer)) {
				this.setState({ headerWidth: this.listContMain.clientWidth })
			}

			// 适应单元格宽度，用于组件自身状态或从父级传递的props发生变化时
			if(
				preConWidth !== conWidth ||
				iconWidth !== preIconWidth ||
				colCellWidth !== preColCellWidth ||
				cellMinWidth !== preCellMinWidth
			) {
				// 避免css动画未执行完时获取的列宽不正确，400为css动画的持续时间，见index.scss文件
				setTimeout(() => {
					/**
					 * 组件更新之后，DOM结构已更新，此时重新设置每个单元格宽度
					 * 设置规则以props里面的width字段为准
					 * 详情见width字段说明
					 */
					this.setState({ colWidth })
				}, colCellWidth === 'avg' ? 400 : 0)
			}

			// 适应滚动区域高度
			if(parseInt(preHeight) !== parseInt(height) || preShow !== show) {
				this.setState({
					scrollHeight: util.getScrollHeight(this.state)
				})
			}

			// 缓动动画
			if(transition && transitionName === 'list-row-start') {
				this.setState({ transitionName: util.getTransitionName(transition, _.isEqualWith(preState.data, this.state.data, util.customizer)) })
			}

			// 设置列表头行选择框的indeterminate
			// 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的 indeterminate 状态
			if(show && rowCheckboxShow) {
				this.scroll
					.parentNode
					.querySelector('.list-header input[name=rowCheckbox]')
					.indeterminate = indeterminate
			}

			// 列表滚动相关逻辑入口
			this.scrollList()
		}
	}

	componentWillUnmount() {
		clearInterval(this.marqueeInterval)
	}

	/**
	 * 列表滚动处理
	 * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）
	 * @param {object?} e 事件回调参数
	 */
	scrollList = (isInnerScroll, e) => {
		const {
			listContMain,
			listContSupport,
			state: { scrollHeight, property: { scroll: { enable } } }
		} = this

		// 检测用于滚动的主容器和辅助容器是否存在
		if(listContMain && listContSupport) {
			// 删除上一次定时器，后续根据状态来判定是否定义新的定时器
			clearInterval(this.marqueeInterval)

			if(isInnerScroll || isInnerScroll === undefined) {
				// 检测滚动条件
				// 根据滚动条件控制列表主体容器的辅助容器的显示状态
				if(enable && listContMain.clientHeight >= parseInt(scrollHeight)) {
					if(isInnerScroll !== undefined && e.type === 'mouseleave') {
						// 鼠标移除组件，恢复滚动
						this.pause = false
					}

					if(!this.pause) {
						for(let i = 0; i < listContSupport.children.length; i++) {
							listContSupport.children[i].style.display = 'table-row'
						}

						// 调用滚动逻辑
						this.marquee()
					}
				} else {
					for(let i = 0; i < listContSupport.children.length; i++) {
						listContSupport.children[i].style.display = 'none'
					}
				}
			}
		}
	}

	/**
	 * 列表滚动实现
	 */
	marquee = () => {
		const {
			state: {
				property: { scroll: { enable, speed, distance } }
			},
			listContMain,
			scroll
		} = this

		// 设置定时器，实现列表滚动
		if(listContMain && enable) {
			this.marqueeInterval = setInterval(() => {
				let scrollOffsetTop = util.getScrollTop(distance, listContMain.children, this.rowIndex)

				if(distance < 0) {
					this.scrollTo(NaN, scrollOffsetTop)
				} else {
					scroll.scrollTop += scrollOffsetTop
					this.checkScrollDistance()
				}
			}, speed)
		}
	}

	/**
	 * 滚动到{rowIndex}行
	 * @param rowIndex {number} 行索引。如果此值为假值，则使用第二个参数targetScrollTop
	 * @param targetScrollTop {number} 滚动到的值
	 */
	scrollTo = (rowIndex, targetScrollTop) => {
		const {
			state: {
				property: { scroll: { distance } }
			},
			listContMain,
			scroll
		} = this

		if(!isNaN(rowIndex) && rowIndex >= 0) {
			targetScrollTop = util.getScrollTop.bind('switch', null, listContMain.children, rowIndex)()
		}

		// 时间恒定，根据需要移动的总距离求速度
		const perIntervalMoveDistance = util.getSpeed(targetScrollTop, scroll)

		// 设置按次滚动定时器
		const marqueeIntervalRow = setInterval(() => {
			// 组件移动一次
			if(targetScrollTop !== scroll.scrollTop) {
				let nextScrollDistance

				// 检测滚动目标值与当前的scrollTop值的差距是否大于每次速度值
				// 否则本次速度值按二者之间的差值计算
				if(Math.abs(targetScrollTop - scroll.scrollTop) >= Math.abs(perIntervalMoveDistance)) {
					nextScrollDistance = perIntervalMoveDistance
				} else {
					nextScrollDistance = targetScrollTop - scroll.scrollTop
				}

				// 当滚动目标值小于当前的scrollTop值时
				// 检测scrollTop值是否达到临界值
				// 如果是则当到达主容器高度临界值时重置scrollTop值并进入下一次滚动
				// 直到滚动到目标值为止
				scroll.scrollTop += nextScrollDistance
			} else {
				if(!isNaN(rowIndex) && rowIndex >= 0) {
					if(++rowIndex > (listContMain.children.length - 1) / -distance) {
						this.rowIndex = 0
					} else {
						this.rowIndex = rowIndex - 1
					}
				} else {
					if(++this.rowIndex > (listContMain.children.length - 1) / -distance) {
						this.rowIndex = 0
					}
				}

				// 检测滚动边界
				this.checkScrollDistance()

				// 当次滚动结束
				clearInterval(marqueeIntervalRow)
			}
		}, 4)
	}

	/**
	 * 检测主容器是否滚动完一个周期立即重置scrollTop值
	 */
	checkScrollDistance() {
		const { listContMain, scroll } = this

		if(listContMain.clientHeight <= scroll.scrollTop) {
			scroll.scrollTop = scroll.scrollTop - listContMain.clientHeight
		}
	}

	/**
	 * 行hover事件
	 * @param {object} e event
	 */
	rowHover = e => {
		e.stopPropagation()
		this.setState({ rowStyle: util.getRowStyle(this.state, e) })
	}

	/**
	 * 复选框和单选按钮事件
	 * @param {object} cr 生成DOM的数据
	 * @param {number} rowIndex 使用cr生成的DOM所在行的索引
	 * @param {number} cellIndex 使用cr生成的DOM所在列的索引
	 * @param {number} index 使用cr生成的DOM在当前单元格内的索引
	 * @param {object} event 点击的input对象
	 */
	checkCR = ([cr, { rowIndex, cellIndex, index }], event) => {
		const { target } = event
		const { selected, data, property } = this.state
		const selectedCur = _.cloneDeep(selected)
		let targetName = target.name
		let { indeterminate } = this.state

		// 列表滚动控制（暂停/继续滚动）
		this.pause = true

		// 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
		// 而radio因为是单选按钮，决定了state数组里面有且仅有一个值为true，所以每次都初始化为空数组
		if(target.type === 'radio') {
			// 检测是否是radio，radio需要处理一下this.state.selected里与之对应的name属性
			targetName = targetName.substring(0, targetName.indexOf('-'))
			if(!selectedCur[targetName]) {
				selectedCur[targetName] = []
			}
			// 将处理后结果赋值给state
			selectedCur[targetName][0] = `${cr.key || `cr-${rowIndex}-${cellIndex}-${index}`}`
		}
		// 检测是否点击的是表头的checkbox，且是否启用表头
		else if(target.type === 'checkbox') {
			// 检测是否是行选择框
			if(target.name === 'rowCheckbox') {
				const { show: showHeader } = property.header
				// 获取列表最外层容器
				const listContainer = util.closest(target, '.list')
				// 获取列表内所有的行选择框
				const rowCheckboxes = listContainer.querySelectorAll('[name=\'rowCheckbox\']')

				// 当启用表头时，点击表头的行选择框
				if(showHeader && _.isEqual(rowCheckboxes[0], target)) {
					indeterminate = false
					selectedCur[targetName] = new Array(data.length).fill(target.checked)
				} else {
					/* 触发非表头的行选择框 */
					// 获取触发的行选择框的索引
					const clickedActualIndex = _.findIndex(rowCheckboxes, target)
					// 如果点击的是辅助容器内的行选择框，则对应到主容器内的行选择框的索引。
					const mainIndex = clickedActualIndex >= data.length
						? clickedActualIndex - data.length + (showHeader ? 1 : 0) // 处理显示表头和不显示表头的情况
						: clickedActualIndex
					// 将处理后结果赋值给state
					selectedCur[targetName][mainIndex] = target.checked

					// 每次触发body被行选择框时都检查一次所有行选择框的状态
					const rowCheckboxSelected = _.compact(selectedCur[targetName].slice(1)).length
					if(rowCheckboxSelected !== data.length - 1) {
						selectedCur[targetName][0] = false
						indeterminate = rowCheckboxSelected > 0
					} else {
						selectedCur[targetName][0] = true
						indeterminate = false
					}
				}
			} else {
				/* 非行选择框 */
				if(!selectedCur[targetName]) {
					selectedCur[targetName] = []
				}

				// 获取复选框所在单元格元素
				const listCell = util.closest(target, '.list-cell')
				// 获取同一单元格内相同name的复选框
				const checkboxes = listCell.querySelectorAll(`[name='${targetName}']`)
				// 获取触发的radio的索引
				const clickedIndex = _.findIndex(checkboxes, target)
				// 将处理后结果赋值给state
				selectedCur[targetName][clickedIndex] = target.checked
			}
		}

		this.setState({
			indeterminate,
			selected: selectedCur
		})
	}

	/**
	 * 设置单元格图标
	 * @param {object} icon icon对象
	 * @param rowIndex {number} 行索引
	 * @param cellIndex {number} 列索引
	 * @returns {*[]} 单元格图标DOM || null
	 */
	setCellIcon(icon, { rowIndex, cellIndex }) {
		const { iconStyle } = this.state.property.body.cell

		if(
			icon.src &&
			typeof icon.src === 'string' &&
			(
				icon.src.indexOf('http://') !== -1 ||
				icon.src.indexOf('https://') !== -1 ||
				icon.src.indexOf('data:image/') !== -1
			)
		) {
			return [
				<img
					src={icon.src}
					alt={icon.alt || ''}
					style={iconStyle}
					key={icon.key || `icon-${rowIndex}-${cellIndex}`}
					className={icon.className}
				/>,
				<span key={`text${-icon.key}` || `icon-text-${rowIndex}-${cellIndex}`}>{icon.text || ''}</span>
			]
		}
	}

	/**
	 * 设置单元格link(链接)
	 * @param {object} link link对象
	 * @returns {*} 单元格link DOM || null
	 */
	setCellLink = link => {
		const {
			text,
			event,
			callback,
			data,
			href,
			...props
		} = link

		if(href) {
			// 防止事件冒泡
			props.onClick = util.handleEvent.bind(this, [{}])

			return (
				<a href={href} {...props} >{text}</a>
			)
		}

		const tagProps = {
			...props,
			[event ? event : 'onClick']: util.handleEvent.bind(this, [link])
		}

		return (
			<a {...tagProps} >{text}</a>
		)
	}

	/**
	 * 设置单元格checkbox或radio
	 * @param {object} cr cr对象
	 * @param {number} rowIndex 所在行的索引
	 * @param {number?} cellIndex 所在单元格的索引
	 * @param {number?} index 当前索引
	 * @param {string?} container 当前渲染元素所在的容器
	 * @returns {*} 单元格checkbox或radio || null
	 */
	setCellInput(cr, { rowIndex, cellIndex, index }, container) {
		let tagProps = {}

		// 处理事件
		if(cr.type === 'button') {
			tagProps = {
				[cr.event ? cr.event : 'onClick']: util.handleEvent.bind(this, [cr]),
				key: cr.key,
				type: cr.type,
				value: cr.value,
				className: cr.className
			}
		} else {
			const { selected, defaultSelected } = this.state
			const selectedCur = selected[cr.name] || []

			tagProps = {
				type: cr.type,
				name: cr.type === 'radio' ? `${cr.name}-${container}` : cr.name,
				className: cr.className
			}

			if(cr.type === 'checkbox') {
				if(cr.name === 'rowCheckbox') {
					tagProps.checked = selectedCur[rowIndex] ? selectedCur[rowIndex] : defaultSelected
				} else {
					tagProps.checked = selectedCur[index] ? selectedCur[index] : defaultSelected
				}
			} else if(cr.type === 'radio') {
				tagProps.checked = selectedCur[0] === `${cr.key || `cr-${rowIndex}-${cellIndex}-${index}`}`
					? true
					: defaultSelected
			}

			if(!cr.event || cr.event === 'onClick' || cr.event === 'onChange') {
				tagProps.onChange = util.handleEvent.bind(this, [
					cr,
					this.checkCR.bind(null, [cr, { rowIndex, cellIndex, index }])
				])
				tagProps.onClick = util.handleEvent.bind(this, [{}])
			} else {
				// 当自定义事件不为‘onClick’或‘onChange’时，为radio或checkbox添加默认的点击事件
				tagProps[cr.event] = util.handleEvent.bind(this, [cr])
				tagProps.onChange = this.checkCR.bind(null, [cr, { rowIndex, cellIndex, index }])
				tagProps.onClick = util.handleEvent.bind(this, [{}])
			}
		}

		if(cr.type === 'radio' && !container) {
			console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!')
			return null
		}

		if(cr.type === 'radio' || cr.type === 'checkbox') {
			const {
				show: rowCheckboxShow,
				style: rowCheckboxStyle,
				specialStyle
			} = this.state.property.body.row.rowCheckbox
			const style = rowCheckboxShow && cr.key && cr.key.match(/^rowCheck\d+/)
				? {
					...rowCheckboxStyle,
					...specialStyle[rowIndex - 1]
				}
				: {}

			return (
				<label
					className={`list-cell-chk${cr.className ? ` ${cr.className}` : ''}`}
					key={`${cr.key || `cr-${rowIndex}-${cellIndex}-${index}`}`}
					onClick={util.handleEvent.bind(this, [{}])}
					style={style}
				>
					<input {...tagProps} />
					{cr.text ? <span>{cr.text}</span> : null}
				</label>
			)
		}

		// button 等标签会执行以下代码
		return (
			<input {...tagProps} />
		)
	}

	/**
	 * 设置单元格的下拉列表
	 * @param cs {object} 对象单元
	 */
	setCellSelect(cs) {
		const { type, text, option, data, className, event, callback, ...props } = cs

		const tagProps = {
			...props,
			[event ? event : 'onChange']: util.handleEvent.bind(this, [cs])
		}

		return (
			<label className={className}>
				{text ? <span>{text}</span> : null}
				<select {...tagProps}>
					{
						option && option.map((item, index) => <option key={index} {...item} />)
					}
				</select>
			</label>
		)
	}

	/**
	 * 设置单元格内的对象单元文本
	 * @param ct {object} 对象单元
	 * @param rowIndex {number} 行索引
	 * @returns {*}
	 */
	setCellText(ct, { rowIndex }) {
		const { header, body } = this.state.property
		const {
			show: serialNumberShow,
			style: serialNumberStyle,
			specialStyle
		} = body.row.serialNumber
		const { text, key, className, data, event, callback, ...restProps } = ct
		const CTKey = key ? { key } : {}
		let style = serialNumberShow && key && key.match(/^listSN\d+/)
			? {
				...(!header.show || rowIndex !== 0 ? serialNumberStyle : {}),
				...specialStyle[rowIndex - 1]
			}
			: {}

		// 处理默认事件及回调函数
		if(typeof callback === 'function') {
			style = { ...style, cursor: 'pointer' }

			if(event) {
				restProps[event] = util.handleEvent.bind(this, [ct])
			} else {
				restProps['onClick'] = util.handleEvent.bind(this, [ct])
			}
		}

		return (
			<span
				className={`list-cell-text${className ? ` ${className}` : ''}`}
				style={style}
				{...CTKey}
				{...restProps}
			>
				{text}
			</span>
		)
	}

	/**
	 * 设置单元格
	 * @param rowData {Array} 行数据
	 * @param rowIndex {number} 行索引
	 * @param container {string} 当前所在容器的名称
	 */
	setCell(rowData, rowIndex, container) {
		const { colWidth, property, rowStyle } = this.state
		const {
			cellOfColumn: { style: cellOfColumnStyle },
			cell: { style }
		} = property.body

		// 处理border属性值
		const listBorder = this.setBorder(style)

		return rowData.map((cellData, cellIndex) => {
			return (
				<div
					key={`${container}-cell-r${rowIndex}-c${cellIndex}`}
					className='list-cell'
					style={{
						height: rowStyle[rowIndex] ? rowStyle[rowIndex].height : 'auto',
						...style,
						width: typeof colWidth === 'string' ? colWidth : (colWidth[cellIndex] || 'auto'),
						...cellOfColumnStyle[cellIndex],
						...listBorder
					}}
				>
					{this.parsing(cellData, { rowIndex: rowIndex + 1, cellIndex }, container)}
				</div>
			)
		})
	}

	/**
	 * 解析数据里面的对象
	 * @param {object} cellData 需要解析的单元格数据
	 * @param {number} rowIndex 需要解析的单元格数据所在行的索引
	 * @param {number} cellIndex 需要解析的单元格数据所在行的索引
	 * @param {number?} index 当前循环遍历的index
	 * @param {string?} container 当前渲染单元格所在的容器（此参数目前只在type为radio时生效）
	 * @returns {*} 单元格数据或DOM
	 */
	parsing(cellData, { rowIndex, cellIndex, index }, container) {
		if(Array.isArray(cellData)) {
			return cellData.map((o, i) => this.parsing(o, { rowIndex, cellIndex, index: i }, container))
		}

		if(_.isObject(cellData)) {
			switch (cellData.type) {
				case 'img':
					return this.setCellIcon(cellData, { rowIndex, cellIndex })
				case 'link':
					return this.setCellLink(cellData)
				case 'radio':
					return this.setCellInput(cellData, { rowIndex, cellIndex, index }, container)
				case 'checkbox':
					return this.setCellInput(cellData, { rowIndex, cellIndex, index })
				case 'button':
					return this.setCellInput(cellData, { rowIndex, cellIndex, index })
				case 'select':
					return this.setCellSelect(cellData)
				case 'text':
					return this.setCellText(cellData, { rowIndex })
			}
		}

		// 不是指定对象，返回原数据
		return cellData
	}

	/**
	 * 设置边框
	 * 检测到空值则使用全局配置，而不是设置为无边框
	 * @param {object} borderStyle 含有边框属性的对象
	 * @returns {object} 返回包含border及其相关属性的对象
	 */
	setBorder(borderStyle) {
		const { border } = this.state.property
		const newBorder = {}

		// borderStyle对象的border属性为空字符串
		if(borderStyle && borderStyle.border === '') {
			return border
		}

		// borderStyle对象的border属性为空值以外的其他假值
		if(!borderStyle.border) {
			newBorder.borderWidth = borderStyle.borderWidth || border.borderWidth
			newBorder.borderColor = borderStyle.borderColor || border.borderColor
			newBorder.borderStyle = borderStyle.borderStyle || border.borderStyle

			return newBorder
		}

		return { border: borderStyle.border }
	}

	/**
	 * 设置行
	 * @param {array} bodyData 列表主体数据
	 * @param {string} container 当前所在容器的名称
	 * @returns {*} 列表主体DOM
	 */
	setRow(bodyData, container) {
		const { property, transitionName, rowStyle } = this.state
		const { body: { row: { transition } } } = property

		// 处理行动画的样式
		const transitionClassName = transition ? ` ${transitionName}` : ''

		return bodyData.map((rowData, rowIndex) => {
			const customClassName = rowData.className ? ` ${rowData.className}` : ''
			let LIElementProps = {
				className: `list-row${customClassName}${transitionClassName}`,
				style: rowStyle[rowIndex],
				onMouseEnter: this.rowHover,
				onMouseLeave: this.rowHover
			}

			// 检测行数据是一个对象还是一个数组
			// 如果是对象，则需要对行数据做一些处理，比如添加自定义事件等（目前只支持添加事件）
			if(_.isPlainObject(rowData) && rowData.type === 'row') {
				LIElementProps[rowData.event] = util.handleEvent.bind(this, [rowData])
				LIElementProps.value = rowData.value
			} else {
				LIElementProps = { ...LIElementProps, type: 'row' }
			}

			return (
				<li key={`${container}-list-row${rowData.key ? rowData.key : rowIndex}`} {...LIElementProps}>
					{
						_.isArray(rowData)
							? this.setCell(rowData, rowIndex, container)
							: this.setCell(rowData.cells, rowIndex, container)
					}
				</li>
			)
		})
	}

	/**
	 * 加载列表头
	 * @param {array} data 列表头数据
	 * @returns {*} 列表头DOM
	 */
	loadHeader(data) {
		const { property, colWidth, headerWidth } = this.state
		const { scroll: { enable }, header: { style, cellStyle, show: showHeader } } = property
		const {
			cell: { style: { minWidth } }
		} = property.body

		// 处理border属性值
		const listBorder = this.setBorder(cellStyle)

		if(showHeader && data && data.length) {
			return (
				<ul
					className='list-header list-cont'
					style={
						!enable && headerWidth
							? {
								...style,
								width: headerWidth
							}
							: style
					}
				>
					<li key='list-row' className='list-row' style={style}>
						{
							data.map((cell, index) => (
								<div
									className='list-cell'
									title={_.isObject(cell) ? cell.text : cell}
									key={`list-header-${index}`}
									style={{
										...cellStyle,
										width: typeof colWidth === 'string' ? colWidth : (colWidth[index] || 'auto'),
										minWidth,
										...listBorder
									}}
								>
									{this.parsing(cell, { rowIndex: 0, cellIndex: 0 })}
								</div>
							))
						}
					</li>
				</ul>
			)
		}

		return null
	}

	/**
	 * 加载列表主体
	 * @param bodyData
	 * @returns {*}
	 */
	loadBody(bodyData) {
		const {
			scrollHeight,
			property: {
				body: {
					style,
					row: { spacing }
				},
				scroll: { enable }
			}
		} = this.state
		// 处理css属性‘border-collapse’与‘border-spacing’的值
		const listContStyle = util.getListContStyle(spacing)

		return (
			<div
				className='list-body'
				ref={ele => this.scroll = ele}
				style={{ ...style, height: scrollHeight, overflowY: enable ? 'hidden' : 'auto' }}
			>
				<ul
					className='list-cont'
					style={listContStyle}
					ref={ele => this.listContMain = ele}
				>
					{this.setRow(bodyData, 'main')}
				</ul>
				<ul
					className='list-cont'
					style={listContStyle}
					ref={ele => this.listContSupport = ele}
				>
					{this.setRow(bodyData, 'support')}
				</ul>
			</div>
		)
	}

	/**
	 * 渲染 DOM 结构
	 * @returns {*} 组件DOM
	 */
	render() {
		const {
			property: {
				header: { show: showHeader },
				body: { row: { spacing } },
				style: conStyle
			},
			data,
			className
		} = this.state

		// 处理border属性值
		const listBorder = this.setBorder(conStyle)

		// 当存在表头数据且表头是开启时处理数据
		let headerData
		let bodyData

		this.renderData = util.fillRow(data, this.state)

		if(showHeader && data.length) {
			[headerData, ...bodyData] = this.renderData
		} else {
			bodyData = this.renderData
		}

		const listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing'

		return (
			<div
				style={{ ...listBorder, ...conStyle }}
				className={`list${className ? ` ${className}` : ''}${listClass ? ` ${listClass}` : ''}`}
				onMouseMove={this.scrollList.bind(this, false)}
				onMouseLeave={this.scrollList.bind(this, true)}
			>
				{this.loadHeader(headerData)}
				{this.loadBody(bodyData)}
			</div>
		)
	}
}
