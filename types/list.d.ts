import { TableConfig } from 'types/config'
import React from 'react'
import { Style } from 'types/decoration'
import { ObjectUnit, Row } from 'types/structure'

interface RowCheckedState {
  rowCheckbox?: Event<HTMLInputElement>[]
  [k: string]: Event<HTMLInputElement>[]
}

/**
 * 组件内部状态
 */
readonly interface TableState extends TableConfig {
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
  rowStyle?: Style[]
}

export class ReactTabllist extends React.Component<TableConfig, TableState> {
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
   * 当前行索引。
   * 当一次滚动多行时可用，组件可视区域第一行的索引
   * @protected
   */
  protected rowIndex: number

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
   * 通过react reg获取的列表辅助容器元素
   * @protected
   */
  protected listContSupport: HTMLUListElement

  /**
   * 滚动定时器缓存
   */
  marqueeInterval: Node.Timeout

  constructor(props: TableConfig): never

  marquee(): void

  scrollTo(rowIndex: number, targetScrollTop: number): void

  parsing(
    cellData: ObjectUnit,
    {rowIndex, cellIndex, index}: {rowIndex: number, cellIndex?: number, index?: number},
    container?: 'main' | 'support'
  ): any
}
