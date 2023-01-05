import { FlatListProps } from '../FlatListProps';

export interface GridLayoutProps<ItemT> {
  /** Height of the list. */
  height: number;
  /** Width of the list. */
  width: number;
  /** Total number of items in the list. */
  itemCount: number;
  sizeMap: React.MutableRefObject<object>;
  // items loaded so far
  items: ReadonlyArray<ItemT>;
  props: FlatListProps<ItemT>;
  itemKey: (index: number) => string;
  /** Returns the size of a item */
  itemSize: (index: number) => number;
  scrollState?: {
    rowIndex: number;
    columnIndex: number;
  };
  setScrollRowAndColumn?: (rowIndex: number, columnIndex: number) => void;
}

export interface ItemData {
  items: ReadonlyArray<unknown>;
  props: FlatListProps<unknown>;
  setSize: (
    indices: {
      index: number;
      rowIndex: number;
      columnIndex: number;
    },
    size: number,
  ) => void;
  columnCount: number;
  rowCount: number;
}
