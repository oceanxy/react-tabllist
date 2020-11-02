import { CSSProperties } from 'react'
import { Style } from './decoration'
import { Row } from './structure'

/**
 * 表格配置对象基础单元
 */
declare interface TableConfigUnit {
  /**
   * 显示
   */
  show?: boolean
  /**
   * 单元格所在列索引
   */
  column?: number
  /**
   * 单元格所在列的所有单元格的样式
   */
  style?: Style
  /**
   * 按列的索引指定列内单元格的样式
   */
  specialStyle?: Style[]
}

/**
 * 行序号
 */
declare interface SerialNumber extends TableConfigUnit {
  /**
   * 自定义列名
   */
  columnName?: string
  /**
   * 行号格式化。{index}解析为从0依次递增的数字
   */
  formatter?: string
}

/**
 * 行选择框
 */
declare interface RowCheckbox extends TableConfigUnit {}

/**
 * 表格配置属性
 */
declare interface TableProperty {
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
 * 表格配置
 */
declare interface TableConfig {
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
  property?: TableProperty
}
