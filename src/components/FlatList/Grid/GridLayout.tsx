/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';

import { VariableSizeGrid } from 'react-window';
import { FlatListProps } from '../FlatListProps';

import { GridLayoutProps, ItemData } from './GridLayoutProps';

import { Item } from './Item';

export function GridLayout<ItemT>({
  items,
  itemKey,
  itemSize,
  height,
  itemCount,
  props,
  sizeMap,
  width,
}: GridLayoutProps<ItemT>) {
  // *********************************
  const { numColumns, estimatedItemSize, initialScrollIndex } = props;
  // *********************************
  const gridRef = React.useRef<VariableSizeGrid<ItemData> | null>(null);
  // *********************************
  const columnCount = React.useMemo(() => numColumns!, [numColumns]);

  const rowCount = React.useMemo(
    () => Math.ceil(itemCount / columnCount),
    [itemCount, columnCount],
  );
  // *********************************
  const columnWidth = React.useCallback(
    () => Math.floor(width / columnCount),
    [columnCount, width],
  );

  const scrollToItem = React.useCallback(() => {
    if (gridRef.current && initialScrollIndex) {
      const rowStart = Math.floor(initialScrollIndex / columnCount);
      for (let i = rowStart; i < rowStart + 1; i += 1) {
        for (let j = 0; j < columnCount; j += 1) {
          const res = j + i * columnCount;
          if (res === initialScrollIndex) {
            gridRef.current.scrollToItem({
              align: 'start',
              columnIndex: j,
              rowIndex: i,
            });
            return;
          }
        }
      }
    }
  }, [columnCount, initialScrollIndex]);

  const setSize = React.useCallback(
    (
      indices: {
        index: number;
        rowIndex: number;
        columnIndex: number;
      },
      size: number,
    ) => {
      const { columnIndex, index, rowIndex } = indices;
      if (!estimatedItemSize) {
        sizeMap.current = { ...sizeMap.current, [index]: size };
      }
      if (gridRef.current) {
        gridRef.current.resetAfterIndices({ columnIndex, rowIndex });
      }
    },
    [estimatedItemSize, sizeMap],
  );
  // *********************************
  const itemData: ItemData = React.useMemo(
    () => ({
      items,
      setSize,
      columnCount,
      rowCount,
      props: props as FlatListProps<unknown>,
    }),
    [columnCount, items, props, rowCount, setSize],
  );
  // *********************************
  React.useEffect(() => {
    scrollToItem();
  }, [scrollToItem]);
  // *********************************
  return (
    <VariableSizeGrid
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={height}
      width={width}
      rowCount={rowCount}
      rowHeight={itemSize}
      itemData={itemData}
      estimatedColumnWidth={columnWidth()}
      estimatedRowHeight={estimatedItemSize ?? 100}
      overscanColumnCount={columnCount}
      overscanRowCount={1}
      itemKey={({ columnIndex, rowIndex }) =>
        itemKey(columnIndex + rowIndex * columnCount)
      }
      ref={gridRef}
    >
      {Item}
    </VariableSizeGrid>
  );
}
