import {
  AnchorHTMLAttributes, ButtonHTMLAttributes,
  EventHandler,
  HTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes,
  ReactElement, SelectHTMLAttributes,
  SyntheticEvent
} from 'react'
import { ReactTabllist } from './config'

/**
 * 对象单元回调函数接口
 */
interface EventCallback {
  (instance: Partial<ReactTabllist>, cellData: ObjectUnit, event: SyntheticEvent): void
}

/**
 * 对象单元
 * 事件默认为`onClick`
 */
interface ObjectUnit<E extends string = 'onClick'> {
  /**
   * 同react的key属性
   */
  key?: string
  /**
   * 同react的className属性
   */
  className?: string
  /**
   * 同react的defaultValue属性
   */
  defaultValue?: any

  /**
   * 标签类型
   */
  readonly type: string
  /**
   * 自定义属性，理论上可以传任何值。这个值在组件内部并不会使用，您可以在回调函数的第一个参数得到这个值
   */
  data?: any
  /**
   * 对象单元的值
   */
  value?: any
  /**
   * 触发事件名称，默认`onClick`
   */
  event?: E
  /**
   * 用户自定义事件回调函数
   */
  callback?: EventCallback
  eventHandler?: EventHandler<SyntheticEvent>
}

/**
 * 单元行
 */
interface ObjectRow extends ObjectUnit, HTMLAttributes<HTMLLIElement> {
  readonly type: 'row'
  cells: Cell[]
}

// interface ObjectButton extends ObjectUnit, ButtonHTMLAttributes<HTMLButtonElement> {
//   readonly type: 'button'
// }

interface ObjectButton extends ObjectUnit, InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'button'
}

interface ObjectLink extends ObjectUnit, AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly type: 'link'
  text?: string
  href?: string
}

interface ObjectText extends ObjectUnit, HTMLAttributes<HTMLSpanElement> {
  readonly type: 'text'
  text?: string
}

interface ObjectImg extends ObjectUnit, ImgHTMLAttributes<HTMLImageElement> {
  readonly type: 'img'
  src?: string
  alt?: string
  text?: string
}

interface ObjectRadio extends ObjectUnit, InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'radio'
  text: string
  name: string
}

interface ObjectCheckbox extends ObjectUnit, InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'checkbox'
  text: string
  name: string
}

interface ObjectOption {
  readonly type: 'option'
  id: string
  label: string
  value: string | number
}

interface ObjectSelect extends ObjectUnit, SelectHTMLAttributes<HTMLSelectElement> {
  readonly type: 'select'
  option: ObjectOption[]
  text?: string
}

interface ObjectInput extends ObjectUnit, InputHTMLAttributes<HTMLInputElement> {
  readonly type: 'input'
  name?: string
  text?: string
}

/**
 * 单元格
 */
type Cell = string | ObjectUnit | ReactElement<any, any> | Cell[]

/**
 * 单元行
 */
type Row = ObjectRow | Cell[]

/**
 * 对象单元属性集合
 */
type ObjectUnion = ObjectRow & ObjectCheckbox & ObjectText & ObjectImg &
  ObjectButton & ObjectInput & ObjectLink & ObjectRadio & ObjectSelect

/**
 * 内置属性定义
 */
type BuiltAttrs = 'type' | 'text' | 'event' | 'eventHandler' | 'callback' | 'cells' | 'data' | 'option'

/**
 * 从对象单元中选取内置属性，得到新的对象单元类型
 */
type BuiltInAttrs<T extends ObjectUnit> = Pick<T, Extract<keyof T, BuiltAttrs>>

/**
 * 从对象单元中选取非内置属性，得到新的对象单元类型
 */
type ObjectRestAttrs<T extends ObjectUnit> = Pick<T, Exclude<keyof T, BuiltAttrs>>
