import {
  AnchorHTMLAttributes, ButtonHTMLAttributes,
  CSSProperties,
  EventHandler,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes, LiHTMLAttributes, OptionHTMLAttributes,
  ReactElement, ReactNode,
  SelectHTMLAttributes,
  SyntheticEvent
} from "react";

/**
 * 单元格宽度值
 */
export type CellWidth = number | 'auto' | string

/**
 * 过期属性的警告
 */
interface Warning {
  /**
   * 属性被废弃时的版本号
   */
  version: string
  /**
   * 被废弃属性的路径
   *
   * 例如 'property.body.cell.iconStyle'
   */
  discard: string
  /**
   * 用于替换废弃属性路径的新属性路径
   */
  replacement?: string
  /**
   * 警告内容文本
   */
  warn: string
}

/**
 * 检测是否存在过时属性的结果
 */
interface IsKeyExists {
  /**
   * 是否使用了过时属性
   */
  isExist: boolean
  /**
   * 过时属性的值
   */
  value?: any
}

/**
 * 基础单元列
 */
export interface ColumnUnit {
  /**
   * 是否显示
   */
  show?: boolean
  /**
   * 列索引
   */
  column?: number
  /**
   * 列样式
   */
  style?: CSSProperties
  /**
   * 指定列样式
   */
  specialStyle?: CSSProperties[]
}

/**
 * 序号列
 */
export interface SerialNumber extends ColumnUnit {
  /**
   * 列表头显示文本
   */
  columnName?: string
  /**
   * 行号格式化 {index}解析为从0依次递增的数字
   */
  formatter?: string
}

/**
 * 选择框列
 */
export interface RowCheckbox extends ColumnUnit {
}

/**
 * 表格属性
 */
export interface Properties {
  border?: {
    borderWidth?: CSSProperties['borderWidth']
    borderStyle?: CSSProperties['borderStyle']
    borderColor?: CSSProperties['borderColor']
  },
  style?: CSSProperties
  scroll?: {
    enable?: boolean
    speed?: number
    distance?: number
  },
  header?: {
    show?: boolean
    style?: CSSProperties
    cellStyle?: CSSProperties
  }
  body?: {
    style?: CSSProperties
    row?: {
      transition?: boolean
      spacing?: number
      style?: CSSProperties
      serialNumber?: SerialNumber
      rowCheckbox?: RowCheckbox
      // visual样式高于row.style
      visual?: {
        show?: boolean
        interval?: number
        style?: CSSProperties
      }
      // 注意：单独指定每一行的样式的优先级高于visual.style的优先级
      specialStyle?: CSSProperties[]
      // silent的样式优先级高于specialStyle
      silent?: {
        show?: boolean // false is open
        style?: CSSProperties
      }
    }
    cellOfColumn?: {
      style?: CSSProperties[]
    }
    cell?: {
      style: CSSProperties
      iconStyle?: CSSProperties
    }
  }
}

/**
 * 对象单元回调函数接口
 */
export interface EventCallback {
  (instance: Partial<typeof ReactTabllist>, cellData: ObjectUnit, event: SyntheticEvent): void
}

type ObjectUnit = ObjectLink | ObjectText  | ObjectButton | ObjectCheckbox | ObjectImg | ObjectInput |
  ObjectRadio | ObjectCheckbox | ObjectCheckbox[] | ObjectRadio[] | ObjectSelect

/**
 * 对象单元
 * 事件默认为`onClick`
 */
export type BaseObjectUnit<T, E extends string = 'onClick'> = {
  key?: string
  /**
   * 自定义属性，理论上可以传任何值。这个值在组件内部并不会使用，您可以在回调函数的第一个参数得到这个值
   */
  data?: any
  /**
   * 触发事件名称，默认`onClick`
   */
  event?: E
  /**
   * 用户自定义事件回调函数
   */
  callback?: EventCallback
  // 预留字段
  // eventHandler?: EventHandler<SyntheticEvent>
} & T

interface BaseObjectRow extends LiHTMLAttributes<HTMLLIElement> {
  readonly type: 'row'
  cells: Cell[]
}

interface BaseObjectButton extends ButtonHTMLAttributes<HTMLButtonElement>, InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'button'
}

interface BaseObjectLink extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly type: 'link'
  text?: string
}

interface BaseObjectText extends HTMLAttributes<HTMLSpanElement> {
  readonly type: 'text'
  text?: string | number
}

interface BaseObjectImg extends ImgHTMLAttributes<HTMLImageElement> {
  readonly type: 'img'
  text?: string
}

interface BaseObjectRadio extends InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'radio'
  text: string
}

interface BaseObjectCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'checkbox'
  text: string
}

interface BaseObjectOption extends OptionHTMLAttributes<HTMLOptionElement>{
  readonly type?: 'option'
}

interface BaseObjectSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly type: 'select'
  option: BaseObjectOption[]
  text?: string
}

interface BaseObjectInput extends InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'input'
  text?: string
}

export type ObjectRow = BaseObjectUnit<BaseObjectRow>
export type ObjectLink = BaseObjectUnit<BaseObjectLink>
export type ObjectButton = BaseObjectUnit<BaseObjectButton>
export type ObjectText = BaseObjectUnit<BaseObjectText>
export type ObjectImg = BaseObjectUnit<BaseObjectImg>
export type ObjectRadio = BaseObjectUnit<BaseObjectRadio>
export type ObjectCheckbox = BaseObjectUnit<BaseObjectCheckbox>
export type ObjectOption = BaseObjectUnit<BaseObjectOption>
export type ObjectSelect = BaseObjectUnit<BaseObjectSelect>
export type ObjectInput = BaseObjectUnit<BaseObjectInput>

/**
 * 单元行
 */
export type Cell = string | number | ObjectUnit | ReactElement

/**
 * 单元行
 */
export type Row = ObjectRow | Cell[]

/**
 * 对象单元属性集合
 */
export type ObjectUnion = ObjectRow & ObjectCheckbox & ObjectText & ObjectImg &
  ObjectButton & ObjectInput & ObjectLink & ObjectRadio & ObjectSelect

/**
 * 内置属性定义
 */
export type BuiltAttrs = 'type' | 'text' | 'event' | 'eventHandler' | 'callback' | 'cells' | 'data' | 'option'

/**
 * 从对象单元中选取内置属性，得到新的对象单元类型
 */
export type BuiltInAttrs<T extends ObjectUnit> = Pick<T, Extract<keyof T, BuiltAttrs>>

/**
 * 从对象单元中选取非内置属性，得到新的对象单元类型
 */
export type ObjectRestAttrs<T extends ObjectUnit> = Pick<T, Exclude<keyof T, BuiltAttrs>>

export interface RowCheckedState {
  rowCheckbox?: HTMLInputElement[]

  [k: string]: HTMLInputElement[]
}

/**
 * 表格Props
 */
export interface TableProps {
  /**
   * 列表的自定义样式表名
   */
  className?: string
  /**
   * 驱动表格渲染的数据
   */
  data?: Row[]
  /**
   * 表格配置属性
   */
  property?: Properties
}

/**
 * 组件内部状态
 */
export interface TableState extends Properties {
  /**
   * 每列单元格的宽度数组
   */
  colWidth?: (string | number)[]
  /**
   * body可见区域的高度
   */
  scrollHeight?: number
  /**
   * 所有复选框和单选按钮的选中与否状态
   */
  selected?: RowCheckedState
  /**
   * 行选择框的indeterminate状态
   */
  indeterminate?: boolean
  /**
   * 当停用列表滚动且表头开启时，会自动计算这个值，以使表头的总宽度和列表主体相同.
   * 主要目的是为了消除因滚动条占用部分位置使表头和列表主体形成的宽度差
   */
  headerWidth?: number
  /**
   * 列表行缓动动画的样式名
   */
  transitionName?: string
  /**
   * 行样式
   */
  rowStyle?: CSSProperties[]
}

declare module 'react-tabllist' {
  class ReactTabllist extends React.Component<TableProps, TableState> {
    /**
     * 经过计算后，最终用于渲染表格的数据
     */
    renderData: Row[]
    /**
     * 列表滚动控制（暂停/继续滚动）
     * @protected
     */
    pause: boolean
    /**
     * 组件内部状态
     */
    state: TableState
    /**
     * 通过react ref获取的滚动容器元素
     * @protected
     */
    scroll: HTMLDivElement
    /**
     * 通过react reg获取的列表容器元素
     * @protected
     */
    listContMain: HTMLUListElement
    /**
     * 滚动定时器缓存
     */
    marqueeInterval: NodeJS.Timeout
    /**
     * 当前行索引。
     * 当一次滚动多行时可用，组件可视区域第一行的索引
     * @protected
     */
    protected rowIndex: number
    /**
     * 通过react reg获取的列表辅助容器元素
     * @protected
     */
    protected listContSupport: HTMLUListElement

    constructor(props: TableProps)

    marquee(): void

    scrollTo(rowIndex: number, targetScrollTop: number): void

    parsing(
      cellData: ObjectUnit,
      {rowIndex, cellIndex, index}: { rowIndex: number, cellIndex?: number, index?: number },
      container?: 'main' | 'support'
    ): any
  }

  export = ReactTabllist
}

export as namespace ReactTabllist
