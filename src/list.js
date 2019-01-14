/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 列表/表格 组件
 * @Date: 2018-10-08 17:56:19
 * @history
 *    2.0 正式版
 *    3.0 加入 checkbox/radio/a/button，在数据里面定义对象的type字段为指定值即可；react 依赖 v16.4+
 *    3.1 加入行序号功能
 *    3.2 加入单元格点击事件
 *    3.3 加入数据更新时的动画
 * @LastModified: Oceanxy（xieyang@hiynn.com）
 * @LastModifiedTime: 2019-01-02 14:52:40
 */

import _ from 'lodash'
import React, { Component } from 'react'
import './index.scss'
import * as util from './util'

export default class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 每列单元格的宽度数组
      colWidth: util.setColWidth(props.property.list.body.cell.style.width),
      // body可见区域的高度
      scrollHeight: util.setScrollHeight(props),
      // 复选框、单选框等标签的状态
      selected: {},
      // 列表行缓动动画的样式名
      transitionName: '',
      // 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同
      // 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
      headerWidth: 0
    }
  }

  static getDerivedStateFromProps(props, state) {
    // 以下值由props控制
    const { data, property } = props
    const { transition } = property.list.body.row
    const propsUpdate = { data, property }

    // 以下值由list组件本身控制
    const {
      colWidth,
      scrollHeight,
      selected,
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
      selected,
      transitionName,
      headerWidth
    }

    const { width } = property.list.body.cell.style
    // 由props和state同时控制的colWidth
    if(stateProperty && width !== stateProperty.list.body.cell.style.width) {
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
  componentDidUpdate = (preProps, preState) => {
    const colWidth = this.getColClientWidth()

    if(colWidth.length) {
      const {
        width: colCellWidth,
        minWidth: cellMinWidth
      } = this.props.property.list.body.cell.style
      const {
        width: preColCellWidth,
        minWidth: preCellMinWidth
      } = preProps.property.list.body.cell.style
      const {
        property: {
          style: { width: conWidth, height },
          list: { header: { show }, body, isScroll }
        },
        transitionName
      } = this.state
      const {
        style: { width: preConWidth, height: preHeight },
        list: { body: preBody, header: { show: preShow } }
      } = preState.property
      const { width: iconWidth } = body.cell.iconStyle
      const { width: preIconWidth } = preBody.cell.iconStyle
      const { transition } = body.row

      // 当滚动条显示时，重新计算header的宽度，和列表主体对齐
      if(show && !isScroll) {
        this.setState({ headerWidth: this.list1.clientWidth })
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
      list1,
      list2,
      state: { scrollHeight, property: { list: { isScroll, speed } } }
    } = this

    if(list1 && list2) {
      // 删除上一次定时器，后续根据状态来判定是否定义新的定时器
      clearInterval(this.marqueeInterval)

      if(isInnerScroll || isInnerScroll === undefined) {
        // 检测滚动条件
        // 根据滚动条件控制列表主体容器的辅助容器的显示状态
        if(isScroll && list1.clientHeight >= parseInt(scrollHeight)) {
          if(isInnerScroll !== undefined && e.type === 'mouseleave') {
            this.pause = false
          }
          if(!this.pause) {
            for(let i = 0; i < list2.children.length; i++) {
              list2.children[i].style.display = 'table-row'
            }

            // 设置定时器，实现列表滚动
            this.marqueeInterval = setInterval(this.marquee, speed)
          }
        } else {
          for(let i = 0; i < list2.children.length; i++) {
            list2.children[i].style.display = 'none'
          }
        }
      }
    }
  }

  /**
   * 鼠标事件
   * 目前只实现了hover效果
   * @param {object} e event
   */
  hover = (e) => {
    const { silent: { show, style } } = this.state.property.list.body.row
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
   * @param {object} target 点击的input对象
   */
  checkCR = ({ target }) => {
    const { selected, data: { json }, property } = this.state
    const { show: showHeader } = property.list.header
    const selectedCur = selected
    const index = target.getAttribute('data-index')
    let targetName = target.name

    this.pause = true

    // 检测是否点击的标题栏的checkbox 且是否开启显示表头
    if(target.name === 'rowCheckBox' && index === '0' && showHeader) {
      selectedCur[targetName] = new Array(json.length).fill(target.checked)
    } else {
      // 检测是否是radio。radio需要处理一下this.state.selected里与之对应的name属性
      if(target.type === 'radio') {
        targetName = targetName.substring(0, targetName.indexOf('-'))
      }

      // 检测this.state.selected里与之对应的数组是否存在，否则初始化一个空数组
      // 而radio因为是单选按钮，决定了state数组里面有且仅有一个值为true，所以每次都初始化为空数组
      if(!selectedCur[targetName] || target.type === 'radio') {
        selectedCur[targetName] = []
      }

      // 将处理后的state数组赋值
      selectedCur[targetName][index] = target.checked

      // 如果触发的是每一行的行选择框且header的状态为开启，则检测是否body里面的每行都选中了
      // 根据此状态来给header里面的复选框加状态（全选/全不选）
      if(targetName === 'rowCheckBox' && showHeader) {
        if(json.length === selectedCur[targetName].length) {
          for(let i = 1, k = selectedCur[targetName].length; i < k; i++) {
            if(!selectedCur[targetName][i]) {
              selectedCur[targetName][0] = false
              break
            }
            if(i === json.length - 1) {
              selectedCur[targetName][0] = true
            }
          }
        } else {
          selectedCur[targetName][0] = false
        }
      }
    }

    this.setState({
      selected: selectedCur
    })
  }

  /**
   * 获取DOM内每一列单元格的实际宽度
   * @returns {Array} 列表每列的宽度值，数组长度代表列数
   */
  getColClientWidth = () => {
    const { list1, props } = this
    const { borderWidth } = props.property.list.border
    const width = []

    if(list1 && list1.children.length) {
      for(let i = 0, l = list1.children[0].children; i < l.length; i++) {
        width.push(l[i].clientWidth - parseInt(borderWidth) || 0)
      }
    }

    return width
  }

  /**
   * 列表滚动实现
   */
  marquee = () => {
    const { list1, scroll } = this

    if(list1 && scroll) {
      scroll.scrollTop++

      // 滚动完一个完整周期后立即重置滚动区域的scrollTop值为0
      if(list1.clientHeight <= scroll.scrollTop) {
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
    const { row: { rowCheckBox, serialNumber } } = this.state.property.list.body

    // 获取每一行的数据量，存入数组 cellsOfRow 内
    _.range(data.length).map(i => {
      cellsOfRow.push(data[i].length)
    })

    // 获取数据量最多的一行的数值
    const maxCellValue = Math.max(...cellsOfRow)
    const newData = []

    // 补齐空数据到缺失的行
    data.forEach((row, ind) => {
      newData[ind] = [
        ...data[ind],
        ...new Array(maxCellValue - data[ind].length).fill('')
      ]

      // 检测是否开启行选择功能
      if(rowCheckBox) {
        newData[ind].unshift({
          type: 'checkbox',
          text: '',
          uid: `ck${ind}`,
          name: 'rowCheckBox'
        })
      }

      // 检测是否开启行序号功能
      if(serialNumber.show) {
        newData[ind].unshift(serialNumber.formatter)
      }
    })

    return newData
  }

  /**
   * 设置单元格图标
   * @param {object} icon icon对象
   * @returns {*} 单元格图标DOM || null
   */
  setCellIcon(icon) {
    if(icon) {
      const { iconStyle } = this.state.property.list.body.cell

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
          <img src={icon.src} alt={icon.alt || ''} style={iconStyle} key={Math.random()} />,
          <span key={Math.random()}>{icon.text || ''}</span>
        ]
      }
    }

    return null
  }

  /**
   * 设置单元格link(链接)
   * @param {object} link link对象
   * @returns {*} 单元格link DOM || null
   */
  setCellLink = (link) => {
    const {
      text,
      callback,
      data,
      ...props
    } = link

    delete props.type

    if(link) {
      if(props.href) {
        return (
          <a {...props} >{text}</a>
        )
      }

      props.href = 'javascript: void(0)'

      if(props.event) {
        props[props.event] = event => {
          const list = util.closest(event.target, '.list')
          if(_.isFunction(callback)) {
            callback(data, list, event)
          }
        }

        delete props.event
      }

      return (
        <a {...props} >{text}</a>
      )
    }

    return null
  }

  /**
   * 设置单元格checkbox或radio
   * @param {object} cr cr对象
   * @param {number} rowIndex 所在行的索引
   * @param {string?} container 当前渲染元素所在的容器
   * @returns {*} 单元格checkbox或radio || null
   */
  setCellInput(cr, rowIndex, container) {
    const { selected } = this.state
    const selectedCur = selected[cr.name] || []

    if(cr.type === 'radio' && !container) {
      /* eslint-disable no-console */
      console.error('当input为radio时，setCellInput()的第三个参数“container”为必需参数，否则radio功能将失效！')
      return null
    }

    if(cr) {
      if(cr.type === 'radio' || cr.type === 'checkbox') {
        return (
          <label key={Math.random()}>
            <input
              type={cr.type}
              data-id={cr.uid}
              data-index={rowIndex}
              name={cr.type === 'radio' ? `${cr.name}-${container}` : cr.name}
              defaultChecked={selectedCur[rowIndex]}
              onInput={this.checkCR}
            />
            {cr.text ? <span>{cr.text}</span> : null}
          </label>
        )
      }

      // button 等会执行以下代码
      return (
        <input
          type={cr.type}
          data-id={cr.uid}
          data-index={rowIndex}
          value={cr.value}
          onClick={cr.callback.bind(this, cr)}
        />
      )
    }

    return null
  }

  /**
   * 解析数据里面的对象
   * @param {object} cellData 需要解析的单元格数据
   * @param {number} rowIndex 需要解析的单元格数据所在行的索引
   * @param {string?} container 当前渲染单元格所在的容器
   * @returns {*} 单元格数据或DOM
   */
  parsing(cellData, rowIndex, container) {
    if(Array.isArray(cellData)) {
      return cellData.map((o, i) => this.parsing(o, i, container))
    }

    if(typeof cellData === 'object') {
      switch (cellData.type) {
        case 'img':
          return this.setCellIcon(cellData)
        case 'link':
          return this.setCellLink(cellData)
        case 'radio':
          return this.setCellInput(cellData, rowIndex, container)
        case 'checkbox':
          return this.setCellInput(cellData, rowIndex)
        case 'button':
          return this.setCellInput(cellData, rowIndex)
        default:
          return null
      }
    }

    return cellData
  }

  /**
   * 设置边框
   * 检测空值则使用全局配置，而不是设置为无边框
   * @param {object} borderStyle 含有边框属性的对象
   * @returns {object} 返回包含border及其相关属性的对象
   */
  setBorder(borderStyle) {
    const { border } = this.state.property.list
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
   * 加载列表头
   * @param {array} data 列表头数据
   * @returns {*} 列表头DOM
   */
  loadHeader(data) {
    const { property, colWidth } = this.state
    const { style, cellStyle } = property.list.header
    const {
      cell: { style: { minWidth } },
      row: { serialNumber: { show } }
    } = property.list.body

    // 处理border属性值
    const listBorder = this.setBorder(cellStyle)

    if(data && data.length) {
      return (
        <li key='list-row' className='list-row' style={style}>
          {
            data.map((cell, index) => (
              <div
                className='list-cell'
                key={index}
                style={{
                  ...cellStyle,
                  width: typeof colWidth === 'string' ? colWidth : (colWidth[index] || 'auto'),
                  minWidth,
                  ...listBorder
                }}
              >
                {show && !index ? '序号' : this.parsing(cell, 0)}
              </div>
            ))
          }
        </li>
      )
    }

    return null
  }

  /**
   * 加载列表主体
   * @param {array} bodyData 列表主体数据
   * @param {string} container 当前所在容器的名称
   * @returns {*} 列表主体DOM
   */
  loadBody(bodyData, container) {
    const { colWidth, property, transitionName } = this.state
    const { body } = property.list

    const {
      row: {
        transition,
        style: rowStyle,
        specialStyle: specialRowStyle,
        visual: { show: rowVisualShow, interval: rowVisualInterval },
        serialNumber: { show: serialNumberShow, style: serialNumberStyle, specialStyle }
      },
      cellOfColumn: { style: cellOfColumnStyle },
      cell: { style }
    } = body

    // 处理border属性值
    const listBorder = this.setBorder(style)

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
      return (
        <li
          className={`list-row ${transition ? transitionName : ''}`}
          key={rowIndex}
          style={
            isVisual && rowIndex % (rowVisualInterval * 2) >= rowVisualInterval
              ? { ...rowVisualStyle, ...specialRowStyle[rowIndex] }
              : { ...rowStyle, ...specialRowStyle[rowIndex] }
          }
          onMouseEnter={this.hover}
          onMouseLeave={this.hover}
        >
          {
            rowData.map((cellData, index) => {
              return (
                <div
                  className='list-cell'
                  style={
                    serialNumberShow && !index
                      // 如果开启行序号，且为每行第一个单元格
                      ? {
                        ...style,
                        width: typeof colWidth === 'string' ? colWidth : (colWidth[index] || 'auto'),
                        ...serialNumberStyle,
                        ...specialStyle[rowIndex],
                        ...cellOfColumnStyle[index],
                        ...listBorder
                      }
                      // 未开启行序号或不为行内第一个单元格
                      : {
                        ...style,
                        width: typeof colWidth === 'string' ? colWidth : (colWidth[index] || 'auto'),
                        ...specialStyle[rowIndex],
                        ...cellOfColumnStyle[index],
                        ...listBorder
                      }
                  }
                  key={`${rowIndex}${index}`}
                >
                  {
                    serialNumberShow && index === 0
                      ? typeof cellData === 'string' ? cellData : cellData.text.replace('{index}', rowIndex + 1)
                      : this.parsing(cellData, rowIndex + 1, container)
                  }
                </div>
              )
            })
          }
        </li>
      )
    })
  }

  /**
   * 渲染 DOM 结构
   * @returns {*} 组件DOM
   */
  render() {
    const {
      scrollHeight,
      headerWidth,
      property: {
        style: conStyle,
        list: { header, body, isScroll }
      },
      data
    } = this.state

    const { show: showHeader, style: headerStyle } = header

    // 处理行间距的值
    const { spacing } = body.row
    const borderSpacing = (`${spacing}`).indexOf('px') === -1 ? `0 ${spacing}px` : `0 ${spacing}`

    // 处理border属性值
    const listBorder = this.setBorder(conStyle)

    // 当存在表头数据且表头是开启时处理数据
    let headerData
    let bodyData
    if(showHeader && data.length) {
      [headerData, ...bodyData] = data
    } else {
      bodyData = data
    }

    const listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing'

    return (
      <div
        style={{ ...listBorder, ...conStyle }}
        className={`list ${listClass}`}
        onMouseMove={this.scrollList.bind(this, false)}
        onMouseLeave={this.scrollList.bind(this, true)}
      >
        {
          showHeader
            ? (
              <ul
                className='list-header list-cont'
                style={!isScroll && headerWidth ? { ...headerStyle, width: headerWidth } : headerStyle}
              >
                {this.loadHeader(headerData)}
              </ul>
            )
            : null
        }
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
            ref={ele => this.list1 = ele}
          >
            {this.loadBody(bodyData, 'main')}
          </ul>
          <ul
            className='list-cont'
            style={{ borderSpacing }}
            ref={ele => this.list2 = ele}
          >
            {this.loadBody(bodyData, 'support')}
          </ul>
        </div>
      </div>
    )
  }
}
