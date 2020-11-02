import _ from 'lodash'
import { getWaringProperty } from './config'
import { CSSProperties, ReactNode, SyntheticEvent } from 'react'
import { TableConfig, TableConfigUnit, TableProperty } from 'types/config'
import { CellWidth } from 'types/decoration'
import {
  BuiltInAttrs,
  Cell,
  ObjectCheckbox,
  ObjectRestAttrs,
  ObjectRow,
  ObjectText,
  ObjectUnit,
  Row
} from 'types/structure'
import { ReactTabllist, TableState } from 'types/list'
import { IsKeyExists } from 'types/waring'

/**
 * 从el元素向上选取第一个selector选择器匹配的元素
 * @param {Element || Node} el DOM元素
 * @param {string} selector 选择器
 * @return {Element} 按照选择器筛选后的元素
 */
export function closest(
  el: HTMLElement,
  selector: string
): HTMLElement | undefined {
  if (el) {
    const matchesSelector = el.matches ||
      el.webkitMatchesSelector ||
      // @ts-ignore
      el.mozMatchesSelector || el.msMatchesSelector

    while (el) {
      if (matchesSelector.call(el, selector)) {
        break
      }
      el = (el.parentNode || el.parentElement) as HTMLElement
    }

    return el
  }
}

/**
 * 设置屏幕滚动区域可见高度
 * @param {object} props Props
 * @param {Element?} listComponent 列表组件实例对象
 * @returns {number} 列表滚动区域可见高度
 */
export function getScrollHeight(
  props: Readonly<any> & Readonly<{ children?: ReactNode; }>,
  listComponent?: Element
): number {
  const {
    header: {show, style},
    style: {height}
  } = props.property

  if (listComponent && window) {
    const {paddingTop, paddingBottom, borderTopWidth, borderBottomWidth} = getComputedStyle(listComponent, null)
    const result = parseInt(height) -
      parseInt(paddingTop || '0px') -
      parseInt(paddingBottom || '0px') -
      parseInt(borderTopWidth || '0px') -
      parseInt(borderBottomWidth || '0px')

    if (show) {
      return result - parseInt(style.height)
    }

    return result
  }

  // 如果启用了表头
  if (show) {
    return parseInt(height) - parseInt(style.height)
  }

  return parseInt(height)
}

/**
 * 获取DOM内每一列单元格的实际宽度
 * @param listContMain 滚动主容器对象
 * @returns {Array} 列表每列的宽度值，数组长度代表列数
 */
export function getColClientWidth(listContMain: HTMLElement): CellWidth[] {
  const widthArr = <CellWidth[]>[]

  if (listContMain && listContMain.children.length) {
    for (let i = 0, l = listContMain.children[0].children; i < l.length; i++) {
      widthArr.push((<HTMLElement>l[i]).offsetWidth || 'auto')
    }
  }

  return widthArr
}

/**
 * 将用户设置的每一列单元格宽度值解析为组件程序需要的值，同时处理不合法数据
 * @param {object} props 组件的props
 * @param {array} data 用于渲染组件的数据
 * @returns {*} 用于渲染每列单元格的宽度值
 */
export function handleColWidth(props: TableConfig, data: Row[]): CellWidth[] | CellWidth {
  /**
   * 转换字符串
   * @param widthValue
   */
  function convertUnit(widthValue: string | number): CellWidth {
    if ((widthValue as string).includes('px')) {
      return `${parseFloat(widthValue as string)}px`
    } else if ((widthValue as string).includes('%')) {
      return `${parseFloat(widthValue as string)}%`
    } else if (+widthValue) {
      return parseFloat(widthValue as string)
    }

    return 'auto'
  }

  /**
   * 处理宽度数组
   * @param width
   */
  function handleWidthArray(width: any[]): CellWidth[] {
    return width.map(o => {
      if (o === 0 || !o) {
        return 'auto'
      } else if (typeof o === 'string') {
        return convertUnit(o)
      }

      return o
    })
  }

  const width = props.property?.body?.cell?.style?.width

  if (Array.isArray(width)) { // 处理数组形式的多列宽度数值
    return handleWidthArray(width)
  } else if (Object.prototype.toString.apply(width) === '[object String]') { // 处理字符串形式的宽度数值
    if ((width as string).includes(',')) {
      return handleWidthArray((width as string).split(',')) // 处理字符串形式的多列宽度数值
    } else if (width === 'avg') { // 处理平均值
      const maxCellNumber = getMaxCellOfRow(data, props)

      if (maxCellNumber > 1) {
        return new Array(maxCellNumber - 1).fill(`${1 / maxCellNumber * 100}%`)
      }
    }
  }

  return 'auto'
}

/**
 * 从原始数据(配置的二维数组)中获取每行的单元格数量（以最多单元格的一行为准）
 * @param data 用于渲染的数据
 * @returns {number}
 */
export function getMaxCellFromData(data: Row[]): number {
  const cellsOfRow: any[] = []

  // 获取每一行的数据量，存入数组 cellsOfRow 内
  _.range(data.length).map(i => {
    // 如果行数据是一个对象，保证该对象内一定有一个cells字段
    if (_.isPlainObject(data[i]) && !(<ObjectRow>data[i]).cells) {
      (<ObjectRow>data[i]).cells = []
    }

    cellsOfRow.push(_.isArray(data[i]) ? (<Cell[]>data[i]).length : (<ObjectRow>data[i]).cells.length)
  })

  // 获取数据量最多的一行的数值
  return Math.max(...cellsOfRow)
}

/**
 * 获取行的单元格数量
 * @param data {array[]} 用于渲染的数据
 * @param props {object} 组件的props
 * @returns {number}
 */
export function getMaxCellOfRow(data: Row[], props: TableConfig): number {
  let maxCellFromData = getMaxCellFromData(data)
  const {serialNumber, rowCheckbox} = props.property!.body!.row!

  if (serialNumber!.show) {
    maxCellFromData++
  }

  if (rowCheckbox!.show) {
    maxCellFromData++
  }

  return maxCellFromData
}

/**
 * 补齐单元格
 * 如果props数据不规范，则自动补齐单元格到缺少的行，直到每一行的单元格数量相等为止
 * @param {object} data 新数据
 * @param {object} state 组件当前状态
 * @returns 补齐后的用于生成单元格的数据
 */
export function fillRow<R extends Row>(data: R[], state: TableState): Row[] {
  /**
   * 生成对象单元插入到行内
   * @param insertedRow 被插入的行
   * @param rowIndex 行索引
   * @returns 插入新对象单元的行数组
   */
  function insertCellToRow<C extends Cell>(insertedRow: C[], rowIndex: number): C[] {
    const rowCheck: ObjectCheckbox = {
      type: 'checkbox',
      text: '',
      key: `rowCheck${rowIndex}`,
      name: 'rowCheckbox'
    }

    const SNCell: ObjectText = {
      type: 'text',
      text: header!.show && rowIndex === 0 ?
        serialNumber!.columnName :
        serialNumber!.formatter!.replace('{index}', String(rowIndex)),
      key: `listSN${rowIndex}`
    }

    const insertList: [ObjectUnit, TableConfigUnit][] = []

    if (rowCheckbox!.column! > serialNumber!.column!) {
      insertList.push([SNCell, serialNumber!])
      insertList.push([rowCheck, rowCheckbox!])
    } else {
      insertList.push([rowCheck, rowCheckbox!])
      insertList.push([SNCell, serialNumber!])
    }

    insertList.forEach(list => {
      if (list[1]!.show) {
        if (Array.isArray(insertedRow)) {
          (<Cell[]>insertedRow).splice(list[1]!.column! - 1, 0, list[0])
        } else {
          (<ObjectRow>insertedRow).cells.splice(list[1].column! - 1, 0, list[0])
        }
      }
    })

    return insertedRow
  }

  /**
   * 处理行数据
   * @param cells 被处理的行
   * @param rowIndex 行索引
   * @returns 处理后的行数据
   */
  function handleRow<C extends Cell>(cells: C[], rowIndex: number): C[] {
    cells = [
      ...cells,
      ...new Array(maxCellValue - cells.length).fill('')
    ]

    return insertCellToRow(cells, rowIndex)
  }

  const {header, body} = state.property!
  const {rowCheckbox, serialNumber} = body!.row!
  const cloneData: R[] = [...data]
  // 获取数据量最多的一行的数值
  const maxCellValue = getMaxCellFromData(cloneData)

  // 根据行的数据结构处理行内数据
  return cloneData.map((row: R, ind: number) => {
    if (Array.isArray(row)) {
      return handleRow(row, ind)
    }

    return {
      ...row,
      cells: handleRow((<ObjectRow>row).cells, ind)
    }
  })
}

/**
 * 组件内部元素的事件处理
 * @param args 处理事件时需要的参数
 * @param event 事件的event参数
 */
export function handleEvent(
  this: ReactTabllist,
  args: [objectUnit?: ObjectUnit, callback?: Function],
  event: SyntheticEvent<HTMLElement>
) {
  event.stopPropagation()

  // 如果对象单元不存在，则调用该函数只为阻止事件冒泡
  if(args?.[0]) {
    event.persist()

    const [_objectUnit, _callback] = args

    /**
     * 如果该对象单元存在内部逻辑，则在调用用户的回调函数之前需要执行组件的内部逻辑
     * 注意：在内部逻辑函数（即当前的_callback函数）内，必须调用`expPropsAndMethods函数`
     */
    if (_callback) {
      _callback(event)
    } else {
      // 没有内部逻辑回调函数，且对象单元存在时，调用`expPropsAndMethods函数`以执行用户的回调函数
      expPropsAndMethods.call(this, _objectUnit, event)
    }
  }
}

/**
 * 给对象单元内的回调函数注入必要的属性和方法，暴露给外界使用
 * @param _objectUnit {ObjectUnit} 渲染组件结构的对象单元
 * @param event event对象
 */
export function expPropsAndMethods(this: ReactTabllist, _objectUnit: ObjectUnit, event: SyntheticEvent) {
  if (_objectUnit.callback && _.isFunction(_objectUnit.callback)) {
    const {scrollTo, props, renderData, state} = this
    const cloneState = {...state}
    delete cloneState.property
    delete cloneState.data
    delete cloneState.className

    _objectUnit.callback(
      {
        scrollTo,
        props,
        state: cloneState,
        renderData
      },
      _objectUnit,
      event
    )
  }
}

/**
 * 在控制台打印警告
 * @param property 用户的配置属性对象
 * @returns 新的property
 */
export function waring<W extends TableProperty>(property: W): W {
  const waringProperty = getWaringProperty()

  /**
   * 检测是否存在过时的属性
   * @param discard 被定义的过时属性
   * @param property 用户配置的property对象
   */
  function isKeyExists(discard: string, property: W): IsKeyExists {
    if (!property || !discard) {
      return {isExist: false}
    }

    // 将传入的对象路径字符串拆分为数组
    const pathList = discard.split('.')

    // 过时属性的路径必须以“property.”开始，且拆分出来的数组元素个数必须大于1
    if (pathList.length < 2 || pathList[0] !== 'property') {
      return {isExist: false}
    }

    // 复制表格配置对象
    let temp: object = {...property}
    // 如果使用了过时的属性，则此变量用来保存用户设置的属性值
    let value

    /// 检测用户的配置对象是否存在警告
    for (let i = 1; i < pathList.length; i++) {
      if (pathList[i] in temp) {
        if (i !== pathList.length - 1) {
          // @ts-ignore
          temp = temp[pathList[i]]

          if (Object.prototype.toString.apply(temp) !== '[object Object]') {
            return {isExist: false}
          }
        } else {
          value = pathList[i]
        }
      } else {
        return {isExist: false}
      }
    }

    return {isExist: true, value}
  }

  /**
   * 将用户使用的过时key赋值到正确的key
   * @param replacement 正确的key
   * @param property 用户定义的整个配置对象
   * @param valueOfDiscard 用户使用的过时key的值
   */
  function createNewProperty(replacement: string | undefined, property: TableProperty, valueOfDiscard: any) {
    if (!replacement) {
      return
    }

    // 将传入的对象路径字符串拆分为数组
    const pathList = replacement.split('.')

    // 替换过时属性，同时配置相对应的属性（如果存在）
    for (let i = 1; i < pathList.length; i++) {
      if (i !== pathList.length - 1) {
        // 确保给定的属性路径是对象的形式，防止报错：获取未定义的对象的属性
        // @ts-ignore
        if (property[pathList[i]] === 'undefined' || !_.isPlainObject(property[pathList[i]])) {
          // @ts-ignore
          property[pathList[i]] = {}
        }

        // @ts-ignore
        property = property[pathList[i]]
      } else {
        // @ts-ignore
        property[pathList[i]] = valueOfDiscard
      }
    }
  }

  waringProperty.map(_obj => {
    const result = isKeyExists(_obj.discard, property)

    if (result.isExist) {
      createNewProperty(_obj.replacement, property, result.value)

      // 非生产模式下打印过时属性警告信息
      if (process.env.NODE_ENV !== 'production') {
        if (_obj.warn) {
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
 * 获取组件每次滚动的距离。
 - 如果值为正整数，单位为`像素`；
 - 为`0`，表示停用滚动，同`scroll.enable:false`；
 - 如果为负整数，则以行为单位进行滚动，行数等于该值的绝对值。
 - 如果为正小数，则向上取整。
 - 如果为负小数，则向下取整。
 - 如果为非数字或，则取`0`。
 * @param type 类型
 * @param distanceConfig {number} 用户设置的滚动距离
 * @param rows {Array} 包含所有行元素的数组
 * @param counter {number} 当前可视区域第一行的索引
 * @returns {number} 处理后的滚动距离
 */
export function getScrollTop(type: string | null, distanceConfig: number, rows: HTMLElement[], counter: number): number {
  if (type === 'switch') {
    return rows[counter].offsetTop - rows[counter].parentElement!.parentElement!.offsetTop
  } else {
    if (isNaN(distanceConfig)) {
      return 0
    } else {
      if (distanceConfig >= 0) {
        return Math.ceil(distanceConfig)
      }

      let nextRow = (counter + 1) * -distanceConfig

      // 当设置一次滚动多行后，如果某一次递增的索引大于了总行数，则直接返回父容器的高度
      // 即接下来的一次滚动直接滚动到主容器最后的位置
      if (nextRow > rows.length - 1) {
        return rows[0].parentElement!.offsetHeight
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
export function getSpeed(targetScrollTop: number, scroll: HTMLElement): number {
  const distance = targetScrollTop - scroll.scrollTop

  if (distance > 0) {
    return Math.ceil(distance / 30)
  } else if (distance < 0) {
    return Math.floor(distance / 30)
  }

  return 1
}

/**
 * 根据props及data获取过渡动画的样式表名
 * @param transition {boolean} 是否开启了过渡动画
 * @param isDataChanged {boolean} 渲染数据是否发生变化
 * @returns {null|string}
 */
export function getTransitionName(transition: boolean, isDataChanged: boolean): string {
  if (transition) {
    if (isDataChanged) {
      return 'list-row-start'
    } else {
      return 'list-row-end'
    }
  }

  return ''
}

/**
 * 获取行的样式
 * 行样式的优先级顺序：row.style < row.visual.style < row.specialStyle < silent.style
 * @param rowState
 * @param event
 */
export function getRowStyle(rowState: Readonly<TableConfig>, event?: SyntheticEvent) {
  const {data, property} = rowState
  const {body, header} = property!
  const {show: headerShow} = header!
  const {row} = body!
  const {style, visual, specialStyle, silent} = row!
  const {show: visualShow, style: visualStyle, interval} = visual!
  const {show: silentShow, style: silentStyle} = silent!

  let rowStyle: CSSProperties[] = []

  _.range(headerShow ? data!.length - 1 : data!.length).map(index => {
    let tempStyle = style

    if (visualShow && interval && !Number.isNaN(interval) && index % (interval * 2) >= interval) {
      tempStyle = {
        ...tempStyle,
        ...visualStyle
      }
    }

    if (specialStyle && _.isArray(specialStyle)) {
      tempStyle = {
        ...tempStyle,
        ...specialStyle[index]
      }
    }

    if (event) {
      const rowElement = closest(<HTMLElement>event.target, '.list-row')
      const rowIndex = Array.prototype.indexOf.call(rowElement!.parentNode!.childNodes, rowElement)

      if (!silentShow && index === rowIndex && event.type === 'mouseenter') {
        tempStyle = {
          ...tempStyle,
          ...silentStyle
        }
      }
    }

    rowStyle.push(tempStyle!)
  })

  return rowStyle
}

/**
 * 处理css属性‘border-collapse’与‘border-spacing’的值
 * @param spacing {number|string} 行间距
 */
export function getListContStyle(spacing: string | number): {
  borderCollapse: CSSProperties['borderCollapse']
  borderSpacing: CSSProperties['borderSpacing']
} {
  if (!spacing || !parseInt(String(spacing))) {
    return {
      borderCollapse: 'collapse',
      borderSpacing: '0px'
    }
  }

  return {
    borderCollapse: 'separate',
    borderSpacing: `${spacing}`.includes('px') ? `0 ${spacing}` : `0 ${spacing}px`
  }
}

/**
 * 处理自定义对象单元的内置属性（剔除内置属性）
 *
 * 为了更方便的在组件内部处理各种原生组件的属性，设置了一系列的内置属性，这些属性不会暴露给外界谁用
 * @param objectUnit {ObjectUnit} 对象单元
 * @returns {{attrs: *, builtInAttrs: {}}}
 *    builtInAttrs: 内置属性集合
 *    attrs: 剔除内置属性后的属性集合
 */
export function handleBuiltInAttributes<T extends ObjectUnit>(objectUnit: T): {
  builtInAttrs: BuiltInAttrs<T>,
  attrs: ObjectRestAttrs<T>
} {
  // @ts-ignore
  const {type, text, event, eventHandler, callback, cells, data, option, ...attrs} = objectUnit
  let builtInAttrs = {type, text, event, eventHandler, callback, cells, data, option}

  // 确保内置属性有真值
  const built: BuiltInAttrs<T> = Object.entries(builtInAttrs).reduce((object, attr) => {
    if (attr?.[1]) {
      return {
        ...object,
        [attr[0]]: attr[1]
      }
    }

    return object
  }, {} as BuiltInAttrs<T>)

  return {
    builtInAttrs: built,
    attrs
  }
}

/**
 * 生成ID和key。如果未定义key，则key的值与新生成的id相同。
 * @param key {string} 唯一标识符
 * @param type {string} 单元格类型
 * @returns {{id: string, key: string}} 包含新生成的ID和key的对象
 */
export function generateIdAndKeyForTag(type: string, key?: string): { id: string; key: string } {
  const id = `rt-${type}-${(Math.random() * Math.pow(10, 10)).toFixed(0)}`

  if (key) {
    return {
      key,
      id
    }
  }

  return {
    id,
    key: id
  }
}
