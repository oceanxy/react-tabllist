/**
 * 过期属性的警告
 */
export interface Waring {
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
export interface IsKeyExists {
  /**
   * 是否使用了过时属性
   */
  isExist: boolean
  /**
   * 过时属性的值
   */
  value?: any
}
