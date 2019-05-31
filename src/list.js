/**
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Description: react-tabllist
 * @Date: 2018-10-08 17:56:19
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-05-31 09:10:45
 */

import _ from 'lodash'
import React, { Component } from 'react'
import './index.scss'
import * as util from './util'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 每列单元格的宽度数组
      colWidth: util.setColWidth(props.property.body.cell.style.width),
      // body可见区域的高度
      scrollHeight: util.setScrollHeight(props),
      // 复选框、单选框等标签的默认状态
      defaultSelected: false,
      // 行选择框的indeterminate状态
      indeterminate: false,
      selected: { rowCheckbox: [] },
      // 列表行缓动动画的样式名
      transitionName: '',
      // 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同
      // 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
      headerWidth: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    // 以下值由props控制
    const { data, property, className, ...option } = props
    const { transition } = property.body.row
    const propsUpdate = { data, property, className, ...option }

    // 以下值由组件本身控制
    const {
      colWidth,
      scrollHeight,
      selected,
      defaultSelected,
      indeterminate,
      property: stateProperty,
      data: stateData,
      headerWidth
    } = state

    let { transitionName } = state

    if(transition) {
      if(!_.isEqual(data, stateData)) {
        transitionName = 'list-row-start'
      }
    } else {
      transitionName = ''
    }

    const stateUpdate = {
      colWidth,
      scrollHeight,
      defaultSelected,
      indeterminate,
      selected,
      transitionName,
      headerWidth
    }

    const { width } = property.body.cell.style
    // 由props和state同时控制的colWidth
    if(stateProperty && width !== stateProperty.body.cell.style.width) {
      stateUpdate.colWidth = util.setColWidth(width)
    }

    // 检测props是否发生改变
    const propsUpdateArray = Object.keys(propsUpdate)
    propsUpdateArray.map(prop => {
      if(propsUpdate[prop] === state[prop]) {
        delete propsUpdate[prop]
      } else if(prop === 'property') {
        _.defaultsDeep(propsUpdate[prop], state[prop])
      }
    })

    // 如果props更新了属性，则返回props和state合并的配置项
    if(propsUpdateArray.length) {
      return { ...propsUpdate, ...stateUpdate }
    }

    // 如果props未更新属性，则返回组件自身从setState通道更新的状态值
    return stateUpdate
  }

  /**
   * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应
   */
  componentDidMount() {
    const colWidth = this.getColClientWidth()

    // 如果列数为0，则停止后续操作
    if(colWidth.length) {
      /**
       * 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度
       * 设置规则以props里面的width字段为准
       * 详情见width字段说明
       */
      /* eslint-disable react/no-did-mount-set-state  */
      this.setState({ colWidth })

      // 列表滚动相关逻辑入口
      this.scrollList()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 避免闪动
    return !_.isEqual(this.props, nextProps) || !_.isEqualWith(this.state, nextState)
  }

  /**
   * 组件每次更新后执行
   * @param {object} preProps prev props
   * @param {object} preState prev state
   */
  componentDidUpdate(preProps, preState) {
    const colWidth = this.getColClientWidth()

    if(colWidth.length) {
      const {
        width: colCellWidth,
        minWidth: cellMinWidth
      } = this.props.property.body.cell.style
      const {
        width: preColCellWidth,
        minWidth: preCellMinWidth
      } = preProps.property.body.cell.style
      const {
        property: {
          style: { width: conWidth, height },
          header: { show }, body, isScroll
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
      const { transition, rowCheckbox } = row

      // 当滚动条显示时，重新计算header的宽度，和列表主体对齐
      if(show && !isScroll) {
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
          scrollHeight: util.setScrollHeight(this.state)
        })
      }

      // 缓动动画
      if(transition && transitionName === 'list-row-start') {
        this.setState({ transitionName: 'list-row-start list-row-transition' })
      }

      // 设置列表头行选择框的indeterminate
      // 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的 indeterminate 状态
      if(show && rowCheckbox) {
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
   * 列表滚动逻辑
   * @param {boolean?} isInnerScroll 内部滚动变量（用于事件控制）
   * @param {object?} e 事件回调参数
   */
  scrollList = (isInnerScroll, e) => {
    const {
      listContMain,
      listContSupport,
      state: { scrollHeight, property: { isScroll, speed } }
    } = this

    if(listContMain && listContSupport) {
      // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
      clearInterval(this.marqueeInterval)

      if(isInnerScroll || isInnerScroll === undefined) {
        // 检测滚动条件
        // 根据滚动条件控制列表主体容器的辅助容器的显示状态
        if(isScroll && listContMain.clientHeight >= parseInt(scrollHeight)) {
          if(isInnerScroll !== undefined && e.type === 'mouseleave') {
            this.pause = false
          }
          if(!this.pause) {
            for(let i = 0; i < listContSupport.children.length; i++) {
              listContSupport.children[i].style.display = 'table-row'
            }

            // 设置定时器，实现列表滚动
            this.marqueeInterval = setInterval(this.marquee, speed)
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
   * 行hover事件
   * @param {object} e event
   */
  rowHover = (e) => {
    const { silent: { show, style } } = this.state.property.body.row
    const { target } = e
    let row = target

    if(!show) {
      // 检测target是否是列表行元素，否则向上寻找，直到找到行元素为止
      if(!target.classList.contains('list-row')) {
        row = util.closest(target, '.list-row')
      }

      // 遍历style并依次赋值给元素

      Object.keys(style).map(key => {
        if(e.type === 'mouseenter') {
          if(key.indexOf('old') === -1) {
            style[`old${key}`] = row.style[key]
            row.style[key] = style[key]
          }
        } else if(e.type === 'mouseleave') {
          if(style[`old${key}`]) {
            row.style[key] = style[`old${key}`]
            delete style[`old${key}`]
          } else {
            row.style[key] = ''
          }
        }
      })
    }
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

    // 列表滚动控制
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
   * 获取DOM内每一列单元格的实际宽度
   * @returns {Array} 列表每列的宽度值，数组长度代表列数
   */
  getColClientWidth = () => {
    const { listContMain, props } = this
    const { borderWidth } = props.property.border
    const width = []

    if(listContMain && listContMain.children.length) {
      for(let i = 0, l = listContMain.children[0].children; i < l.length; i++) {
        width.push(l[i].clientWidth - parseInt(borderWidth) || 0)
      }
    }

    return width
  }

  /**
   * 列表滚动实现
   */
  marquee = () => {
    const { listContMain, scroll } = this

    if(listContMain && scroll) {
      scroll.scrollTop++

      // 滚动完一个完整周期后立即重置滚动区域的scrollTop值为0
      if(listContMain.clientHeight <= scroll.scrollTop) {
        scroll.scrollTop = 0
      }
    }
  }

  /**
   * 补齐单元格
   * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
   * @param {object} data 新数据
   * @returns {Array} 补齐后的用于生成单元格的数据
   */
  fillRow(data) {
    const cellsOfRow = []
    const { row: { rowCheckbox, serialNumber } } = this.state.property.body

    // 获取每一行的数据量，存入数组 cellsOfRow 内
    _.range(data.length).map(i => {
      // 如果行数据是一个对象，保证该对象内一定有一个cells字段
      if(!data[i].cells) {
        data[i].cells = []
      }

      cellsOfRow.push(_.isArray(data[i]) ? data[i].length : data[i].cells.length)
    })

    // 获取数据量最多的一行的数值
    const maxCellValue = Math.max(...cellsOfRow)
    const newData = []

    // 补齐空数据到缺失的行
    data.forEach((row, ind) => {
      const rowCheck = {
        type: 'checkbox',
        text: '',
        key: `rowCheck${ind}`,
        name: 'rowCheckbox'
      }

      if(_.isArray(data[ind])) {
        newData[ind] = [
          ...data[ind],
          ...new Array(maxCellValue - data[ind].length).fill('')
        ]

        // 检测是否开启行选择功能
        if(rowCheckbox) {
          newData[ind].unshift(rowCheck)
        }

        // 检测是否开启行序号功能
        if(serialNumber.show) {
          newData[ind].unshift(serialNumber.formatter)
        }
      } else {
        newData[ind] = { ...data[ind] }
        newData[ind].cells = [
          ...data[ind].cells,
          ...new Array(maxCellValue - data[ind].cells.length).fill('')
        ]

        // 检测是否开启行选择功能
        if(rowCheckbox) {
          newData[ind].cells.unshift(rowCheck)
        }

        // 检测是否开启行序号功能
        if(serialNumber.show) {
          newData[ind].cells.unshift(serialNumber.formatter)
        }
      }
    })

    return newData
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
      type,
      text,
      event,
      callback,
      data,
      href,
      ...props
    } = link

    if(href) {
      // 防止事件冒泡
      props.onClick = util.handleEvent.bind(null, [{}])

      return (
        <a href={href} {...props} >{text}</a>
      )
    }

    const tagProps = {
      ...props,
      [event ? event : 'onClick']: util.handleEvent.bind(null, [link])
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
        [cr.event ? cr.event : 'onClick']: util.handleEvent.bind(null, [cr]),
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
        tagProps.onChange = util.handleEvent.bind(null, [
          cr,
          this.checkCR.bind(null, [cr, { rowIndex, cellIndex, index }])
        ])
        tagProps.onClick = util.handleEvent.bind(null, [{}])
      } else {
        // 当自定义事件不为‘onClick’或‘onChange’时，为radio或checkbox添加默认的点击事件
        tagProps[cr.event] = util.handleEvent.bind(null, [cr])
        tagProps.onChange = this.checkCR.bind(null, [cr, { rowIndex, cellIndex, index }])
        tagProps.onClick = util.handleEvent.bind(null, [{}])
      }
    }

    if(cr.type === 'radio' && !container) {
      /* eslint-disable no-console */
      console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!')
      return null
    }

    if(cr.type === 'radio' || cr.type === 'checkbox') {
      return (
        <label key={`${cr.key || `cr-${rowIndex}-${cellIndex}-${index}`}`} onClick={util.handleEvent.bind(null, [{}])}>
          <input {...tagProps} />
          {cr.text ? <span>{cr.text}</span> : null}
        </label>
      )
    }

    // button 等标签会执行以下代码
    return (
      <input{...tagProps} />
    )
  }

  /**
   * 设置单元格
   * @param rowData {Array} 行数据
   * @param rowIndex {number} 行索引
   * @param container {string} 当前所在容器的名称
   */
  setCell(rowData, rowIndex, container) {
    const { colWidth, property } = this.state
    const { body } = property
    const {
      row: {
        serialNumber: { show: serialNumberShow, style: serialNumberStyle, specialStyle }
      },
      cellOfColumn: { style: cellOfColumnStyle },
      cell: { style }
    } = body

    // 处理border属性值
    const listBorder = this.setBorder(style)

    return rowData.map((cellData, cellIndex) => {
      return (
        <div
          key={`${container}-cell-r${rowIndex}-c${cellIndex}`}
          className='list-cell'
          style={
            serialNumberShow && !cellIndex
              // 如果开启行序号，且为每行第一个单元格
              ? {
                ...style,
                width: typeof colWidth === 'string' ? colWidth : (colWidth[cellIndex] || 'auto'),
                ...serialNumberStyle,
                ...specialStyle[rowIndex],
                ...cellOfColumnStyle[cellIndex],
                ...listBorder
              }
              // 未开启行序号或不为行内第一个单元格
              : {
                ...style,
                width: typeof colWidth === 'string' ? colWidth : (colWidth[cellIndex] || 'auto'),
                ...cellOfColumnStyle[cellIndex],
                ...listBorder
              }
          }
        >
          {
            // 检测是否启用行号功能，并且为行内第一个单元格
            serialNumberShow && cellIndex === 0 && typeof cellData === 'string'
              ? cellData.replace('{index}', rowIndex + 1)
              : this.parsing(cellData, { rowIndex: rowIndex + 1, cellIndex }, container)
          }
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
      }
    }

    // 不是对象，返回源数据
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
    const { property, transitionName } = this.state
    const { body } = property

    const {
      row: {
        transition,
        style: rowStyle,
        specialStyle: specialRowStyle,
        visual: { show: rowVisualShow, interval: rowVisualInterval }
      }
    } = body

    // 处理间隔行样式
    let isVisual = false
    let { style: rowVisualStyle } = body.row.visual
    if(rowVisualShow && rowVisualInterval && !Number.isNaN(rowVisualInterval)) {
      isVisual = true
      rowVisualStyle = {
        ...rowStyle,
        ...rowVisualStyle
      }
    }

    return bodyData.map((rowData, rowIndex) => {
      const LIElementProps = {
        key: `${container}-list-row${rowData.key ? rowData.key : rowIndex}`,
        className: `list-row${
          rowData.className ? ` ${rowData.className}` : ''
          }${
          transition ? ` ${transitionName}` : ''
          }`,
        style: isVisual && rowIndex % (rowVisualInterval * 2) >= rowVisualInterval
          ? _.defaultsDeep({}, specialRowStyle[rowIndex], rowVisualStyle, rowStyle)
          : _.defaultsDeep({}, specialRowStyle[rowIndex], rowStyle),
        onMouseEnter: this.rowHover,
        onMouseLeave: this.rowHover
      }

      // 检测行数据是一个对象还是一个数组
      // 如果是对象，则需要对行做一些处理，比如添加自定义事件等（目前只支持添加事件）
      if(_.isObject(rowData) && rowData.type === 'row') {
        LIElementProps[rowData.event] = util.handleEvent.bind(null, [rowData])
      }

      return (
        <li {...LIElementProps}>
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
    const { isScroll, header: { style, cellStyle, show: showHeader } } = property
    const {
      cell: { style: { minWidth } },
      row: { serialNumber: { show } }
    } = property.body

    // 处理border属性值
    const listBorder = this.setBorder(cellStyle)

    if(showHeader && data && data.length) {
      return (
        <ul
          className='list-header list-cont'
          style={!isScroll && headerWidth ? { ...style, width: headerWidth } : style}
        >
          <li key='list-row' className='list-row' style={style}>
            {
              data.map((cell, index) => (
                <div
                  className='list-cell'
                  key={`list-header-${index}`}
                  style={{
                    ...cellStyle,
                    width: typeof colWidth === 'string' ? colWidth : (colWidth[index] || 'auto'),
                    minWidth,
                    ...listBorder
                  }}
                >
                  {show && !index ? 'number' : this.parsing(cell, { rowIndex: 0, cellIndex: 0 })}
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
        body: { row: { spacing } },
        isScroll
      }
    } = this.state
    // 处理行间距的值
    const borderSpacing = (`${spacing}`).indexOf('px') === -1 ? `0 ${spacing}px` : `0 ${spacing}`

    return (
      <div
        className='list-body'
        ref={ele => this.scroll = ele}
        style={{
          height: scrollHeight,
          overflow: isScroll ? 'hidden' : 'auto'
        }}
      >
        <ul
          className='list-cont'
          style={{ borderSpacing }}
          ref={ele => this.listContMain = ele}
        >
          {this.setRow(bodyData, 'main')}
        </ul>
        <ul
          className='list-cont'
          style={{ borderSpacing }}
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
        header,
        body: { row: { spacing } },
        style: conStyle
      },
      data,
      className
    } = this.state

    const { show: showHeader } = header

    // 处理border属性值
    const listBorder = this.setBorder(conStyle)

    // 当存在表头数据且表头是开启时处理数据
    let headerData
    let bodyData
    if(showHeader && data.length) {
      [headerData, ...bodyData] = this.fillRow(data)
    } else {
      bodyData = this.fillRow(data)
    }

    const listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing'

    return (
      <div
        style={{ ...listBorder, ...conStyle }}
        className={`list ${className || ''} ${listClass}`}
        onMouseMove={this.scrollList.bind(this, false)}
        onMouseLeave={this.scrollList.bind(this, true)}
      >
        {this.loadHeader(headerData)}
        {this.loadBody(bodyData)}
      </div>
    )
  }
}
