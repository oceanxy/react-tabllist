import { CSSProperties } from 'react';

declare global {
  import { EventHandler } from 'react';

  /**
   * css style
   */
  type Style = {
    [K in keyof CSSProperties]?: CSSProperties
  }

  /**
   * 单元格宽度值
   */
  type CellWidth = number | 'auto' | string

  /**
   * 过期属性的警告
   */
  interface Waring {
    version: string
    discard: string | [string, 'Object']
    replacement?: string
    warn: string
  }

  /**
   * 表格配置
   */
  interface TableConfig {
    className?: string
    data?: any[][]
    property?: {
      border?: {
        borderWidth?: CSSProperties['borderWidth']
        borderStyle?: CSSProperties['borderStyle']
        borderColor?: CSSProperties['borderColor']
      },
      style?: Style
      scroll?: {
        enable?: boolean
        speed?: number
        distance?: number
      },
      header?: {
        show?: boolean
        style?: Style
        cellStyle?: Style
      }
      body?: {
        style?: Style
        row?: {
          transition?: boolean
          spacing?: number
          style?: Style
          serialNumber?: {
            show?: boolean
            columnName?: string
            formatter?: string
            column?: number
            style?: Style
            specialStyle?: Style[]
          }
          rowCheckbox?: {
            show?: boolean
            column?: number
            style?: Style
            specialStyle?: Style[]
          }
          // visual样式高于row.style
          visual?: {
            show?: boolean
            interval?: number
            style?: Style
          }
          // 注意：单独指定每一行的样式的优先级高于visual.style的优先级
          specialStyle?: Style[]
          // silent的样式优先级高于specialStyle
          silent?: {
            show?: boolean // false is open
            style?: Style
          }
        }
        cellOfColumn?: {
          style?: Style[]
        }
        cell?: {
          style?: Style
          iconStyle?: Style
        }
      }
    }
  }

  /**
   * 表格实例
   */
  class ReactTabllist {

  }

  function EventFn(instance: ReactTabllist, cellData: Cell, event: EventHandler<any>): never

  /**
   * 单元行
   */
  interface ObjectRow {
    readonly type: 'row'
    cells: Cell[]
    data: any
    value: any
    event: string
    callback: EventFn
    className: string
    key: string
  }

  interface Button {
  }

  interface Link {
  }

  interface Text {
  }

  interface Img {
  }

  interface Radio {
  }

  interface Checkbox {
  }

  interface Select {
  }

  interface Input {
  }

  /**
   * 对象单元
   */
  type ObjectUnit = Button | Link | Img | Radio | Checkbox | Select | Text | Input

  /**
   * 单元格
   */
  type Cell = string | ObjectUnit | JSX.Element | Cell[]

  /**
   * 单元行
   */
  type Row = ObjectRow | Cell[]
}
