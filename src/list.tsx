import _ from 'lodash'import React, { ChangeEvent, CSSProperties, MouseEvent, SyntheticEvent } from 'react'import config from './config'import './index.scss'import * as util from './util'import { ReactTabllist, RowCheckedState, TableState } from 'types/list'import { TableConfig } from 'types/config'import {  BuiltInAttrs,  Cell,  ObjectButton,  ObjectCheckbox,  ObjectImg,  ObjectInput,  ObjectLink,  ObjectRadio,  ObjectRestAttrs,  ObjectRow,  ObjectSelect,  ObjectText,  ObjectUnit,  Row} from 'types/structure'export default class extends ReactTabllist {  constructor(props: TableConfig) {    super(props)    this.state = {      colWidth: [],      scrollHeight: util.getScrollHeight(props),      selected: {rowCheckbox: []},      indeterminate: false,      headerWidth: 0,      transitionName: '',      rowStyle: [],      property: config.property,      data: config.data,      className: config.className    }    this.rowIndex = 0  }  static getDerivedStateFromProps(props: TableConfig, state: TableState) {    let {property, data: stateData, className, ...restState} = state    const {property: propsProperty, data: propsData, className: propsClassName} = props    const isDataChanged = !_.isEqual(propsData, stateData)    // 检测本次渲染的数据是否有变化    if (!_.isEqual(propsProperty, property) || !_.isEqual(propsClassName, className) || isDataChanged) {      const {height: propsHeight} = props.property!.style!      const {height: stateHeight} = property!.style!      const {width: propsCellWidth} = props.property!.body!.cell!.style!      const {width: stateCellWidth} = property!.body!.cell!.style!      const {row} = props.property!.body!      const transitionName = property!.body!.row!.transition ?        util.getTransitionName(row!.transition!, isDataChanged) :        state.transitionName      return {        ...restState,        ...props,        transitionName,        rowStyle: util.getRowStyle(props),        colWidth: propsCellWidth !== stateCellWidth ? util.handleColWidth(props, propsData!) : state.colWidth,        scrollHeight: propsHeight !== stateHeight ? util.getScrollHeight(props) : state.scrollHeight      }    }    // 如果props未更新属性，则返回state。此state已包含setState更新的值。    return state  }  /**   * 组件挂载后执行组件的滚动操作和设置表头单元格和主体单元格宽度对应   */  componentDidMount() {    const {scroll, props, listContMain} = this    const colWidth = util.getColClientWidth(listContMain)    // 如果列数为0，则停止后续操作    if (colWidth.length) {      // 组件第一次render之后，DOM结构已经生成，此时开始设置每个单元格宽度以及组件滚动区域高度      // width设置规则以props里面的width字段为准，详情见width字段说明      const scrollHeight = util.getScrollHeight(props, util.closest(scroll, '.list'))      this.setState({colWidth, scrollHeight})      // 列表滚动相关逻辑入口      this.scrollList.bind({})      // 检测浏览器当前标签页是否被激活，否则暂停滚动动画（如果启用了组件滚动）      document.addEventListener('visibilitychange', () => {        if (document.hidden) {          this.scrollList(false)        } else {          this.scrollList(true)        }      })    }  }  /**   * 组件每次更新后执行   * @param {object} preProps prev props   * @param {object} preState prev state   */  componentDidUpdate(preProps: Readonly<TableConfig>, preState: Readonly<TableConfig>) {    const {listContMain, props, scroll} = this    const colWidth = util.getColClientWidth(listContMain)    if (colWidth.length) {      const {width: colCellWidth, minWidth: cellMinWidth} = props.property!.body!.cell!.style      const {width: preColCellWidth, minWidth: preCellMinWidth} = preProps.property!.body!.cell!.style      const {        property: {          style: {width: conWidth, height},          scroll: {enable},          header: {show},          body        },        transitionName,        indeterminate      }: any = this.state      const {        body: preBody,        header: {show: preShow},        style: {width: preConWidth, height: preHeight}      }: any = preState.property      const {cell, row} = body      const {width: iconWidth} = cell.iconStyle      const {width: preIconWidth} = preBody.cell.iconStyle      const {transition, rowCheckbox: {show: rowCheckboxShow}} = row      // 当滚动条显示时，重新计算header的宽度，和列表主体对齐      if (show && !enable && !_.isEqual(this.state, preState)) {        this.setState({headerWidth: this.listContMain.clientWidth})      }      // 适应单元格宽度，用于组件自身状态或从父级传递的props发生变化时      if (        preConWidth !== conWidth ||        iconWidth !== preIconWidth ||        colCellWidth !== preColCellWidth ||        cellMinWidth !== preCellMinWidth      ) {        // 避免css动画未执行完时获取的列宽不正确，400为css动画的持续时间，见index.scss文件        setTimeout(() => {          /**           * 组件更新之后，DOM结构已更新，此时重新设置每个单元格宽度           * 设置规则以props里面的width字段为准           * 详情见width字段说明           */          this.setState({colWidth})        }, colCellWidth === 'avg' ? 400 : 0)      }      // 适应滚动区域高度      if (parseInt(preHeight) !== parseInt(height) || preShow !== show) {        this.setState(prevState => ({          scrollHeight: util.getScrollHeight(prevState, util.closest(scroll, '.list'))        }))      }      // 缓动动画      if (transition) {        if (!transitionName) {          this.setState({transitionName: util.getTransitionName(transition, true)})        } else if (transitionName === 'list-row-start') {          this.setState({transitionName: util.getTransitionName(transition, false)})        }      }      // 设置列表头行选择框的indeterminate      // 如果开启了行选择功能且显示表头，根据每行的选择情况设置标题栏多选框的indeterminate状态      if (show && rowCheckboxShow) {        const checkboxEl = this.scroll.parentNode!.querySelector('.list-header input[name=rowCheckbox]')! as HTMLInputElement        checkboxEl.indeterminate = indeterminate      }      // 列表滚动相关逻辑入口      this.scrollList()    }  }  componentWillUnmount() {    clearInterval(this.marqueeInterval)  }  /**   * 列表滚动处理   *   * 调用方法: scrollList.call(this, isInnerScroll)   * @param {boolean} isInnerScroll 内部滚动变量（用于事件控制）   * @param event 鼠标事件回传的event参数   */  scrollList = (isInnerScroll?: boolean) => (event: MouseEvent) => {    const {      listContMain,      listContSupport,      state: {scrollHeight, property: {scroll: {enable}}}    }: any = this    // 检测实现滚动的主容器和辅助容器是否存在    if (listContMain && listContSupport) {      // 删除上一次定时器，后续根据状态来判定是否定义新的定时器      clearInterval(this.marqueeInterval)      if (isInnerScroll || isInnerScroll === undefined) {        // 检测滚动条件        // 根据滚动条件控制辅助容器的显示状态        if (enable && listContMain.clientHeight >= parseInt(scrollHeight)) {          if (isInnerScroll !== undefined && event?.type === 'mouseleave') {            // 鼠标移出组件，恢复滚动            this.pause = false          }          if (!this.pause) {            for (let i = 0; i < listContSupport.children.length; i++) {              listContSupport.children[i].style.display = 'table-row'            }            // 调用滚动逻辑            this.marquee()          }        } else {          for (let i = 0; i < listContSupport.children.length; i++) {            listContSupport.children[i].style.display = 'none'          }        }      }    }  }  /**   * 列表滚动实现   */  marquee = () => {    const {      state: {        property: {scroll: {enable, speed, distance}}      },      listContMain,      scroll    }: any = this    // 设置定时器，实现列表滚动    if (listContMain && enable) {      this.marqueeInterval = setInterval(() => {        let scrollOffsetTop = util.getScrollTop(null, distance, listContMain.children, this.rowIndex)        if (distance < 0) {          this.scrollTo(NaN, scrollOffsetTop)        } else {          scroll.scrollTop += scrollOffsetTop          this.checkScrollDistance()        }      }, speed)    }  }  /**   * 滚动到{rowIndex}行   * @param rowIndex {number} 行索引。如果此值为假值，则使用第二个参数targetScrollTop   * @param targetScrollTop {number} 滚动到的值   */  scrollTo = (rowIndex: number, targetScrollTop: number) => {    const {      state: {        property: {scroll: {distance}}      },      listContMain,      scroll    }: any = this    if (!isNaN(rowIndex) && rowIndex > 0) {      targetScrollTop = util.getScrollTop('switch', 0, listContMain.children, rowIndex)    } else if (rowIndex === 0) {      targetScrollTop = 0    }    // 时间恒定，根据需要移动的总距离求速度    const perIntervalMoveDistance = util.getSpeed(targetScrollTop, scroll)    // 设置按次滚动定时器    const marqueeIntervalRow = setInterval(() => {      // 组件移动一次      if (targetScrollTop !== scroll.scrollTop) {        let nextScrollDistance        // 检测滚动目标值与当前的scrollTop值的差距是否大于每次速度值        // 否则本次速度值按二者之间的差值计算        if (Math.abs(targetScrollTop - scroll.scrollTop) >= Math.abs(perIntervalMoveDistance)) {          nextScrollDistance = perIntervalMoveDistance        } else {          nextScrollDistance = targetScrollTop - scroll.scrollTop        }        // 当滚动目标值小于当前的scrollTop值时        // 检测scrollTop值是否达到临界值        // 如果是则当到达主容器高度临界值时重置scrollTop值并进入下一次滚动        // 直到滚动到目标值为止        scroll.scrollTop += nextScrollDistance      } else {        if (!isNaN(rowIndex) && rowIndex >= 0) {          if (++rowIndex > (listContMain.children.length - 1) / -distance) {            this.rowIndex = 0          } else {            this.rowIndex = rowIndex - 1          }        } else {          if (++this.rowIndex > (listContMain.children.length - 1) / -distance) {            this.rowIndex = 0          }        }        // 检测滚动边界        this.checkScrollDistance()        // 当次滚动结束        clearInterval(marqueeIntervalRow)      }    }, 4)  }  /**   * 检测主容器是否滚动完一个周期立即重置scrollTop值   */  checkScrollDistance = () => {    const {listContMain, scroll} = this    if (listContMain.clientHeight <= scroll.scrollTop) {      scroll.scrollTop = scroll.scrollTop - listContMain.clientHeight    }  }  /**   * 行hover事件   * @param {SyntheticEvent} e event   */  rowHover = (e: SyntheticEvent) => {    e.stopPropagation()    e.persist()    this.setState(prevState => ({rowStyle: util.getRowStyle(prevState, e)}))  }  /**   * 复选框和单选按钮事件   * @param {ObjectUnit} cr checkbox或radio对象单元   * @param {ChangeEvent<HTMLInputElement>>} event change事件的event参数   */  checkCR = function (this: ReactTabllist, cr: ObjectUnit, event: ChangeEvent<HTMLInputElement>) {    const {target} = event    const {selected, data, property} = this.state    const selectedCur: RowCheckedState = {...selected}    let targetName = target.name    let {indeterminate} = this.state    // 列表滚动控制（暂停/继续滚动）    this.pause = true    // 检测组件内部状态（state.selected）里与之对应的数组是否存在，否则初始化一个空数组    // 由于radio是单选按钮，决定了state数组里面有且仅有一个值来表示被选中的按钮，所以每次都初始化为空数组    if (target.type === 'radio') {      // 检测对象单元是否是radio。是则需要处理一下state.selected里与之对应的name属性，保持name属性唯一      targetName = targetName.substring(0, targetName.lastIndexOf('-'))      if (!selectedCur[targetName]) {        selectedCur[targetName] = []      }      // 将处理后结果赋值给state      selectedCur[targetName][0] = target    }    // 检测是否点击的是表头的checkbox，且是否启用表头    else if (target.type === 'checkbox') {      // 检测是否是行选择框      if (target.name === 'rowCheckbox') {        const {show: showHeader} = property!.header!        // 获取列表内所有的行选择框        const rowCheckboxes = this.scroll.parentNode!.querySelectorAll('[name=\'rowCheckbox\']')        // 当启用表头时，点击表头的行选择框        if (showHeader && _.isEqual(rowCheckboxes[0], target)) {          indeterminate = false          selectedCur[targetName] = new Array(data!.length).fill(target)        } else {          /* 触发非表头的行选择框 */          // 获取触发的行选择框所在行的索引          const clickedActualIndex = _.findIndex(rowCheckboxes, target)          // 如果点击的是辅助容器内的行选择框，则对应到主容器内的行选择框的索引。          const mainIndex = clickedActualIndex >= data!.length            ? clickedActualIndex - data!.length + (showHeader ? 1 : 0) // 处理显示表头和不显示表头的情况            : clickedActualIndex          // 将处理后结果赋值给state          selectedCur[targetName][mainIndex] = target          // 每次触发body内的行选择框时都检查一次所有行选择框的状态          const rowCheckboxSelectedQuantity = _.compact(selectedCur[targetName].map(chk => chk.checked)            .slice(1)).length          // body内行选择框未全选中          if (rowCheckboxSelectedQuantity !== data!.length - 1) {            selectedCur[targetName][0] = {checked: false}            indeterminate = rowCheckboxSelectedQuantity > 0          } else {            selectedCur[targetName][0] = {checked: true}            indeterminate = false          }        }      } else {        /* 非行选择框 */        if (!selectedCur[targetName]) {          selectedCur[targetName] = []        }        // 获取同一单元格内相同name的复选框        const checkboxes = this.listContMain.querySelectorAll(`[name='${targetName}']`)        // 获取触发的checkbox的索引        const clickedIndex = _.findIndex(checkboxes, target)        // 将处理后结果赋值给state        selectedCur[targetName][clickedIndex] = target      }    }    this.setState(      () => ({        indeterminate,        selected: selectedCur      }),      () => util.expPropsAndMethods.call(this, cr, event)    )  }  /**   * 设置单元格图标   * @param {object} ci icon对象   */  setCellImage = (ci: ObjectImg) => {    const {iconStyle} = this.state.property!.body!.cell!    const {builtInAttrs, attrs} = util.handleBuiltInAttributes(ci)    const {src} = attrs    const {id, key} = util.generateIdAndKeyForTag(builtInAttrs.type, attrs.key)    if (      src?.indexOf('http://') !== -1 ||      src?.indexOf('https://') !== -1 ||      src?.indexOf('data:image/') !== -1    ) {      return (        <label htmlFor={id} key={key} style={iconStyle} className="list-cell-img">          <img            id={id}            alt={attrs.alt || id}            {...attrs}          />          {ci.text ? <span>{ci.text}</span> : null}        </label>      )    }  }  /**   * 设置单元格link(链接)   * @param {object} cl link对象   */  setCellLink = (cl: ObjectLink) => {    const {builtInAttrs, attrs} = util.handleBuiltInAttributes(cl)    const {text, event, type} = builtInAttrs    let tagProps = {      ...util.generateIdAndKeyForTag(type, attrs.key),      ...attrs    }    // 如果存在href属性，则不再另行添加事件    if (attrs.href) {      tagProps = {        ...tagProps,        onClick: util.handleEvent.bind(this, []) // 此函数是为了防止事件冒泡      }    } else {      tagProps = {        ...tagProps,        [event ? event : 'onClick']: util.handleEvent.bind(this, [cl])      }    }    return (      <a {...tagProps}>{text}</a>    )  }  /**   * 设置单元格checkbox、radio、input或button   * @param {ObjectRadio | ObjectCheckbox | ObjectInput | ObjectButton} cr radio对象单元或checkbox对象单元   * @param {number?} rowIndex 所在行的索引   * @param {number?} cellIndex 所在单元格的索引   * @param {number?} index 当前索引   * @param {'main' | 'support' | undefined} container 当前渲染元素所在的容器   * @returns {*} 单元格checkbox或radio || null   */  setCellInput = (    cr: ObjectRadio | ObjectCheckbox | ObjectInput | ObjectButton,    {      rowIndex,      cellIndex,      index    }: {      rowIndex?: number,      cellIndex?: number,      index?: number    },    container?: 'main' | 'support'  ): any => {    let tagProps    const {builtInAttrs, attrs} = util.handleBuiltInAttributes(cr)    if (cr.type === 'button') {      tagProps = {        [cr.event ? cr.event : 'onClick']: util.handleEvent.bind(this, [cr]),        ...util.generateIdAndKeyForTag('button', attrs.key),        ...attrs      } as ObjectRestAttrs<ObjectButton>      return <input {...tagProps} />      // } else if (cr.type === 'input') {    } else if (cr.type === 'input') {      const {event, text} = builtInAttrs as BuiltInAttrs<ObjectInput>      const {id, key} = util.generateIdAndKeyForTag('input', attrs.key)      tagProps = {        [event ? event : 'onClick']: util.handleEvent.bind(this, [cr]),        id,        ...attrs,        type: 'text' // 组件内部定义的`type=input`与原生的`type=text`冲突，所以这里要重置为原生的值      } as ObjectRestAttrs<ObjectInput>      return (        <label htmlFor={tagProps.id} className="list-cell-input" key={key}>          {text ? <span>{text + ' '}</span> : ''}          <input {...tagProps} />        </label>      )    } else { // checkbox or radio      const {event, type, text} = builtInAttrs as BuiltInAttrs<ObjectCheckbox | ObjectRadio>      const {value, name} = attrs as ObjectRestAttrs<ObjectRadio | ObjectCheckbox>      const {selected} = this.state      const selectedCur = selected?.[name] ?? []      const {id, key} = util.generateIdAndKeyForTag(type, attrs.key)      // 处理标签属性      tagProps = {        id,        type,        ...attrs,        value: value !== undefined          ? value          : (            name === 'rowCheckbox'              ? `rowChk-${rowIndex}`              : `react-tabllist-value-${rowIndex}-${cellIndex}-${index}`          ),        name: type === 'radio' ? `${name}-${container}` : name,        className: `${          type === 'radio'            ? 'list-cell-radio'            : 'list-cell-chk'        }${          attrs.className            ? ` ${attrs.className}`            : ''        }`      } as ObjectRestAttrs<ObjectRadio | ObjectCheckbox>      // 处理选中状态      let tempIndex      if (type === 'checkbox') {        // 复选框保存被选中框的索引        if (name === 'rowCheckbox') {          tempIndex = rowIndex        } else {          tempIndex = index        }        (tagProps as ObjectCheckbox).checked = !!(selectedCur[tempIndex!] && selectedCur[tempIndex!].checked)      } else if (type === 'radio') {        // 单选按钮保存被选中按钮的key值        (tagProps as ObjectRadio).checked = !!(selectedCur[0] && selectedCur[0].name.substring(0, selectedCur[0].name.lastIndexOf('-')) === name + '' && selectedCur[0].value === tagProps.value + '')      }      // 处理事件      if (event && event !== 'onClick' && event !== 'onChange') {        tagProps[event!] = util.handleEvent.bind(this, [cr])      }      tagProps.onChange = util.handleEvent.bind(this, [cr, this.checkCR.bind(this, cr)])      tagProps.onClick = util.handleEvent.bind(this, [])      // 打印警告信息      if (type === 'radio' && !container) {        console.error('When the type attribute of the input tag is radio, the third parameter "container" of setCellInput() is a required parameter, otherwise the function will be invalid!')        return null      }      // 处理 JSX      if (type === 'radio' || type === 'checkbox') {        const {          show: rowCheckboxShow,          style: rowCheckboxStyle,          specialStyle        }: any = this.state.property!.body!.row!.rowCheckbox        const style = rowCheckboxShow && key && key.match(/^rowCheck\d+/)          ? {            ...rowCheckboxStyle,            ...specialStyle[rowIndex! - 1]          }          : {}        return (          <label            htmlFor={id}            key={key}            onClick={util.handleEvent.bind(this, [])} // 处理冒泡            style={style}            className={`list-cell-${type}`} // className is list-cell-radio or list-cell-checkbox          >            <input {...tagProps} />            {text ? <span>{text}</span> : null}          </label>        )      }    }  }  /**   * 设置单元格的下拉列表   * @param cs {ObjectSelect} 对象单元   */  setCellSelect = (cs: ObjectSelect) => {    const {builtInAttrs, attrs} = util.handleBuiltInAttributes(cs)    const {text, option, event, type} = builtInAttrs    const {id, key} = util.generateIdAndKeyForTag(type, attrs.key)    const tagProps = {      id,      [event ? event : 'onChange']: util.handleEvent.bind(this, [cs]),      ...attrs    }    return (      <label htmlFor={id} key={key} className="list-cell-select">        {text ? <span>{text}</span> : null}        <select {...tagProps}>          {            option && option.map((item, index) => <option key={`${id}-option-${index}`} {...item} />)          }        </select>      </label>    )  }  /**   * 设置单元格内的对象单元文本   * @param ct {ObjectText} 对象单元   * @param rowIndex {number} 行索引   * @returns {*}   */  setCellText = (ct: ObjectText, {rowIndex}: { rowIndex: number }) => {    const {header, body} = this.state.property!    const {      show: serialNumberShow,      style: serialNumberStyle,      specialStyle    } = body!.row!.serialNumber!    const {builtInAttrs, attrs} = util.handleBuiltInAttributes(ct)    const {id, key} = util.generateIdAndKeyForTag(builtInAttrs.type, attrs.key)    const {text, event, callback} = builtInAttrs    let style = serialNumberShow && key.match(/^listSN\d+/)      ? {        ...(!header!.show || rowIndex !== 0 ? serialNumberStyle : {}),        ...specialStyle![rowIndex - 1],        ...attrs.style      }      : attrs.style    // 处理内置样式表    attrs.className = attrs.className ? `list-cell-text ${attrs.className}` : attrs.className    // 处理默认事件及回调函数    if (typeof callback === 'function') {      style = {...style, cursor: 'pointer'}      if (event) {        attrs[event] = util.handleEvent.bind(this, [ct])      } else {        attrs['onClick'] = util.handleEvent.bind(this, [ct])      }    }    return (      <span        id={id}        key={key}        {...attrs}        style={style}      >        {text}      </span>    )  }  /**   * 设置单元格   * @param rowData {Array} 行数据   * @param rowIndex {number} 行索引   * @param container {string} 当前所在容器的名称   */  setCell = (rowData: Cell[], rowIndex: number, container: 'main' | 'support') => {    const {colWidth, property, rowStyle} = this.state    const {      cellOfColumn,      cell    } = property!.body!    const {style: cellOfColumnStyle} = cellOfColumn!    // 处理border属性值    const listBorder = this.setBorder(cell!.style)    return rowData.map((cellData, cellIndex) => {      return (        <div          key={`${container}-cell-r${rowIndex}-c${cellIndex}`}          className="list-cell"          style={{            height: rowStyle![rowIndex] ? rowStyle![rowIndex].height : 'auto',            ...cell!.style,            width: typeof colWidth === 'string' ? colWidth : (colWidth![cellIndex] || 'auto'),            ...cellOfColumnStyle![cellIndex],            ...listBorder          }}        >          {this.parsing(cellData, {rowIndex: rowIndex + 1, cellIndex}, container)}        </div>      )    })  }  /**   * 解析数据里面的对象   * @param {object} cellData 需要解析的单元格数据   * @param {number} rowIndex 需要解析的单元格数据所在行的索引   * @param {number} cellIndex 需要解析的单元格数据所在行的索引   * @param {number?} index 当前循环遍历的index   * @param {string?} container 当前渲染单元格所在的容器（此参数目前只在type为radio时生效）   * @returns {*} 单元格数据或DOM   */  parsing(    cellData: ObjectUnit | Cell[] | Cell,    {rowIndex, cellIndex, index}: { rowIndex: number, cellIndex?: number, index?: number },    container?: 'main' | 'support'  ): any {    if (Array.isArray(cellData)) {      return cellData.map((o, i) => this.parsing(o, {rowIndex, cellIndex, index: i}, container))    }    if (_.isObject(cellData)) {      switch (cellData.type) {        case 'link':          return this.setCellLink(cellData as ObjectLink)        case 'select':          return this.setCellSelect(cellData as ObjectSelect)        case 'img':          return this.setCellImage(cellData as ObjectImg)        case 'text':          return this.setCellText(cellData as ObjectText, {rowIndex})        case 'input':          return this.setCellInput(cellData as ObjectInput, {rowIndex, cellIndex, index})        case 'radio':        case 'checkbox':        case 'button':          return this.setCellInput(cellData as ObjectRadio | ObjectCheckbox | ObjectButton, {            rowIndex,            cellIndex,            index          }, container)      }    }    // 不是指定对象，返回原数据    return cellData  }  /**   * 设置边框   * 检测到空值则使用全局配置，而不是设置为无边框   * @param {object} borderStyle 含有边框属性的对象   * @returns {object} 返回包含border及其相关属性的对象   */  setBorder = (borderStyle: CSSProperties) => {    const {border} = this.state.property!    const newBorder = {} as CSSProperties    // borderStyle对象的border属性为空字符串    if (borderStyle && borderStyle.border === '') {      return border    }    // borderStyle对象的border属性为空值以外的其他假值    if (!borderStyle.border) {      newBorder.borderWidth = borderStyle.borderWidth || border!.borderWidth      newBorder.borderColor = borderStyle.borderColor || border!.borderColor      newBorder.borderStyle = borderStyle.borderStyle || border!.borderStyle      return newBorder    }    return {border: borderStyle.border}  }  /**   * 设置行   * @param {array} bodyData 列表主体数据   * @param {string} container 当前所在容器的名称   * @returns {*} 列表主体DOM   */  setRow = (bodyData: Row[], container: 'main' | 'support') => {    const {property, transitionName, rowStyle} = this.state    // 处理行动画的样式    const transitionClassName = property!.body!.row!.transition ? ` ${transitionName}` : ''    return bodyData.map((rowData, rowIndex) => {      const customClassName = 'className' in rowData ? ` ${rowData.className}` : ''      let LIElementProps: Partial<ObjectRow> = {        className: `list-row-${customClassName}-${transitionClassName}`,        style: rowStyle![rowIndex],        onMouseEnter: this.rowHover,        onMouseLeave: this.rowHover      }      // 检测行数据是一个对象还是一个数组      // 如果是对象，则需要对行数据做一些处理，比如添加自定义事件等（目前只支持添加事件）      if ('type' in rowData && rowData.type === 'row') {        LIElementProps[rowData.event!] = util.handleEvent.bind(this, [rowData])        LIElementProps.value = rowData.value      } else {        LIElementProps = {...LIElementProps, type: 'row'}      }      return (        <li key={`list-row-${container}-${'key' in rowData ? rowData.key : rowIndex}`} {...LIElementProps}>          {            _.isArray(rowData)              ? this.setCell(rowData, rowIndex, container)              : this.setCell(rowData.cells, rowIndex, container)          }        </li>      )    })  }  /**   * 加载列表头   * @param {array} data 列表头数据   * @returns {*} 列表头DOM   */  loadHeader = (data?: Row) => {    const {property, colWidth, headerWidth} = this.state    const {scroll, header, body} = property!    const {style, cellStyle, show: showHeader} = header!    // 处理border属性值    const listBorder = this.setBorder(cellStyle!)    if (showHeader && data && 'length' in data && data.length) {      return (        <ul          className="list-header list-cont"          style={            !scroll!.enable && headerWidth              ? {                width: headerWidth              } : undefined          }        >          <li key="list-row" className="list-row" style={style}>            {              data.map((cell, index) => (                <div                  className="list-cell"                  title={_.isObject(cell) && 'text' in cell ? cell['text'] : cell as string}                  key={`list-header-${index}`}                  style={{                    ...cellStyle,                    width: typeof colWidth === 'string' ? colWidth : (colWidth![index] || 'auto'),                    minWidth: body!.cell!.style.minWidth,                    ...listBorder                  }}                >                  {this.parsing(cell, {rowIndex: 0, cellIndex: 0})}                </div>              ))            }          </li>        </ul>      )    }    return null  }  /**   * 加载列表主体   * @param bodyData   */  loadBody = (bodyData: Row[]) => {    const {      scrollHeight,      property: {        body: {          style,          row: {spacing}        },        scroll: {enable}      }    }: any = this.state    // 处理css属性‘border-collapse’与‘border-spacing’的值    const listContStyle = util.getListContStyle(spacing)    return (      <div        className="list-body"        ref={ele => this.scroll = ele!}        style={{...style, height: scrollHeight, overflowY: enable ? 'hidden' : 'auto'}}      >        <ul          className="list-cont"          style={listContStyle}          ref={ele => this.listContMain = ele!}        >          {this.setRow(bodyData, 'main')}        </ul>        <ul          className="list-cont"          style={listContStyle}          ref={ele => this.listContSupport = ele!}        >          {this.setRow(bodyData, 'support')}        </ul>      </div>    )  }  /**   * 渲染 DOM 结构   */  render = () => {    const {      property: {        header: {show: showHeader},        body: {row: {spacing}},        style: conStyle      },      data,      className    }: any = this.state!    // 处理border属性值    const listBorder = this.setBorder(conStyle)    // 当存在表头数据且表头是开启时处理数据    let headerData    let bodyData    this.renderData = util.fillRow(data, this.state)    if (showHeader && data.length) {      [headerData, ...bodyData] = this.renderData    } else {      bodyData = this.renderData    }    const listClass = !Number.isNaN(parseInt(spacing)) && parseInt(spacing) > 0 ? '' : 'list-no-spacing'    return (      <div        style={{...listBorder, ...conStyle}}        className={`list${listClass ? ` ${listClass}` : ''}${className ? ` ${className}` : ''}`}        onMouseMove={this.scrollList.bind(this, false)}        onMouseLeave={this.scrollList.bind(this, true)}      >        {this.loadHeader(headerData)}        {this.loadBody(bodyData)}      </div>    )  }}