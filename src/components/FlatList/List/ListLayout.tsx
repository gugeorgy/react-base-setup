import React from 'react';

import { VariableSizeList } from 'react-window';
import { FlatListProps } from '../FlatListProps';

import { Item } from './Item';

import { ItemData, ListLayoutProps } from './ListLayoutProps';

export function ListLayout<ItemT>({
  itemCount,
  itemKey,
  items,
  height,
  width,
  itemSize,
  sizeMap,
  props,
}: ListLayoutProps<ItemT>) {
  // *********************************
  const { initialScrollIndex, horizontal, estimatedItemSize } = props;
  // *********************************
  const listRef = React.useRef<VariableSizeList<ItemData> | null>(null);
  // *********************************
  const isHorizontal = React.useMemo(
    () => (Boolean(horizontal) ? 'horizontal' : 'vertical'),
    [horizontal],
  );
  // *********************************

  const scrollToItem = React.useCallback(() => {
    if (listRef.current && initialScrollIndex) {
      listRef.current.scrollToItem(initialScrollIndex, 'start');
    }
  }, [initialScrollIndex]);

  const setSize = React.useCallback(
    (index: number, size: number) => {
      if (!estimatedItemSize) {
        sizeMap.current = { ...sizeMap.current, [index]: size };
      }
      if (listRef.current) {
        listRef.current.resetAfterIndex(index);
      }
    },
    [estimatedItemSize, sizeMap],
  );
  // *********************************
  const itemData: ItemData = React.useMemo(
    () => ({
      items,
      setSize,
      props: props as FlatListProps<unknown>,
    }),
    [items, props, setSize],
  );
  // *********************************
  React.useEffect(() => {
    scrollToItem();
  }, [scrollToItem]);
  // *********************************
  return (
    <VariableSizeList
      height={height}
      width={width}
      itemCount={itemCount}
      itemSize={itemSize}
      itemData={itemData}
      layout={isHorizontal}
      ref={listRef}
      itemKey={itemKey}
      overscanCount={1}
    >
      {Item}
    </VariableSizeList>
  );
}
