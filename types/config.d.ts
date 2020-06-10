import { CSSProperties } from 'react';

declare global {
  type Style = {
    [K in keyof CSSProperties]?: CSSProperties
  }

  interface Waring {
    version: string
    discard: string | [string, 'Object']
    replacement?: string
    warn: string
  }

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
}
