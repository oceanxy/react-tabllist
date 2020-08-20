declare global {
  import { ReactNode } from 'react';

  function closest(
    el: Element,
    selector: string
  ): Element | undefined

  function getScrollHeight(
    props: Readonly<any> & Readonly<{ children?: ReactNode; }>,
    listComponent?: Element
  ): number

  function getColClientWidth(listContMain: HTMLUListElement): CellWidth[]

  function getMaxCellFromData(data: Table): number
}
